import { GenericResponse } from "./genericResponse";

export type Duration = {
    id: string;
    name: string;
    duration: number;
};

export type DurationResponse = GenericResponse<Duration[]>;
