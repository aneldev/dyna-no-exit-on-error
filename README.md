# About DynaNoExiOnError

Catches Javascript Exceptions and Rejected Promises and blocks NodeJs instance termination.

Provides callbacks to consume the errors and also gives JSON friendly version for the error. The latter is useful since the `Error` cannot be stringified.

# Example

```
const dynaNoExitOnError = new DynaNoExitOnError({
  onError: error => errors.push(error),
  onUncaughtException: (error, origin, errorJson) => console.error(error),
  onUncaughtRejection: (error, origin, errorJson) => post('/error-report', errorJson),
});
```

# Methods

DynaNoExitOnError starts automatically but also provides some methods to handle it.

## enable(): void

Enables it, it is auto enabled on start.

## disable(): void

Disables the catch.

## dispose(): void

Terminates the usage, you can restart it with `enable()`

# Events

The events are properties of the configuration object on instantiation _see the example above_.

All are optional, if nothing is defined all exceptions the rejected promised will be swallowed!

## onUncaughtException?: (error: any, origin: string, errorJson: any) => void;

Occurred on exceptions.

## onUncaughtRejection?: (error: any, origin: string, errorJson: any) => void;

Occurred on exception in Promises

## onError?: (error: any, origin: string, errorJson: any) => void;

Occurred on any of the above

