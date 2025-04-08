"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useSiswas } from "@/hooks/useSiswa";
import { createSiswaSchema } from "@/validation/siswa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LoaderCircleIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useKelass } from "@/hooks/useKelas";
import { toast } from "sonner";

export default function SiswaCreateForm() {
  const form = useForm<z.infer<typeof createSiswaSchema>>({
    resolver: zodResolver(createSiswaSchema),
    defaultValues: {
      nis: 0,
      nama: "",
      kelasId: undefined,
      gender: undefined,
    },
  });
  const { createSiswa, isCreating } = useSiswas();
  const { kelass } = useKelass();
  async function onSubmit(values: z.infer<typeof createSiswaSchema>) {
    try {
      createSiswa(values);
      toast.success("Berhasil menambahkan", {
        description: "Anda telah menambahkan data siswa baru",
      });
    } catch (error) {
      toast.success("Gagal menambahkan", {
        description: "Ada sesuatu yang salah",
      });
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Tambah Siswa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              disabled={isCreating}
              control={form.control}
              name="nis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIS</FormLabel>
                  <FormControl>
                    <Input {...field} type="number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isCreating}
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isCreating}
              control={form.control}
              name="kelasId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kelas</FormLabel>
                  <Select
                    disabled={isCreating}
                    onValueChange={(value) => field.onChange(Number(value))}
                    // defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas anda" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kelass.map((item) => (
                        <span key={item.id_kelas}>
                          <SelectItem value={String(item.id_kelas)}>
                            {item.nama_kelas}
                          </SelectItem>
                        </span>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isCreating}
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <FormControl>
                    <RadioGroup
                      disabled={isCreating}
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1"
                    >
                      {[
                        ["Laki Laki", "laki_laki"],
                        ["Perempuan", "perempuan"],
                      ].map((option, index) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={index}
                        >
                          <FormControl>
                            <RadioGroupItem value={option[1]} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option[0]}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isCreating ? (
              <Button disabled className="w-full cursor-pointer" type="submit">
                <LoaderCircleIcon
                  className="-ms-1 animate-spin"
                  size={16}
                  aria-hidden="true"
                />
                Creating...
              </Button>
            ) : (
              <Button className="w-full cursor-pointer" type="submit">
                Create Siswa
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
