'use-client'

import React from 'react'
import { Input } from "@/components/ui/input"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { Control } from 'react-hook-form'
import Image from 'next/image'
import { E164Number } from 'libphonenumber-js/core'
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
}

interface CustomProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
    fieldType: FormFieldType;
}

const RenderInput = ({ field, props }: { field: any, props: CustomProps }) => {
    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-[10px] w-full border border-dark-500 bg-dark-400'>
                    {props.iconSrc && (
                        <Image
                            alt={props.iconAlt || 'iconSrc'}
                            height={24}
                            width={24}
                            className='ml-2'
                            src={props.iconSrc}
                        />
                    )}
                    <FormControl>
                        <Input
                            className='shad-input rounded-[10px] border-0'
                            {...field}
                            placeholder={props.placeholder}
                        />
                    </FormControl>
                </div>
            );

        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl className='rounded-[10px]'>
                    <PhoneInput
                        defaultCountry='IN'
                        international
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className='input-phone'
                        placeholder={props.placeholder}
                    />
                </FormControl>
            );

        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-[10px] border border-dark-500 bg-dark-400">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="user"
                        className="ml-2"
                    />
                    <FormControl>
                        <ReactDatePicker
                            showTimeSelect={props.showTimeSelect ?? false}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            timeInputLabel="Time:"
                            dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            );

        case FormFieldType.SKELETON:
            return (
                props.renderSkeleton ? props.renderSkeleton(field) : null
            );

        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger rounded-[10px]">
                                <SelectValue placeholder={props.placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content rounded-[10px]">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            );

        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={props.placeholder}
                        {...field}
                        className="shad-textArea rounded-[10px]"
                        disabled={props.disabled}
                    />
                </FormControl>
            );

        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={props.name} className="checkbox-label">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            );
    }
}

const CustomFormField = (props: CustomProps) => {
    return (
        <FormField
            control={props.control}
            name={props.name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {
                        props.fieldType !== FormFieldType.CHECKBOX && props.label &&
                        <FormLabel>
                            {props.label}
                        </FormLabel>
                    }

                    <RenderInput field={field} props={props} />
                    <FormMessage className='shad-error' />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField
