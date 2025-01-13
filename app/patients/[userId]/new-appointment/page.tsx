"use-client"

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import PatientForm from "@/components/forms/PatientForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
    const patient = await getPatient(userId);
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Image src="/assets/icons/logo-full.svg" alt="logo" height={1000} className="mb-12 h-10 w-fit" width={1000} />

                    <AppointmentForm type='create' userId={userId} patientId={patient.$id} />

                    <p className="copyright py-10">© 2025 CarePulse</p>
                </div>
            </section>

            <Image src={'/assets/images/appointment-img.png'} alt="main-img" height={1000} width={1000} className="side-img max-w-[400px] bg-bottom" />
        </div>
    );
}

export default NewAppointment