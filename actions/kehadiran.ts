"use server"

import { UpdateKehadiranProps } from "@/lib/model-type/kehadiran";
import prisma from "@/lib/prisma";
import { MutationResponse } from "@/lib/response/kehadiran";
import { KehadiranEnum } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateAbsensiSiswa(id_siswa: number, kehadiranValue: "hadir" | "terlambat" | "sakit" | "izin" | "alpha"): Promise<MutationResponse> {
    try {
        const kehadiran = await prisma.kehadiran.update({
            where: {siswaId: id_siswa},
            data: {
                kehadiran: kehadiranValue,
                tanggal: new Date()
            },
        });
        return { success: true, data: kehadiran };
    } catch (error) {
        console.error("Failed to update kehadiran:", error);
        return { success: false, error: "Failed to update kehadiran" };
    }
}