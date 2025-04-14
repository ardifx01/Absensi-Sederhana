import { createSiswa, deleteSiswa, getSiswaTables, updateSiswa } from "@/actions/siswa";
import { UpdateSiswaProps } from "@/lib/model-type/siswa";
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
    const siswasQuery = useQuery({
        queryKey: ["siswas", query, currentPage, nama_kelas],
        queryFn: () => getSiswaTables(query, currentPage, nama_kelas),
        select: (response) => ({
            siswas: response.data,
            error: response.error
        }),
        staleTime: 2 * 60 * 1000
    });

    return {
        siswas: siswasQuery.data?.siswas,
        isLoading: siswasQuery.isLoading,
        isFetching: siswasQuery.isFetching,
        error: siswasQuery.error || siswasQuery.data?.error,
    }
}

export function useSiswaForAbsen(query: string, currentPage: number, nama_kelas: undefined) {
    const siswasQuery = useQuery({
        queryKey: ["siswas", query, currentPage, nama_kelas],
        queryFn: () => getSiswaTables(query, currentPage, nama_kelas),
        select: (response) => ({
            siswas: response.data,
            error: response.error
        }),
        staleTime: Infinity
    });

    return {
        siswas: siswasQuery.data?.siswas,
        isLoading: siswasQuery.isLoading,
        isFetching: siswasQuery.isFetching,
        error: siswasQuery.error || siswasQuery.data?.error,
    }
}