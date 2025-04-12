import { getSiswaPages } from "@/actions/siswa";
import PageContainer from "@/components/dashboard/page-container";
import TableSearch from "@/components/table/table-search";
import TablePagination from "@/components/table/table-pagination";

import { getKelass } from "@/actions/kelas";
import AbsensiTable from "./components/table-administrator";
import TableKelasFilter from "@/components/table/table-kelas-filter";
import DataTotalAbsenKehadiran from "./components/data-total-absen-kehadiran";

const AdministratorPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    nama_kelas?: undefined;
  }>;
}) => {
  const query = (await searchParams)?.query || "";
  const nama_kelas = (await searchParams)?.nama_kelas || undefined;
  const currentPage = Number((await searchParams)?.page) || 1;

  const totalPages = await getSiswaPages(query, nama_kelas);
  const { data } = await getKelass();

  return (
    <PageContainer scrollable>
      <DataTotalAbsenKehadiran />
      <div className="flex items-start justify-between gap-6 mb-6">
        <TableSearch />
        <TableKelasFilter dataKelas={data} nama_kelas={nama_kelas} />
      </div>
      <div key={query + currentPage}>
        <AbsensiTable
          query={query}
          currentPage={currentPage}
          nama_kelas={nama_kelas}
        />
      </div>
      <TablePagination totalPages={totalPages} />
    </PageContainer>
  );
};

export default AdministratorPage;
