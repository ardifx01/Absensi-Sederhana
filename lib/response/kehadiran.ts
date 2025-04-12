import { Kehadiran } from "@prisma/client";
import { KehadiranProps } from "../model-type/kehadiran";

export type QueriesResponse = {
    data: KehadiranProps[];
    error?: string;
};

export type SingleQueryResponse = {
    data: Kehadiran | null;
    error?: string;
};

export type MutationResponse = {
    success?: boolean;
    data?: Kehadiran;
    error?: string;
};