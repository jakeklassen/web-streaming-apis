// Literally snagged from 🦕 https://deno.land/std@0.171.0/streams/text_line_stream.ts
import { TextLineStream } from "./streams/text-line-stream.js";

// Newline delimited JSON records
const response = await fetch(
  "http://files.tmdb.org/p/exports/movie_ids_12_19_2022.json.gz",
);

const stream = response.body
  .pipeThrough(new DecompressionStream("gzip"))
  .pipeThrough(new TextDecoderStream())
  // It's very possible you will get a partial JSON record from TextDecoderStream.
  // The TextLineStream will make sure each chunk is divided by a newline.
  .pipeThrough(new TextLineStream());

let count = 0;
for await (const item of stream) {
  if (item === "") continue;

  try {
    console.log(JSON.parse(item));
  } catch (error) {
    console.error(error, item);
  }

  ++count;

  if (count > 10) break;
}
