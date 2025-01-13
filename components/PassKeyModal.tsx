"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from '@/lib/utils'


const PassKeyModal = () => {
    const router = useRouter()
    const path = usePathname()
    const [open, setOpen] = useState(true)
    const [passKey, setPassKey] = useState("")
    const [error, setError] = useState("")

    const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('adminAccessKey') : null

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey)
        if (path) {
            if (accessKey === "020604") {
                setOpen(false)
                router.push('/admin')
            }
            else {
                setOpen(true)
            }
        }
    }, [encryptedKey])

    const handleClose = () => {
        setOpen(false)
        router.push('/')
    }

    const validatePassKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (passKey === "020604") {
            const encryptedKey = encryptKey(passKey)
            localStorage.setItem('adminAccessKey', encryptedKey)
            setOpen(false)
            router.push('/admin')
        }
        else {
            setError("Invalid Passkey, Please try again")
        }
    }

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className='space-y-4 bg-dark-400 border-none outline-none !rounded-[10px]'>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='flex items-start justify-between'>
                            Admin Access Verification
                            <Image className='cursor-pointer' src={'/assets/icons/close.svg'} alt='close' height={20} width={20} onClick={handleClose} />
                        </AlertDialogTitle>
                        <AlertDialogDescription className='tracking-[0.02rem]'>
                            To access the admin page, please enter the passkey.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className=''>
                        <InputOTP maxLength={6} value={passKey} onChange={(val) => setPassKey(val)}>
                            <InputOTPGroup className='w-full flex gap-1 justify-between'>
                                <InputOTPSlot className='size-16 rounded-[10px] !text-[32px] p-1 font-bold justify-center flex border border-dark-500 gap-4' index={0} />
                                <InputOTPSlot className='size-16 rounded-[10px] !text-[32px] p-1 font-bold justify-center flex border border-dark-500 gap-4' index={1} />
                                <InputOTPSlot className='size-16 rounded-[10px] !text-[32px] p-1 font-bold justify-center flex border border-dark-500 gap-4' index={2} />
                                <InputOTPSlot className='size-16 rounded-[10px] !text-[32px] p-1 font-bold justify-center flex border border-dark-500 gap-4' index={3} />
                                <InputOTPSlot className='size-16 rounded-[10px] !text-[32px] p-1 font-bold justify-center flex border border-dark-500 gap-4' index={4} />
                                <InputOTPSlot className='size-16 rounded-[10px] !text-[32px] p-1 font-bold justify-center flex border border-dark-500 gap-4' index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>{error}</p>}

                    </div>

                    <AlertDialogFooter>
                        <AlertDialogAction className='shad-primary-btn rounded-[10px] w-full' onClick={(e) => validatePassKey(e)}>
                            Enter Admin Passkey
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )
}

export default PassKeyModal
