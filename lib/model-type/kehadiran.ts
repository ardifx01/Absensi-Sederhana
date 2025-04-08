import { KehadiranEnum } from "@prisma/client";

export interface KehadiranProps {
    created_at: Date;
    kehadiran: KehadiranEnum;
    tanggal: Date;
    id_kehadiran: number;
    siswaId: number;
}

export interface UpdateKehadiranProps {
    kehadiran?: KehadiranEnum;
}