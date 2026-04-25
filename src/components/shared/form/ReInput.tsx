"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactElement } from "react";

type IController = {
  name: string;
  label?: string;
  type?: string;
  size?: "default" | "sm" | "lg";
  fullWidth?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: ReactElement;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  handleValue?: (value: string) => void;
};

const ReUseInput = ({
  name,
  type = "text",
  size = "default",
  fullWidth = true,
  label = "",
  required,
  className,
  placeholder,
  disabled,
  icon,
  autoComplete,
  inputMode,
  handleValue,
}: IController) => {
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
                "text-sm font-medium",
                error && "text-destructive",
                required &&
                  "after:content-['*'] after:ml-0.5 after:text-destructive",
              )}
            >
              {label}
            </Label>
          )}
          <div className="group relative">
            {icon && (
              <div
                className={cn(
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors",
                  error && "text-destructive",
                )}
              >
                {icon}
              </div>
            )}
            <Input
              {...field}
              value={type === "file" ? undefined : (field.value ?? "")}
              id={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete={autoComplete}
              inputMode={inputMode}
              onChange={(e) => {
                if (type === "file") {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                  handleValue?.(e.target.value);
                } else {
                  field.onChange(e);
                  handleValue?.(e.target.value);
                }
              }}
              className={cn(
                "h-11 rounded-xl border-border/70 bg-background/80 shadow-xs transition-all duration-200",
                "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20",
                icon && "pl-10",
                size === "sm" && "h-8",
                size === "lg" && "h-12",
                error && "border-destructive focus-visible:ring-destructive",
                className,
              )}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            />
          </div>
          {error?.message && (
            <p id={`${name}-error`} className="text-sm text-destructive">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default ReUseInput;
