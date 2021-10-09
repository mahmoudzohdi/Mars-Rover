import fs from "fs";
import { generateInputInstructionsObject } from "./utils";

const readTextFile = (filePath: string) => {
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) throw err;
    console.log(generateInputInstructionsObject(data));
  });
};

process?.argv?.slice(2).forEach((filePath: string) => {
  readTextFile(filePath);
});
