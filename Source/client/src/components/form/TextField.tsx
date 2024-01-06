import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { IFormProps } from '../../models/Form';
import Error from './Error';

type ITextFieldProps = {
  type?: string;
  placeholer?: string;
} & IFormProps;

const TextField: FC<ITextFieldProps> = ({ control, name, label, errors, type, placeholer }) => {
  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <div>
          <label className="mb-2.5 block text-black dark:text-white">{label}</label>
          <input
            {...field}
            type={type}
            placeholder={placeholer}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <Error name={name} errors={errors} />
        </div>
      )}
    />
  );
};

export default TextField;
