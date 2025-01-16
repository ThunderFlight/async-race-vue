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
  startedStatus: boolean;
  resetStatus: boolean;
  id: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface UpdateWinner {
  wins: number;
  time: number;
}
