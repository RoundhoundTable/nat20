import { ApolloError } from "@apollo/client";
import { useState } from "react";

export const useForm = <T>({ initialValue }: { initialValue?: T }) => {
  const [form, setForm] = useState<T>(initialValue as T);
  const [errors, setErrors] = useState<T | null>();

  const onChange = (ev: any) =>
    setForm({
      ...form,
      [ev.target.name]: ev.target.value,
    } as T);

  const resetErrors = () => {
    setErrors(null);
  };

  const updateForm = (newForm: T) => setForm({ ...form, ...newForm });

  const resetForm = () => setForm(initialValue as T);

  const submit = async ({
    ev,
    func,
  }: {
    ev?: any;
    func: (...args: any) => any;
  }) => {
    try {
      if (ev) ev.preventDefault();

      resetErrors();

      func();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    form,
    resetForm,
    updateForm,
    onChange,
    errors,
    resetErrors,
    submit,
  };
};
