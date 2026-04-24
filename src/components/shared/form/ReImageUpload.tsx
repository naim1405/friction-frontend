/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

type IImageUploadController = {
    name: string;
    label?: string;
    fullWidth?: boolean;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    height?: number;
    acceptedFormats?: string;
    maxSize?: string;
    description?: string;
}

const ReUseImageUpload = ({
    name,
    fullWidth = true,
    label = '',
    required,
    className,
    disabled,
    height = 320,
    acceptedFormats = "PNG, JPG, GIF",
    maxSize = "10MB",
    description
}: IImageUploadController) => {
    const { control, watch } = useFormContext();
    const [preview, setPreview] = useState<string | null>(null);

    // Watch the current value to handle default/edit mode
    const currentValue = watch(name);

    // Set preview from existing URL when value changes (for edit mode)
    useEffect(() => {
        if (currentValue && typeof currentValue === 'string') {
            setPreview(currentValue);
        }
    }, [currentValue]);

    const handleFileChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
        if (file) {
            onChange(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            onChange(undefined);
            setPreview(null);
        }
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <div className={cn("space-y-3", fullWidth && "w-full")}>
                    {label && (
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Upload className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <Label
                                    htmlFor={name}
                                    className={cn(
                                        "text-lg font-semibold",
                                        error && "text-destructive",
                                        required && "after:content-['*'] after:ml-0.5 after:text-destructive"
                                    )}
                                >
                                    {label}
                                </Label>
                                {description && (
                                    <p className="text-xs text-muted-foreground">{description}</p>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="relative">
                        {preview ? (
                            <div
                                className={cn(
                                    "relative w-full rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-lg group",
                                    error && "border-destructive"
                                )}
                                style={{ height: `${height}px` }}
                            >
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                                <button
                                    type="button"
                                    onClick={() => handleFileChange(undefined, onChange)}
                                    disabled={disabled}
                                    className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2.5 hover:bg-red-600 transition shadow-lg hover:scale-110 transform disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <label
                                htmlFor={name}
                                className={cn(
                                    "flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all hover:border-primary group",
                                    disabled && "opacity-50 cursor-not-allowed",
                                    error && "border-destructive",
                                    className
                                )}
                                style={{ height: `${height}px` }}
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition mb-4">
                                        <Upload className="w-10 h-10 text-primary" />
                                    </div>
                                    <p className="text-base font-semibold text-foreground mb-1">
                                        Drop your image here
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        or click to browse
                                    </p>
                                    <p className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                        {acceptedFormats} up to {maxSize}
                                    </p>
                                </div>
                                <input
                                    id={name}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    disabled={disabled}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        handleFileChange(file, onChange);
                                    }}
                                    aria-invalid={!!error}
                                    aria-describedby={error ? `${name}-error` : undefined}
                                />
                            </label>
                        )}
                    </div>

                    {error?.message && (
                        <p
                            id={`${name}-error`}
                            className="text-sm text-destructive"
                        >
                            {error.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
};

export default ReUseImageUpload;