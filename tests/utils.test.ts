import assert from "assert";
import {
  CoordinatesInterface,
  InstractionsInterface,
  LandingInterface,
} from "../app/types";
import {
  generateInputInstructionsObject,
  incrementBasedOnOrientation,
  updateLandingOrientation,
} from "../app/utils";

describe("test generateInputInstructionsObject util", function () {
  it("[happy scenario] should return the correct instractions object from string", function () {
    const testData = generateInputInstructionsObject(`
Plateau:5 5
Rover1 Landing:1 2 N
Rover1 Instructions:LMLMLMLMM
Rover2 Landing:3 3 E
Rover2 Instructions:MMRMMRMRRM
    `);
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

    assert.deepEqual(testData, expectedResults);
  });
  it("[bad scenario] should avoid empty lines and not depend on instructions sequence", () => {
    const testData = generateInputInstructionsObject(`

    Plateau:5 5

    Rover1 Instructions:LMLMLMLMM

    Rover2 Landing:3 3 E

Rover2 Instructions:MMRMMRMRRM

Rover1 Landing:1 2 N
    `);
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
    assert.deepEqual(testData, expectedResults);
  });
});

describe("test incrementBasedOnOrientation util", function () {
  const plateau: CoordinatesInterface = { x: 5, y: 5 };
  it("[happy scenario] should increment y by 1", function () {
    const testData: LandingInterface = {
      x: 1,
      y: 2,
      orientation: "N",
    };
    const expectedResults: LandingInterface = {
      ...testData,
      y: 3,
    };
    assert.deepEqual(
      incrementBasedOnOrientation(testData, plateau),
      expectedResults
    );
  });
  it("[bad scenario] should not increment y because it's value equals the plateau.y", function () {
    const testData: LandingInterface = {
      x: 0,
      y: 5,
      orientation: "N",
    };
    assert.deepEqual(incrementBasedOnOrientation(testData, plateau), testData);
  });
  it("[happy scenario] should decrement x by 1", function () {
    const testData: LandingInterface = {
      x: 1,
      y: 2,
      orientation: "W",
    };
    const expectedResults: LandingInterface = {
      ...testData,
      x: 0,
    };
    assert.deepEqual(
      incrementBasedOnOrientation(testData, plateau),
      expectedResults
    );
  });
  it("[bad scenario] should not decrement x because it's value equals 0", function () {
    const testData: LandingInterface = {
      x: 0,
      y: 2,
      orientation: "W",
    };
    assert.deepEqual(incrementBasedOnOrientation(testData, plateau), testData);
  });
});

describe("test updateLandingOrientation util", function () {
  it("[happy scenario] should rotate orientation from N to E when rotation is 'R'", function () {
    const testData: LandingInterface = {
      x: 0,
      y: 2,
      orientation: "N",
    };
    const expectedResults = { ...testData, orientation: "E" };
    assert.deepEqual(updateLandingOrientation("R", testData), expectedResults);
  });
  it("[bad scenario] should rotate orientation back from N to W when rotation is 'L'", function () {
    const testData: LandingInterface = {
      x: 0,
      y: 2,
      orientation: "N",
    };
    const expectedResults = { ...testData, orientation: "W" };
    assert.deepEqual(updateLandingOrientation("L", testData), expectedResults);
  });
});
