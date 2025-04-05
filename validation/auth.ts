import { object, string } from "zod";

const getPasswordSchema = (type: "password" | "confirmPassword") =>
    string({ required_error: `${type} harus di isi` })
        .min(8, `${type} harus minimal 8 karakter`)
        .max(32, `${type} tidak dapat melebihi 32 karakter`);

const getEmailSchema = () =>
    string({ required_error: "Email harus di isi" })
        .min(1, "Email harus di isi")
        .email("Email salah");

const getNameSchema = () =>
    string({ required_error: "Nama harus di isi" })
        .min(1, "Nama harus di isi")
        .max(50, "Nama harus kurang dari 50 karakter");

export const signUpSchema = object({
    name: getNameSchema(),
    email: getEmailSchema(),
    password: getPasswordSchema("password"),
    confirmPassword: getPasswordSchema("confirmPassword"),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password tidak sama",
        path: ["confirmPassword"],
    });

export const signInSchema = object({
    email: getEmailSchema(),
    password: getPasswordSchema("password"),
});
