"use server"

import prisma from "@/lib/prisma";
import { QueriesResponse } from "@/lib/response/kelas";

export async function getKelass(): Promise<QueriesResponse> {
    try {
        const kelass = await prisma.kelas.findMany()
        return {data: kelass}
    } catch (error) {
        return { data: [], error: "Failed to fetch kelas" };
    }
}