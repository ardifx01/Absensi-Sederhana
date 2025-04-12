"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdministrator } from "@/hooks/useAdministrator";
import { Users } from "lucide-react";

const DataTotalAbsenKehadiran = () => {
  const { isFetchingAdministrator, isLoadingAdministrator, totalAbsen } =
    useAdministrator();
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Total Siswa Hadir
          </CardTitle>
          <Users color="#4ade80" className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1.5">
          <div className="text-2xl font-bold">{totalAbsen?.totalHadir}</div>
          <p className="text-xs text-muted-foreground">
            Anak hebat datang tepat waktu
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Total Siswa Terlambat
          </CardTitle>
          <Users color="#facc15" className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1.5">
          <div className="text-2xl font-bold">{totalAbsen?.totalTerlambat}</div>
          <p className="text-xs text-muted-foreground">
            Lain kali jangan terlambat lagi ya
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Total Siswa Sakit
          </CardTitle>
          <Users color="#818cf8" className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1.5">
          <div className="text-2xl font-bold">{totalAbsen?.totalSakit}</div>
          <p className="text-xs text-muted-foreground">
            Lekas sembuh ya anak-anak
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Total Siswa Izin
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1.5">
          <div className="text-2xl font-bold">{totalAbsen?.totalIzin}</div>
          <p className="text-xs text-muted-foreground">
            Baiklah, kabar izin telah diterima
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Total Siswa Alpha
          </CardTitle>
          <Users color="#ef4444" className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1.5">
          <div className="text-2xl font-bold">{totalAbsen?.totalAlpha}</div>
          <p className="text-xs text-muted-foreground">
            Kalian sebenarnya niat masuk sekolah tidak?
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataTotalAbsenKehadiran;
