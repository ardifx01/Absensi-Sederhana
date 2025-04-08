import { getSiswaById } from "@/actions/siswa";
import { notFound } from "next/navigation";
import SiswaUpdateForm from "../../components/siswa-update-form";
import PageContainer from "@/components/dashboard/page-container";

const SiswaUbah = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const id_siswa = Number((await params).id);
  const siswa = await getSiswaById(id_siswa);

  if (!siswa.data) {
    notFound();
  }

  return (
    <PageContainer>
      <SiswaUpdateForm siswa={siswa.data} />
    </PageContainer>
  )
};

export default SiswaUbah;
