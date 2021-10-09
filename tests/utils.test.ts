import assert from "assert";
import { InstractionsInterface } from "../app/types";
import { generateInputInstructionsObject } from "../app/utils";

describe("test generateInputInstructionsObject util", function () {
  it("[happy scenario] should return the correct instractions object from string", function () {
    const expectedResults: InstractionsInterface = {
      plateau: { x: 5, y: 5 },
      inputs: {
        Rover1: {
          landing: { x: 1, y: 2, orientation: "N" },
          instractions: "LMLMLMLMM",
        },
        Rover2: {
          landing: { x: 3, y: 3, orientation: "E" },
          instractions: "MMRMMRMRRM",
        },
      },
    };
    const instractionsObject = generateInputInstructionsObject(`
Plateau:5 5
Rover1 Landing:1 2 N
Rover1 Instructions:LMLMLMLMM
Rover2 Landing:3 3 E
Rover2 Instructions:MMRMMRMRRM
    `);

    assert.deepEqual(instractionsObject, expectedResults);
  });
  it("[bad scenario] should avoid empty lines and not depend on instructions sequence", () => {
    const expectedResults: InstractionsInterface = {
      plateau: { x: 5, y: 5 },
      inputs: {
        Rover1: {
          landing: { x: 1, y: 2, orientation: "N" },
          instractions: "LMLMLMLMM",
        },
        Rover2: {
          landing: { x: 3, y: 3, orientation: "E" },
          instractions: "MMRMMRMRRM",
        },
      },
    };
    const instractionsObject = generateInputInstructionsObject(`

    Plateau:5 5

    Rover1 Instructions:LMLMLMLMM

    Rover2 Landing:3 3 E

Rover2 Instructions:MMRMMRMRRM

Rover1 Landing:1 2 N
    `);

    assert.deepEqual(instractionsObject, expectedResults);
  });
});
