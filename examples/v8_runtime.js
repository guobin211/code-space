((globalThis) => {
  const { core } = this.Deno;
  // ===========================================================================
  // 注入全局变量 V8 Runtime
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
    },
  };
})(globalThis);
