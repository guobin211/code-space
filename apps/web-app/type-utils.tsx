export type FetchWithPending<R = unknown> = (() => Promise<R>) & {
  isPending?: boolean;
  isSucceed?: boolean;
};

export type FetchWithPendingParams<R = unknown, P = unknown> = ((p: P) => Promise<R>) & {
  isPending?: boolean;
  isSucceed?: boolean;
};
