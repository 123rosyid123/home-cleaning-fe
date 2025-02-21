import { GenericResponse } from "./genericResponse";

export type Duration = {
    id: number;
    name: string;
    duration: number;
};

export type DurationResponse = GenericResponse<Duration[]>;
