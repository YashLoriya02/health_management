"use-client"

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { getPatient } from "@/lib/actions/patient.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || ""
    const appointment = await getAppointment(appointmentId);

    const doctor = Doctors.find(d => d.name === appointment.primaryPhysician)

    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="success-img">
                <Link href={'/'}>
                    <Image src={"/assets/icons/logo-full.svg"} alt="logo" height={1000} width={1000} className="h-10 w-fit" />
                </Link>
                <section className="flex flex-col gap-10 items-center">
                    <Image src={'/assets/gifs/success.gif'} height={300} width={280} alt="success" />
                    <h2 className="header text-center w-[70%]">
                        Your <span className="text-green-500">appointment request</span> has been successfully submitted.
                    </h2>
                    <p className="tracking-wide">We will be in touch ASAP to confirm</p>
                </section>
                <section className="request-details">
                    <p>Requested Appointment Details:</p>
                    <div className="flex items-center gap-4">
                        <Image src={doctor?.image!} alt="doctor" height={100} width={100} className="size-8" />
                        <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
                    </div>
                    <div className="flex gap-3">
                        <Image src={"/assets/icons/calendar.svg"} alt="calendar" width={24} height={24} />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant={'outline'} asChild className="border-none shad-primary-btn rounded-[10px]">
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment
                    </Link>

                </Button>

            </div>
        </div>
    );
}

export default Success