import { Temporal } from "@js-temporal/polyfill";
import { TextLineStream } from "@std/streams";

const now = Temporal.Now.plainDateISO();
const targetDate = now
  .subtract({ days: 1 })
  .toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })
  .split("/")
  .join("_");

const url = `https://files.tmdb.org/p/exports/movie_ids_${targetDate}.json.gz`;

console.log("Fetching:", url);

// Newline delimited JSON records
const response = await fetch(url, {
  headers: {
    "Accept-Encoding": "gzip",
  },
});

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
