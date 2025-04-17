"use client"

import { updateAbsensiSiswa } from "@/actions/kehadiran";
import { SiswaProps } from "@/lib/model-type/siswa";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useKehadirans() {
    const queryClient = useQueryClient();

    const updateAbsensiMutation = useMutation({
        mutationFn: ({ id_siswa, kehadiranValue }: { id_siswa: number; kehadiranValue: "hadir" | "terlambat" | "sakit" | "izin" | "alpha" }) =>
            updateAbsensiSiswa(id_siswa, kehadiranValue),

        onMutate: async ({ id_siswa, kehadiranValue }) => {
            await queryClient.cancelQueries({ queryKey: ["siswas"] });

            const previousKehadiran = queryClient.getQueryData(["siswas"]);

            queryClient.setQueryData(["siswas"], (old: SiswaProps[] | undefined) => {
                if (!old) return [];

                return old.map(siswa => {
                    if (siswa.id_siswa === id_siswa) {
                        return { ...siswa, kehadiran: kehadiranValue };
                    }
                    return siswa;
                });
            });

            return { previousKehadiran };
        },

        onError: (err, variables, context) => {
            console.error("Error updating kehadiran:", err);
            queryClient.setQueryData(["siswas"], context?.previousKehadiran);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["siswas"] });
            queryClient.invalidateQueries({ queryKey: ["total_absen"] });
        }
    });
    return {
        // Mutations
        updateAbsensi: updateAbsensiMutation.mutate,

        // Mutations States
        isUpdating: updateAbsensiMutation.isPending,
    }
}