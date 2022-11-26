import { useState } from "react";
import { z } from "zod";
import { Nat20Error } from "../utils/Nat20Error";
import { formatError } from "../utils/formatError";
import { ApolloError } from "@apollo/client";

export const useForm = <T>({
  initialValue,
  schema,
}: {
  initialValue?: T;
  schema?: z.AnyZodObject | z.ZodEffects<any, any, any>;
}) => {
  const [form, setForm] = useState<T>((initialValue ?? {}) as T);
  const [errors, setErrors] = useState<T>();

  const onError = (error: ApolloError) => {
    setErrors({
      ...errors,
      ...formatError(error),
    } as unknown as T);
  };

  const onChange = (ev: any) => {
    if (ev.target.type === "number" && !/^-?\d+$/.test(ev.target.value)) return;

    if (ev.target.name.includes(".")) {
      const [parent, child] = ev.target.name.split(".");

      setForm({
        ...form,
        [parent]: {
          ...form[parent as keyof T],
          [child]: ev.target.value,
        } as T,
      } as T);

      return;
    }

    setForm({
      ...form,
      [ev.target.name]: ev.target.value,
    } as T);

    return;
  };

  const resetErrors = () => {
    setErrors(undefined);
  };

  const updateForm = (newForm: Partial<T>) =>
    setForm((state) => {
      return { ...state, ...newForm };
    });

  const resetForm = () => setForm(initialValue as T);

  const submit = ({ ev, func }: { ev?: any; func: (...args: any) => any }) => {
    try {
      if (ev) ev.preventDefault();

      if (schema) {
        const result = schema.safeParse({
          ...form,
        });

        resetErrors();
        if (!result.success) throw formatError(result.error);
      }

      func();
    } catch (err) {
      if (err instanceof Array<Nat20Error>) {
        err.forEach((natError) => {
          if (natError.field.includes(".")) {
            const [parent, child] = natError.field.split(".");

            setErrors(
              (state) =>
                ({
                  ...state,
                  [parent as keyof T]: {
                    ...state![parent as keyof T],
                    [child]: natError.message,
                  },
                } as unknown as T)
            );

            return;
          } else if (natError.field.includes("+")) {
            const [field, sibling] = natError.field.split("+");

            setErrors(
              (state) =>
                ({
                  ...state,
                  [field]: natError.message,
                  [sibling]: natError.message,
                } as unknown as T)
            );

            return;
          }

          setErrors((state) => {
            return { ...state, [natError.field]: natError.message } as T;
          });
        });
      }
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
    onError,
  };
};
