import { InstractionsInterface, Orientation } from "./types";

export const generateInputInstructionsObject = (
  data: string
): InstractionsInterface => {
  return data.split("\n").reduce(
    (_inputInstructions: InstractionsInterface, order: string) => {
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
