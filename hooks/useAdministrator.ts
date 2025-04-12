"use client"

import { getTotalAbsenKehadiran } from "@/actions/administrator";
import { useQuery } from "@tanstack/react-query";

export function useAdministrator() {
    const absenKehadiran = useQuery({
        queryKey: ["total_absen"],
        queryFn: getTotalAbsenKehadiran
    });

    return {
        totalAbsen: absenKehadiran.data?.data,
        isLoadingAdministrator: absenKehadiran.isLoading,
        isFetchingAdministrator: absenKehadiran.isFetching,
        error: absenKehadiran.error,
    }
}