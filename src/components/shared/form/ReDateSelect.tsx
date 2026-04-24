"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

type IDateSelectController = {
    name: string;
    label?: string;
    fullWidth?: boolean;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    min?: string;
    max?: string;
    showIcon?: boolean;
}

const ReUseDateSelect = ({
    name,
    fullWidth = true,
    label = '',
    required,
    className,
    disabled,
    min,
    max,
    showIcon = true
}: IDateSelectController) => {
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
                                "font-medium text-sm flex items-center gap-1",
                                error && "text-destructive",
                                required && "after:content-['*'] after:ml-0.5 after:text-destructive"
                            )}
                        >
                            {label}
                        </Label>
                    )}
                    <div className="relative">
                        {showIcon && (
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
                                <Calendar className="w-4 h-4" />
                            </div>
                        )}
                        <Input
                            {...field}
                            value={field.value ?? ''}
                            id={name}
                            type="date"
                            disabled={disabled}
                            min={min}
                            max={max}
                            className={cn(
                                "h-11 bg-white dark:bg-slate-900 border-2",
                                showIcon && "pl-10",
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

export default ReUseDateSelect;