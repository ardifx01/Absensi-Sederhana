"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateSiswaProps, UpdateSiswaProps } from "@/lib/model-type/siswa";
import { MutationResponse, QueriesResponse, SingleQueryResponse } from "@/lib/response/siswa";


export async function createSiswa(data: CreateSiswaProps): Promise<MutationResponse> {
    try {
        const siswa = await prisma.siswa.create({
            data: {
                nis: data.nis,
                nama: data.nama,
                kelasId: data.kelasId,
                gender: data.gender,
                kehadiran: {
                    create: {}
                }
            },
            include: {
                kehadiran: true
            }
        });
        return { success: true, data: siswa };
    } catch (error) {
        console.error("Failed to create contact:", error);
        return { success: false, error: "Failed to create contact" };
    }
}

export async function updateSiswa(id_siswa: number, data: UpdateSiswaProps): Promise<MutationResponse> {
    try {
        const siswa = await prisma.siswa.update({
            where: {id_siswa},
            data: {
                nis: data.nis,
                nama: data.nama,
                kelasId: data.kelasId,
                gender: data.gender
            },
        });
        return { success: true, data: siswa };
    } catch (error) {
        console.error("Failed to create contact:", error);
        return { success: false, error: "Failed to create contact" };
    }
}

export async function deleteSiswa(id_siswa: number) {
    try {
        await prisma.siswa.delete({
            where: { id_siswa }
        });
        revalidatePath("/dashboard/data_siswa");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete siswa" };
    }
}

export async function getSiswaById(id_siswa: number): Promise<SingleQueryResponse> {
    try {
        const siswa = await prisma.siswa.findUnique({
            where: { id_siswa },
        });
        if (!siswa) {
            return { data: null, error: "siswa not found" };
        }
        return { data: siswa };
    } catch (error) {
        return { error: "Failed to fetch siswa", data: null };
    }
}

const ITEMS_PER_PAGE = 5

export async function getSiswaPages(query: string, nama_kelas: undefined) {
    try {
        const siswas = await prisma.siswa.count({
            where: {
                AND: [
                    {
                        nama: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    { kelas: {nama_kelas} }
                ]
            },
        });

        const totalPages = Math.ceil(Number(siswas) / ITEMS_PER_PAGE)
        return totalPages
    } catch (error) {
        throw new Error("Failed to fetch siswa data");
    }
}

export async function getSiswaTables(query: string, currentPage: number, nama_kelas: undefined): Promise<QueriesResponse> {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    try {
        const siswas = await prisma.siswa.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            where: {
                AND: [
                    {
                        nama: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {kelas: {nama_kelas}}
                ]
            },
            include: {
                kelas: true,
                kehadiran: true
            }
        })
        return { data: siswas }
    } catch (error) {
        throw new Error("Failed to fetch user data");
    }
}