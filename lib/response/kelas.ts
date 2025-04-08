import { Kelas } from "@prisma/client";

export type QueriesResponse = {
    data: Kelas[];
    error?: string;
};

export type SingleQueryResponse = {
    data: Kelas | null;
    error?: string;
};

export type MutationResponse = {
    success?: boolean;
    data?: Kelas;
    error?: string;
    message?: string;
};