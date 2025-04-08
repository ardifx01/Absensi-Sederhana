"use client"

import { updateAbsensiSiswa } from "@/actions/kehadiran";
import { SiswaProps } from "@/lib/model-type/siswa";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useKehadirans() {
    const queryClient = useQueryClient();
    //     mutationFn: ({ id_siswa, kehadiranValue }: { id_siswa: number; kehadiranValue: Partial<"hadir" | "terlambat" | "sakit" | "izin" | "alpha"> }) =>
    //         updateAbsensiSiswa(id_siswa, kehadiranValue),
    //     // onSuccess: () => {
    //     //     queryClient.invalidateQueries({ queryKey: ["kehadirans"] });
    //     // },
    //     onMutate: async (variables) => {
    //         // 1. Cancel ongoing queries untuk hindari race condition
    //         await queryClient.cancelQueries({ queryKey: ["kehadirans"] });
            
    //         // 2. Simpan snapshot data sebelumnya untuk rollback
    //         const previousKehadiran = queryClient.getQueryData(["kehadirans"]);
            
    //         // 3. Optimistically update cache
    //         queryClient.setQueryData(["kehadirans"], (old: SiswaProps[]) => [...old, variables])
            
    //         return { previousKehadiran };
    //     },
        
    //     // Rollback jika error
    //     onError: (err, variables, context) => {
    //         queryClient.setQueryData(["kehadirans"], context?.previousKehadiran);
    //     },
        
    //     // Invalidasi query setelah selesai (sukses/gagal)
    //     onSettled: () => {
    //         queryClient.invalidateQueries({ queryKey: ["kehadirans"] });
    //     }
    // });

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
        }
    });
    //     mutationFn: ({ id_siswa, kehadiranValue }: { id_siswa: number; kehadiranValue: Partial<"hadir" | "terlambat" | "sakit" | "izin" | "alpha"> }) =>
    //         updateAbsensiSiswa(id_siswa, kehadiranValue),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["kehadirans"] });
    //     },
    // });
    return {
        // Mutations
        updateAbsensi: updateAbsensiMutation.mutate,

        // Mutations States
        isUpdating: updateAbsensiMutation.isPending,
    }
}