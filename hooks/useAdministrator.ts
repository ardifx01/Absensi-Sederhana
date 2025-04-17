"use client"

import { getTotalAbsenKehadiran, UpdateTanggal } from "@/actions/administrator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAdministrator() {
    const queryClient = useQueryClient();

    const absenKehadiran = useQuery({
        queryKey: ["total_absen"],
        queryFn: getTotalAbsenKehadiran,
        staleTime: 2 * 60 * 1000
    });

    const updateTanggalKehadiran = useMutation({
        mutationFn: UpdateTanggal,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["siswas"] });
            queryClient.invalidateQueries({ queryKey: ["total_absen"] });
        }
    })

    return {
        // mutations
        updateTgl: updateTanggalKehadiran.mutate,

        // Mutation states
        isUpdating: updateTanggalKehadiran.isPending,
        isSuccess: updateTanggalKehadiran.isSuccess,

        // Query
        totalAbsen: absenKehadiran.data?.data,
        isLoadingAdministrator: absenKehadiran.isLoading,
        isFetchingAdministrator: absenKehadiran.isFetching,
        error: absenKehadiran.error,
    }
}