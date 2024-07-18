import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { requestConfirmationCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RequestNewCodeView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        },
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)

    return (
        <>
            <h1 className="text-5xl font-black text-white">Solicitar Código de Confirmación</h1>
            <p className="text-2xl font-light text-white mt-5">
                Coloca tu e-mail para recibir {''}
                <span className=" text-yellow-500 font-bold"> un nuevo código</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3 rounded-lg border-gray-300 border"
                        {...register("email", {
                            required: "El Email de registro es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Enviar Código'
                    className="bg-yellow-600 hover:bg-yellow-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className=" flex flex-col space-y-4">
                <nav className="mt-10 flex flex-col space-y-4">
                    <p className="text-center text-black font-normal text-xl">
                        ¿Ya estás registrado?,<Link className="text-emerald-900 hover:text-yellow-500" to={'/auth/login'}> Inicia Sesión</Link>
                    </p>
                    <p className="text-center text-black font-normal text-xl">
                        ¿No tienes cuenta?,<Link className="text-emerald-900 hover:text-yellow-500" to={'/auth/register'}> Crea una aquí</Link>
                    </p>
                </nav>
            </nav>
        </>
    )
}
