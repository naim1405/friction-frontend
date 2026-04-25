// "use client"

// import { Label } from "@/components/ui/label";
// import { Controller, useFormContext } from "react-hook-form";
// import { cn } from "@/lib/utils";
// import dynamic from 'next/dynamic';
// import 'react-quill-new/dist/quill.snow.css';
// import './quill-custom.css'

// const ReactQuill = dynamic(() => import('react-quill-new'), {
//     ssr: false,
//     loading: () => <div className="h-[200px] w-full animate-pulse bg-muted rounded-md" />
// })

// type ReUseQuillProps = {
//     name: string;
//     label?: string;
//     fullWidth?: boolean;
//     required?: boolean;
//     className?: string;
//     placeholder?: string;
//     disabled?: boolean;
//     icon?: React.ReactElement;
//     handleValue?: (value: string) => void;
// }

// const ReUseQuill = ({
//     name,
//     fullWidth = true,
//     label = '',
//     required,
//     className,
//     placeholder,
//     disabled,
//     icon,
//     handleValue
// }: ReUseQuillProps) => {
//     const { control } = useFormContext()

//     return (
//         <Controller
//             control={control}
//             name={name}
//             render={({ field, fieldState: { error } }) => (
//                 <div className={cn("space-y-2 mb-15", fullWidth && "w-full")}>
//                     {label && (
//                         <Label
//                             htmlFor={name}
//                             className={cn(
//                                 error && "text-destructive",
//                                 required && "after:content-['*'] after:ml-0.5 after:text-destructive"
//                             )}
//                         >
//                             {label}
//                         </Label>
//                     )}
//                     <div className="relative">
//                         {icon && (
//                             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
//                                 {icon}
//                             </div>
//                         )}
//                         <ReactQuill
//                             theme="snow"
//                             value={field.value || ''}
//                             onChange={(content) => {
//                                 field.onChange(content);
//                                 handleValue?.(content);
//                             }}
//                             placeholder={placeholder}
//                             readOnly={disabled}
//                             className={cn(
//                                 "bg-background",
//                                 error && "border-destructive",
//                                 icon && "pl-10",
//                                 className
//                             )}
//                             modules={{
//                                 toolbar: [
//                                     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//                                     ['bold', 'italic', 'underline', 'strike'],
//                                     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//                                     [{ 'color': [] }, { 'background': [] }],
//                                     [{ 'align': [] }],
//                                     ['link', 'image'],
//                                     ['clean']
//                                 ]
//                             }}
//                             formats={[
//                                 'header',
//                                 'bold', 'italic', 'underline', 'strike',
//                                 'list', 'bullet',
//                                 'color', 'background',
//                                 'align',
//                                 'link', 'image'
//                             ]}
//                         />
//                     </div>
//                     {error?.message && (
//                         <p
//                             id={`${name}-error`}
//                             className="text-sm text-destructive"
//                         >
//                             {error.message}
//                         </p>
//                     )}
//                 </div>
//             )}
//         />
//     )
// }

// export default ReUseQuill;
