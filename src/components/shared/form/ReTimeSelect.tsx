"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

type ITimeSelectController = {
    name: string;
    label?: string;
    fullWidth?: boolean;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    min?: string;
    max?: string;
    step?: number;
    showIcon?: boolean;
}

const ReUseTimeSelect = ({
    name,
    fullWidth = true,
    label = '',
    required,
    className,
    disabled,
    min,
    max,
    step,
    showIcon = true
}: ITimeSelectController) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <div className={cn("space-y-2", fullWidth && "w-full")}>
                    {label && (
                        <Label
                            htmlFor={name}
                            className={cn(
                                "font-medium text-sm flex items-center gap-2",
                                error && "text-destructive",
                                required && "after:content-['*'] after:ml-0.5 after:text-destructive"
                            )}
                        >
                            {showIcon && <Clock className="w-4 h-4" />}
                            {label}
                        </Label>
                    )}
                    <div className="relative">
                        <Input
                            {...field}
                            value={field.value ?? ''}
                            id={name}
                            type="time"
                            disabled={disabled}
                            min={min}
                            max={max}
                            step={step}
                            className={cn(
                                "h-11 bg-white dark:bg-slate-900 border-2",
                                error && "border-destructive focus-visible:ring-destructive",
                                className
                            )}
                            aria-invalid={!!error}
                            aria-describedby={error ? `${name}-error` : undefined}
                        />
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

export default ReUseTimeSelect;