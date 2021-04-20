enum LogLevel {
  Trace = 10,
  Debug = 20,
  Info = 30,
  Warn = 40,
  Error = 50
}

class Logger {
  minLevel : LogLevel = LogLevel.Trace;
  
  constructor () {
    if (process.env.NODE_ENV === 'production') {
      this.minLevel = LogLevel.Info;
    }
  }

  private callerName() {
    try {
      throw new Error();
    }
    catch (e) {
      try {
        return e.stack.split('at ')[3].split(' ')[0];
      } catch (e) {
        return '';
      }
    }
  }

  private shouldLog (logLevel : LogLevel) : boolean {
    return logLevel >= this.minLevel;
  }

  debug (...args) {
    if (!this.shouldLog(LogLevel.Debug)) return;
    // 1. Convert args to a normal array
    const newArgs = Array.from(args);

    const callerName = this.callerName();
    if (callerName) newArgs.unshift(`[${callerName}]`);

    console.log.apply(console, newArgs);
  }

  info (...args) {
    if (!this.shouldLog(LogLevel.Info)) return;
    // 1. Convert args to a normal array
    const newArgs = Array.from(args);

    const callerName = this.callerName();
    if (callerName) newArgs.unshift(`[${callerName}]`);

    console.log.apply(console, newArgs);
  }
}

export function createLogger () : Logger {
  return new Logger();
}