"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

const PatientForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    const onSubmit = async ({ name, email, phone }: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true)
        try {
            const userData = { name, email, phone }
            const user = await createUser(userData)

            if (user) {
                router.push(`/patients/${user.$id}/register`)
            }
            setIsLoading(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700 tracking-wide">Get Started with Appointments.</p>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name="name"
                    label="Full Name"
                    placeholder="Enter your name"
                    control={form.control}
                    iconSrc='/assets/icons/user.svg'
                    iconAlt='user'
                />

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    control={form.control}
                    iconSrc='/assets/icons/email.svg'
                    iconAlt='email'
                />

                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    name="phone"
                    label="Phone number"
                    placeholder="Enter you Phone Number"
                    control={form.control}
                />

                <SubmitButton className="rounded-[10px]" isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm