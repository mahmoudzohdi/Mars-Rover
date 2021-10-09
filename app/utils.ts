import {
  CoordinatesInterface,
  InstractionsInputInterface,
  InstractionsInterface,
  LandingInterface,
  Orientation,
} from "./types";

const orientationsSequence = {
  N: 0,
  E: 1,
  S: 2,
  W: 3,
};
const orientationsSequenceArray = Object.keys(
  orientationsSequence
) as Orientation[];

export const generateInputInstructionsObject = (
  data: string
): InstractionsInterface => {
  return data
    .trim()
    .split("\n")
    .reduce(
      (_inputInstructions: InstractionsInterface, order: string) => {
        order = order.trim();
        if (!order) return _inputInstructions;
        const orderArray = order.split(":");
        const orderName = orderArray[0].split(" ");
        if (orderName[0].toLowerCase() === "plateau") {
          const coordinatesArray = orderArray[1].split(" ");
          _inputInstructions.plateau = {
            x: +coordinatesArray[0],
            y: +coordinatesArray[1],
          };
        } else if (orderName[1].toLowerCase() === "landing") {
          const landingInstractionsArray = orderArray[1].split(" ");
          _inputInstructions.inputs[orderName[0]] = {
            landing: {
              x: +landingInstractionsArray[0],
              y: +landingInstractionsArray[1],
              orientation: landingInstractionsArray[2] as Orientation,
            },
            instractions: (_inputInstructions.inputs[orderName[0]] || {})
              .instractions,
          };
        } else if (orderName[1].toLowerCase() === "instructions") {
          _inputInstructions.inputs[orderName[0]] = {
            landing: (_inputInstructions.inputs[orderName[0]] || {}).landing,
            instractions: orderArray[1],
          };
        }
        return _inputInstructions;
      },
      {
        plateau: { x: 0, y: 0 },
        inputs: {},
      }
    );
};

export const incrementBasedOnOrientation = (
  landing: LandingInterface,
  plateau: CoordinatesInterface
): LandingInterface => {
  const tempLandingInfo = { ...landing };
  switch (tempLandingInfo.orientation) {
    case "N":
      if (tempLandingInfo.y < plateau.y) {
        tempLandingInfo.y = tempLandingInfo.y + 1;
      }
      return tempLandingInfo;
    case "S":
      if (tempLandingInfo.y > 0) {
        tempLandingInfo.y = tempLandingInfo.y - 1;
      }
      return tempLandingInfo;
    case "E":
      if (tempLandingInfo.x < plateau.x) {
        tempLandingInfo.x = tempLandingInfo.x + 1;
      }
      return tempLandingInfo;
    case "W":
      if (tempLandingInfo.x > 0) {
        tempLandingInfo.x = tempLandingInfo.x - 1;
      }
      return tempLandingInfo;
    default:
      return tempLandingInfo;
  }
};

export const updateLandingOrientation = (
  rotation: "L" | "R",
  landing: LandingInterface
): LandingInterface => {
  const tempLandingInfo = { ...landing };

  const incrementBy = rotation === "R" ? 1 : -1;

  let nextOrientationIndex =
    orientationsSequence[landing.orientation] + incrementBy;

  if (
    rotation === "R" &&
    nextOrientationIndex === orientationsSequenceArray.length
  ) {
    tempLandingInfo.orientation = orientationsSequenceArray[0];
  } else if (rotation === "L" && nextOrientationIndex < 0) {
    tempLandingInfo.orientation =
      orientationsSequenceArray[orientationsSequenceArray.length - 1];
  } else {
    tempLandingInfo.orientation =
      orientationsSequenceArray[nextOrientationIndex];
  }
  return tempLandingInfo;
};

export const getFinalPositionOfRoverRobot = (
  input: InstractionsInputInterface,
  plateau: CoordinatesInterface
): string => {
  const movementsArrya = input.instractions.split("");
  let tempLandingInfo = { ...input.landing };
  for (let movement of movementsArrya) {
    switch (movement) {
      case "L":
      case "R":
        tempLandingInfo = updateLandingOrientation(movement, tempLandingInfo);
        break;
      case "M":
        tempLandingInfo = incrementBasedOnOrientation(tempLandingInfo, plateau);
        break;
      default:
        break;
    }
  }

  const { x, y, orientation } = tempLandingInfo;
  return `${x} ${y} ${orientation}`;
};

export const calculateMovements = (instractions: InstractionsInterface) => {
  const finalMovements = [];
  for (let roverRobotName in instractions.inputs) {
    finalMovements.push(
      `${roverRobotName}:${getFinalPositionOfRoverRobot(
        instractions.inputs[roverRobotName],
        instractions.plateau
      )}`
    );
  }
  return finalMovements.join("\n");
};
