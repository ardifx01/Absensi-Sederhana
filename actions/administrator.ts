"use server"

import prisma from "@/lib/prisma"
import { QueriesResponse } from "@/lib/response/administrator"


export async function getTotalAbsenKehadiran(): Promise<QueriesResponse | undefined> {
    try {
        const today = new Date()
        const startOfDay = new Date(today.setHours(0, 0, 0, 0))
        const endOfDay = new Date(today.setHours(23, 59, 59, 999))

        const [hadir, terlambat, izin, alpha, sakit] = await Promise.all([
            prisma.kehadiran.count({
                where: {
                    kehadiran: 'hadir',
                    tanggal: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                }
            }),
            prisma.kehadiran.count({
                where: {
                    kehadiran: 'terlambat',
                    tanggal: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                }
            }),
            prisma.kehadiran.count({
                where: {
                    kehadiran: 'izin',
                    tanggal: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                }
            }),
            prisma.kehadiran.count({
                where: {
                    kehadiran: 'alpha',
                    tanggal: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                }
            }),
            prisma.kehadiran.count({
                where: {
                    kehadiran: 'sakit',
                    tanggal: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                }
            })
        ])

        return {
            data: {
                totalHadir: hadir,
                totalTerlambat: terlambat,
                totalIzin: izin,
                totalAlpha: alpha,
                totalSakit: sakit
            }
        }
    } catch (error) {
        console.error('Error fetching total absen:', error)
    }
}

export async function UpdateTanggal() {
    try {
        await prisma.kehadiran.updateMany({
            data: {tanggal: new Date()}
        })
        
        return { success: true }
    } catch (error) {
        console.error('Error update tanggal:', error)
    }
}