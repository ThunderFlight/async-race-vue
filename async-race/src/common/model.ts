export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface Engine {
  velocity: number;
  distance: number;
}

export interface Drive {
  success: boolean;
}

export interface DriveOptions {
  time: number;
  driveStatus: boolean;
  resetStatus: boolean;
  id: number;
}

export interface Win {
  id: number;
  wins: number;
  time: number;
}
