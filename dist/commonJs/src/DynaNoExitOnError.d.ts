export interface IDynaNoExitOnErrorConfig {
    onUncaughtException?: (error: any, origin: string, errorJson: any) => void;
    onUncaughtRejection?: (error: any, origin: string, errorJson: any) => void;
    onError?: (error: any, origin: string, errorJson: any) => void;
}
export declare class DynaNoExitOnError {
    private readonly _config;
    constructor(_config: IDynaNoExitOnErrorConfig);
    enable(): void;
    disable(): void;
    dispose(): void;
    private _handleUncaughtException;
    private _handleUncaughtRejection;
    static _buildErrorJson(error: any, origin: string): any;
}
