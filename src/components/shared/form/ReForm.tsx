/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
  resetOnSubmit?: boolean;
  className?: string;
  id?: string;
};

type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
} & TFormConfig;

const ReUseForm = ({
  children,
  onSubmit,
  onError,
  resolver,
  defaultValues,
  resetOnSubmit = false,
  className,
  id,
}: TFormProps) => {
  const formConfig: UseFormProps<FieldValues> = {};

  if (resolver) {
    formConfig.resolver = resolver;
  }

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm<FieldValues>(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FieldValues> = async (data) => {
    await onSubmit(data);

    if (resetOnSubmit) {
      reset(defaultValues);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className={className}
        onSubmit={handleSubmit(submit, onError)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default ReUseForm;
