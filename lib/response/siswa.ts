import { Siswa } from "@prisma/client";
import { SiswaProps } from "../model-type/siswa";

export type QueriesResponse = {
    data: SiswaProps[];
    error?: string;
};

export type SingleQueryResponse = {
    data: Siswa | null;
    error?: string;
};

export type MutationResponse = {
    success?: boolean;
    data?: Siswa;
    error?: string;
};