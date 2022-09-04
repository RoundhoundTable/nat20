import { ApolloError } from "@apollo/client";
import { useState } from "react";

export const useForm = <T>(initialValue?: T) => {
  const [form, setForm] = useState<T>(initialValue as T);

  const onChange = (ev: any) =>
    setForm({
      ...form,
      [ev.target.name]: ev.target.value,
    } as T);

  const updateForm = (newForm: T) => setForm({ ...form, ...newForm });

  const resetForm = () => setForm(initialValue as T);

  return {
    form,
    resetForm,
    updateForm,
    onChange,
  };
};
