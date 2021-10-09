import fs from "fs";

const readTextFile = (filePath: string) => {
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) throw err;
    console.log(data);
  });
};

process?.argv?.slice(2).forEach((filePath: string) => {
  readTextFile(filePath);
});
