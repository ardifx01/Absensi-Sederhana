"use client"

import { getKelass } from "@/actions/kelas";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useKelass() {
    // const queryClient = useQueryClient();

    const kelassQuery = useQuery({
        queryKey: ["kelass"],
        queryFn: getKelass
    });

    return {
        kelass: kelassQuery.data?.data ?? [],
        isLoading: kelassQuery.isLoading,
        error: kelassQuery.error || kelassQuery.data?.error,
    }
}