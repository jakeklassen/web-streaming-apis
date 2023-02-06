export {};

declare global {
  /**
   * @see https://github.com/stardazed/sd-streams/blob/master/packages/streams-compression/dist/sd-streams-compression.d.ts
   */
  export class DecompressionStream {
    constructor(format: string);

    readonly readable: ReadableStream<BufferSource>;
    readonly writable: WritableStream<Uint8Array>;
  }

  interface ReadableStream<R = any> {
    /**
     * @see https://github.com/microsoft/TypeScript/issues/29867
     */
    [Symbol.asyncIterator](): AsyncIterableIterator<R>;
  }
}
