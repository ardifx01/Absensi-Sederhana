export type QueriesResponse = {
    data: {
        totalHadir: number;
        totalTerlambat: number;
        totalIzin: number;
        totalAlpha: number;
        totalSakit: number;
    };

    error?: string;
};