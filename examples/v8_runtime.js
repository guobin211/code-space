((globalThis) => {
  const { core } = this.Deno;

  globalThis.console = {
    log: (...args) => {
      core.print(...args);
    },
    error: (arg) => {
      core.opAsync('console_error', arg);
    },
    warn: (arg) => {
      core.opAsync('console_warn', arg);
    },
    info: (arg) => {
      core.opAsync('console_ok', arg);
    }
  }

})(globalThis);
