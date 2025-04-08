import { Kehadiran, KehadiranEnum } from "@prisma/client";

interface KehadiranProps {
    kehadiran: KehadiranEnum;
    id_kehadiran: number;
    tanggal: Date;
    siswaId: number;
    created_at: Date;
}

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