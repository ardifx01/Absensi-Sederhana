"use client";

import { Button } from "@/components/ui/button";
import { useAdministrator } from "@/hooks/useAdministrator";
import { LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";

const UpdateTglBtn = () => {
    const {isUpdating, updateTgl, isSuccess} = useAdministrator();

  async function handleUpdate() {
    try {
      updateTgl();
      if (isSuccess) {
        toast.success("Berhasil update", {
          description: "Semua tanggal kehadiran siswa telah di update",
        });
      }
    } catch (error) {
      console.log("error");
    }
  }
  return (
    <>
      {isUpdating ? (
        <Button disabled type="submit">
          <LoaderCircleIcon
            className="-ms-1 animate-spin"
            size={16}
            aria-hidden="true"
          />
          Updating...
        </Button>
      ) : (
        <Button onClick={handleUpdate} className="cursor-pointer">
          Update Tanggal
        </Button>
      )}
    </>
  );
};

export default UpdateTglBtn;
