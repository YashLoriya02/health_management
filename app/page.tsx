"use-client"

import PatientForm from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === 'true';

  return (
    <div className="flex relative h-screen max-h-screen">

      {
        isAdmin && <PassKeyModal />
      }

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image src="/assets/icons/logo-full.svg" alt="logo" height={1000} className="mb-12 h-10 w-fit" width={1000} />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2025 CarePulse</p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>

      <Image src={'/assets/images/onboarding-img.png'} alt="main-img" height={1000} width={1000} className="side-img max-w-[50%]" />
    </div>
  );
}
