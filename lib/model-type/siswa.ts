import { GenderEnum, Kehadiran, Kelas } from "@prisma/client";
import { KehadiranProps } from "./kehadiran";

export interface SiswaProps {
    id_siswa: number;
    nis: number;
    nama: string;
    kelasId: number;
    gender: GenderEnum;
    kelas: Kelas
    kehadiran: KehadiranProps | null;
    created_at: Date;
}

export interface CreateSiswaProps {
    nis: number;
    nama: string;
    kelasId: number;
    gender: GenderEnum;
    kehadiran?: Kehadiran;
}

export interface UpdateSiswaProps {
    nis?: number;
    nama?: string;
    kelasId?: number;
    gender?: GenderEnum;
}