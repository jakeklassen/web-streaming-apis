export {};

declare global {
  // Looks like this is coming in https://github.com/microsoft/TypeScript/pull/56723
  interface ReadableStream<R = any> {
    /**
     * @see https://github.com/microsoft/TypeScript/issues/29867
     */
    [Symbol.asyncIterator](): AsyncIterableIterator<R>;
  }
}
