import { FC, ReactNode } from 'react';
import { Controller } from 'react-hook-form';
import { IFormProps } from '../../models/Form';
import Error from './Error';

type ITextFieldIconProps = {
  type?: string;
  placeholer?: string;
  icon?: ReactNode;
} & IFormProps;

const TextFieldIcon: FC<ITextFieldIconProps> = ({
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
          <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>
          <div className="relative">
            <input
              {...field}
              type={type}
              placeholder={placeholer}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />

            <Error name={name} errors={errors} />

            <span className="absolute right-4 top-4">{icon}</span>
          </div>
        </div>
      )}
    />
  );
};

export default TextFieldIcon;
