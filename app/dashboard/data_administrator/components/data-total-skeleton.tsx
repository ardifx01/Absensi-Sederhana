"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";

const DataTotalSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mb-7">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Total Siswa Hadir
          </CardTitle>
          <Users color="#4ade80" className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1.5">
          <div className="text-2xl font-bold text-[#4ade80]">
            <Skeleton className="h-[35px] w-[35px]" />
          </div>
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
          <div className="text-2xl font-bold text-[#facc15]">
            <Skeleton className="h-[35px] w-[35px]" />
          </div>
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
          <div className="text-2xl font-bold text-[#818cf8]">
            <Skeleton className="h-[35px] w-[35px]" />
          </div>
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
          <div className="text-2xl font-bold text-muted-foreground">
            <Skeleton className="h-[35px] w-[35px]" />
          </div>
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
          <div className="text-2xl font-bold text-[#ef4444]">
            <Skeleton className="h-[35px] w-[35px]" />
          </div>
          <p className="text-xs text-muted-foreground">
            Kalian sebenarnya niat masuk sekolah tidak?
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataTotalSkeleton;
