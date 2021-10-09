import fs from "fs";
import { calculateMovements, generateInputInstructionsObject } from "./utils";

const readTextFile = (filePath: string) => {
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) throw err;
    console.log(
      calculateMovements(generateInputInstructionsObject(data)).join("\n")
    );
  });
};

process?.argv?.slice(2).forEach((filePath: string) => {
  readTextFile(filePath);
});
