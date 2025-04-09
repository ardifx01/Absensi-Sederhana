import { updateAbsensiSiswa } from "@/actions/kehadiran";
import { createSiswa, deleteSiswa, getSiswaTables, updateSiswa } from "@/actions/siswa";
import { SiswaProps, UpdateSiswaProps } from "@/lib/model-type/siswa";
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSiswas() {
    const queryClient = useQueryClient();

    const createSiswaMutation = useMutation({
        mutationFn: createSiswa,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["siswas"] });
        },
    });

    const updateSiswaMutation = useMutation({
        mutationFn: ({ id_siswa, data }: { id_siswa: number; data: Partial<UpdateSiswaProps> }) =>
            updateSiswa(id_siswa, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["siswas"] });
        },
    });

    const deleteSiswaMutation = useMutation({
        mutationFn: ({ id_siswa }: { id_siswa: number }) => deleteSiswa(id_siswa),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["siswas"] });
        },
    });


    return {
        // Mutations
        createSiswa: createSiswaMutation.mutate,
        updateSiswa: updateSiswaMutation.mutate,
        deleteSiswa: deleteSiswaMutation.mutate,
        
        // Mutation states
        isCreating: createSiswaMutation.isPending,
        isUpdating: updateSiswaMutation.isPending,
        isDeleting: deleteSiswaMutation.isPending
    }
}

export function useSiswaTable(query: string, currentPage: number, nama_kelas: undefined) {
    const queryClient = useQueryClient();
    const siswasQuery = useQuery({
        queryKey: ["siswas", query, currentPage, nama_kelas],
        queryFn: () => getSiswaTables(query, currentPage, nama_kelas),
        select: (response) => ({
            siswas: response.data,
            error: response.error
        }),
        staleTime: Infinity,
        refetchOnWindowFocus: false
    });

    const updateAbsensiMutation = useMutation({
        mutationFn: ({ id_siswa, kehadiranValue }: { id_siswa: number; kehadiranValue: "hadir" | "terlambat" | "sakit" | "izin" | "alpha" }) =>
            updateAbsensiSiswa(id_siswa, kehadiranValue),

        onMutate: async ({ id_siswa, kehadiranValue }) => {
            // 1. Cancel ongoing queries dengan query key yang sama persis
            await queryClient.cancelQueries({
                queryKey: ["siswas", query, currentPage, nama_kelas]
            });

            // 2. Simpan snapshot data sebelumnya untuk rollback
            const previousData = queryClient.getQueryData(["siswas", query, currentPage, nama_kelas]);

            
            queryClient.setQueryData(
                ["siswas", query, currentPage, nama_kelas],
                (old: { siswas: SiswaProps[] } | undefined) => {
                    if (!old) return { siswas: [] };

                    return {
                        ...old,
                        siswas: old.siswas.map(siswa => {
                            if (siswa.id_siswa === id_siswa) {
                                return {
                                    ...siswa,
                                    kehadiran: {
                                        kehadiran: kehadiranValue
                                    }
                                };
                            }
                            return siswa;
                        })
                    };

                    // return {
                    //     ...old,
                    //     siswas: old.siswas.map(siswa => {
                    //         if (siswa.id_siswa === id_siswa) {
                    //             // Pastikan struktur update sesuai dengan struktur data siswa
                    //             return {
                    //                 ...siswa,
                    //                 kehadiran: {
                    //                     kehadiran: kehadiranValue
                    //                     // Jika ada properti lain di objek kehadiran, pertahankan
                    //                 }
                    //             };
                    //         }
                    //         return siswa;
                    //     })
                    // };
                }
            );

            return { previousData };
        },

        // Rollback jika error
        onError: (err, variables, context) => {
            console.error("Error updating kehadiran:", err);
            queryClient.setQueryData(
                ["siswas", query, currentPage, nama_kelas],
                context?.previousData
            );
        },

        // Invalidasi query setelah selesai (sukses/gagal)
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["siswas", query, currentPage, nama_kelas]
            });
        }
    });

    return {
        siswas: siswasQuery.data?.siswas,
        isLoading: siswasQuery.isLoading,
        isFetching: siswasQuery.isFetching,
        error: siswasQuery.error || siswasQuery.data?.error,
        updateAbsensi: updateAbsensiMutation.mutate
    }
}