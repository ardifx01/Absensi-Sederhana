import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full mx-auto max-w-[900px] px-12">
      <div className="w-full bg-primary/8 rounded-b-[7rem] md:rounded-b-[10rem]">
        <div className="p-12 flex items-center justify-center flex-col space-y-4 text-primary">
          <h1 className="text-4xl md:text-6xl">Hadirin</h1>
          <p className="text-center text-sm md:text-lg">
            Aplikasi Absensi Sederhana Untuk Sekolah <br />
            Kehadiran Tercatat, Proses Belajar Terpantau
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between mt-16 space-y-10 md:space-y-0">
        <div className="flex flex-col items-start space-y-4">
          <p>
            Silahkan login terlebih dahulu <br /> untuk masuk ke halaman
            dashboard
          </p>
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Halaman Login 
          </Link>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <p>
            Jika sudah login, langsung saja <br /> masuk ke halaman dashboard
          </p>
          <Link
            href="/dashboard/data_administrator"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Halaman Dashboard
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center text-center space-y-4 mt-36 pt-4 border-t border-primary">
        <h1>Dibuat oleh Zect {"(Al Sakha)"}</h1>
        <p>Aplikasi ini dibuat untuk ujian LSP!</p>
      </div>
    </div>
  );
}
