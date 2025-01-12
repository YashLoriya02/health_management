"use-client"

import React from 'react'
import Image from 'next/image'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'

const Register = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId)

    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-full">
                    <Image src="/assets/icons/logo-full.svg" alt="logo" height={1000} className="mb-12 h-10 w-fit" width={1000} />
                    <RegisterForm user={user} />
                    <p className="copyright py-10">© 2025 CarePulse</p>
                </div>
            </section>

            <Image src={'/assets/images/register-img.png'} alt="main-img" height={1000} width={1000} className="side-img h-full max-w-[450px]" />
        </div>
    )
}

export default Register
