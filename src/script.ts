// Literally snagged from 🦕 https://deno.land/std@0.171.0/streams/text_line_stream.ts
import { TextLineStream } from "./streams/text-line-stream.js";

// Newline delimited JSON records
const response = await fetch(
  "https://files.tmdb.org/p/exports/movie_ids_07_01_2024.json.gz",
);

const stream = response.body
  .pipeThrough(new DecompressionStream("gzip"))
  .pipeThrough(new TextDecoderStream())
  // It's very possible you will get a partial JSON record from TextDecoderStream.
  // The TextLineStream will make sure each chunk is divided by a newline.
  .pipeThrough(new TextLineStream());

let movieExportCount = 0;

for await (const _movieExport of stream) {
  movieExportCount++;
}

console.log("Movie export count:", movieExportCount);
