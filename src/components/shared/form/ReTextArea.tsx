"use client";

import type { ReactElement } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from "@/lib/utils";

type ITextareaController = {
    name: string;
    label?: string;
    placeholder?: string;
    minRows?: number;
    maxRows?: number;
    fullWidth?: boolean;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    icon?: ReactElement;
    handleValue?: (value: string) => void;
}

const ReUseTextarea = ({
    name,
    label = '',
    placeholder = '',
    minRows = 3,
    maxRows,
    fullWidth = true,
    required = false,
    className,
    disabled,
    icon,
    handleValue
}: ITextareaController) => {
    const { control } = useFormContext();

    const minHeight = minRows ? `${minRows * 24}px` : undefined;
    const maxHeight = maxRows ? `${maxRows * 24}px` : undefined;

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
                                "text-sm font-medium",
                                error && "text-destructive",
                                required && "after:content-['*'] after:ml-0.5 after:text-destructive"
                            )}
                        >
                            {label}
                        </Label>
                    )}
                    <div className="group relative">
                        {icon && (
                            <div
                                className={cn(
                                    "pointer-events-none absolute left-3 top-3 z-10 text-muted-foreground transition-colors",
                                    error && "text-destructive"
                                )}
                            >
                                {icon}
                            </div>
                        )}
                        <Textarea
                            {...field}
                            value={field.value ?? ''}
                            id={name}
                            placeholder={placeholder}
                            disabled={disabled}
                            onChange={(e) => {
                                field.onChange(e);
                                handleValue?.(e.target.value);
                            }}
                            className={cn(
                                "resize-y rounded-xl border-border/70 bg-background/80 shadow-xs transition-all duration-200",
                                "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20",
                                icon && "pl-10",
                                error && [
                                    "border-destructive",
                                    "focus-visible:ring-destructive"
                                ],
                                className
                            )}
                            style={{
                                minHeight,
                                maxHeight
                            }}
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

export default ReUseTextarea;