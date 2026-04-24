"use client";

import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type TSelectOption =
    | string
    | {
        label: string;
        value: string;
    };

type IController = {
    name: string;
    label?: string;
    placeholder?: string;
    size?: "default" | "sm" | "lg";
    fullWidth?: boolean;
    required?: boolean;
    options: TSelectOption[];
    className?: string;
    disabled?: boolean;
    handleValue?: (value: string) => void;
}

const ReUseSelect = ({
    name,
    size = 'default',
    fullWidth = true,
    label,
    placeholder = "Select an option",
    required,
    options,
    className,
    disabled,
    handleValue,
}: IController) => {
    const { control } = useFormContext();

    const mappedOptions = options.map((option) => {
        if (typeof option === "string") {
            return {
                label: option,
                value: option,
            };
        }

        return option;
    });

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                const isError = Boolean(error);

                return (
                    <div className={cn("space-y-2", fullWidth && "w-full")}>
                    {label && (
                        <Label
                            htmlFor={name}
                            className={cn(
                                "text-sm font-medium",
                                isError && "text-destructive",
                                required && "after:content-['*'] after:ml-0.5 after:text-destructive"
                            )}
                        >
                            {label}
                        </Label>
                    )}
                    <Select
                        value={field.value ?? ''}
                        onValueChange={(value) => {
                            field.onChange(value);
                            handleValue?.(value);
                        }}
                        disabled={disabled}
                    >
                        <SelectTrigger
                            id={name}
                            className={cn(
                                "h-11 w-full rounded-xl border-border/70 bg-background/80 shadow-xs transition-all duration-200",
                                "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20",
                                size === "sm" && "h-8",
                                size === "lg" && "h-12",
                                isError && "border-destructive focus-visible:ring-destructive",
                                className
                            )}
                            aria-invalid={isError}
                            aria-describedby={isError ? `${name}-error` : undefined}
                        >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border/70 bg-background/95 shadow-2xl backdrop-blur-lg">
                            {mappedOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {isError && (
                        <p
                            id={`${name}-error`}
                            className="text-sm text-destructive"
                        >
                            {error?.message}
                        </p>
                    )}
                </div>
                );
            }}
        />
    );
}

export default ReUseSelect;