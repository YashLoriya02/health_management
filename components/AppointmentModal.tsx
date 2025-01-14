"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types/appwrite.types";
import { AppointmentForm } from "./forms/AppointmentForm";
import "react-datepicker/dist/react-datepicker.css";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export const AppointmentModal = ({
    patientId,
    userId,
    appointment,
    type,
}: {
    patientId: string;
    userId: string;
    appointment?: Appointment;
    type: "schedule" | "cancel";
    title: string;
    description: string;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className={`capitalize border rounded-[10px] ${type === "schedule" ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-dark-200" : "border-red-400 text-red-400 hover:bg-red-400 hover:text-dark-200"}`}
                >
                    {type}
                </Button>
            </DialogTrigger>
            <DialogContent className="shad-dialog sm:max-w-md">
                <DialogHeader className="mb-4 space-y-3">
                    <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
                    <DialogDescription>
                        Please fill in the following details to {type} appointment
                    </DialogDescription>
                </DialogHeader>

                <AppointmentForm
                    userId={userId}
                    patientId={patientId}
                    type={type}
                    appointment={appointment}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    );
};