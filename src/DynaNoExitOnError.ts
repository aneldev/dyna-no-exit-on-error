import { dynaStringify } from "dyna-stringify";
import { isNode } from "./isNode";


export interface IDynaNoExitOnErrorConfig {
  onUncaughtException?: (error: any, origin: string, errorJson: any) => void;   // Occurred on exceptions
  onUncaughtRejection?: (error: any, origin: string, errorJson: any) => void;   // Occurred on exception in Promises
  onError?: (error: any, origin: string, errorJson: any) => void;               // Occurred on any of the above
}

export class DynaNoExitOnError {
  constructor(private readonly _config: IDynaNoExitOnErrorConfig) {
    if (Object.keys(this._config).length === 0) console.warn("DynaNoExitOnError called with empty configuration, all uncaught exceptions and rejections will be swallowed! Help how to configure it: http://github.com/aneldev/dyna-no-exit-on-error");
    this.enable();
  }

  public enable(): void {
    if (!isNode) return;
    process.on('uncaughtException' as any, this._handleUncaughtException);
    process.on('unhandledRejection', this._handleUncaughtRejection);
  }

  public disable(): void {
    if (!isNode) return;
    process.off('uncaughtException', this._handleUncaughtException);
    process.off('unhandledRejection', this._handleUncaughtRejection);
  }

  public dispose(): void {
    this.disable();
  }

  private _handleUncaughtException = (error: any, origin: string): void => {
    const {
      onUncaughtException,
      onError,
    } = this._config;
    const errorJson = this._buildErrorJson(error, origin);

    onUncaughtException && onUncaughtException(error, origin, errorJson);
    onError && onError(error, origin, errorJson);
  };

  private _handleUncaughtRejection = (error: any, promise: Promise<any>): void => {
    promise; // 4ts
    const {
      onUncaughtRejection,
      onError,
    } = this._config;

    const errorJson = this._buildErrorJson(error, 'Promise');

    onUncaughtRejection && onUncaughtRejection(error, 'Promise', errorJson);
    onError && onError(error, 'Promise', errorJson);
  };

  private _buildErrorJson(error: any, origin: string): any {
    const dynaNoExitOnErrorInfo = {
      origin,
    };
    const t1 = dynaStringify(error);
    if (t1 !== '{}') return {
      ...JSON.parse(dynaStringify(error)),
      dynaNoExitOnErrorInfo,
    };

    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      hasOwnProperty: error.hasOwnProperty && error.hasOwnProperty(),
      fullMessage: error.toString(),
      dynaNoExitOnErrorInfo,
    };
  }
}
