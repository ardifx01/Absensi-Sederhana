import { GenderEnum } from "@prisma/client";
import * as z from "zod";

export const createSiswaSchema = z.object({
    nis: z.coerce.number().positive({message: "Nis harus di isi"}),
    nama: z.string().min(1, {message: "Nama harus di isi"}),
    kelasId: z.number().positive({
        message: "KelasId harus di isi"
    }),
    gender: z.nativeEnum(GenderEnum, {message: "Gender harus di isi"})
})

export const updateSiswaSchema = z.object({
    nis: z.coerce.number().optional(),
    nama: z.string().min(1).optional(),
    kelasId: z.number().positive().optional(),
    gender: z.nativeEnum(GenderEnum).optional()
})