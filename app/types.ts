export interface CoordinatesInterface {
  x: number;
  y: number;
}
export type Orientation = "N" | "E" | "W" | "S";
export interface LandingInterface extends CoordinatesInterface {
  orientation: Orientation;
}

export interface InstractionsInputInterface {
  landing: LandingInterface;
  instractions: string;
}
export interface InstractionsInterface {
  plateau: CoordinatesInterface;
  inputs: { [key: string]: InstractionsInputInterface };
}
