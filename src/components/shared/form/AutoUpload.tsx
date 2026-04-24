import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IUpload = {
    name: string;
    label: string;
    accept?: string;
    className?: string;
    icon?: React.ReactNode;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    onFileUpload: (file: File) => void;
    showFileName?: boolean;
    allowDragDrop?: boolean;
}

export const AutoUpload = ({
    name,
    label,
    className,
    accept,
    icon,
    variant = 'default',
    size = 'default',
    onFileUpload,
    showFileName = false,
    allowDragDrop = false
}: IUpload) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = React.useState<string>('');
    const [isDragging, setIsDragging] = React.useState(false);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFile = (file: File) => {
        setFileName(file.name);
        onFileUpload(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        if (!allowDragDrop) return;
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        if (!allowDragDrop) return;
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        if (!allowDragDrop) return;
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && accept) {
            const acceptedTypes = accept.split(',').map(type => type.trim());
            const fileType = file.type || '';
            const fileExtension = `.${file.name.split('.').pop()}`;

            const isAccepted = acceptedTypes.some(type =>
                type === fileType || type === fileExtension ||
                (type.endsWith('/*') && fileType.startsWith(type.replace('/*', '')))
            );

            if (isAccepted) {
                handleFile(file);
            }
        } else if (file) {
            handleFile(file);
        }
    };

    if (allowDragDrop) {
        return (
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative rounded-lg border-2 border-dashed p-6 text-center transition-colors",
                    isDragging
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-muted-foreground/50",
                    className
                )}
            >
                <div className="flex flex-col items-center gap-2">
                    {icon || <Upload className="h-8 w-8 text-muted-foreground" />}
                    <div className="flex flex-col gap-1">
                        <Button
                            type="button"
                            variant={variant}
                            size={size}
                            onClick={handleClick}
                            className="gap-2"
                        >
                            {label || 'Upload file'}
                        </Button>
                        <p className="text-sm text-muted-foreground">
                            or drag and drop
                        </p>
                    </div>
                    {showFileName && fileName && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileIcon className="h-4 w-4" />
                            <span>{fileName}</span>
                        </div>
                    )}
                </div>
                <Input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={handleFileChange}
                    name={name}
                    aria-label={label}
                />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                type="button"
                variant={variant}
                size={size}
                onClick={handleClick}
                className={cn("gap-2 rounded-full", className)}
            >
                {icon || <Upload className="h-4 w-4" />}
                {label || ''}
            </Button>
            {showFileName && fileName && (
                <span className="text-sm text-muted-foreground">{fileName}</span>
            )}
            <Input
                ref={fileInputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={handleFileChange}
                name={name}
                aria-label={label}
            />
        </div>
    );
};