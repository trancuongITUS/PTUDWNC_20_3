import { FC, ReactNode } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface IFormProps {
  control: Control<any, any>;
  name: string;
  label: string;
  errors?: FieldErrors;
}

type ITextFieldProps = {
  type?: string;
  placeholer?: string;
  icon?: ReactNode;
} & IFormProps;

const TextField: FC<ITextFieldProps> = ({
  control,
  name,
  label,
  errors,
  type,
  placeholer,
  icon,
}) => {
  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            {label}
          </label>
          <div className="relative">
            <input
              {...field}
              type={type}
              placeholder={placeholer}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />

            {/* TODO: */}
            <p className="text-red-500">
              {errors?.[name] ? (errors[name]?.message as string) : ''}
            </p>

            <span className="absolute right-4 top-4">{icon}</span>
          </div>
        </div>
      )}
    />
  );
};

export default TextField;
