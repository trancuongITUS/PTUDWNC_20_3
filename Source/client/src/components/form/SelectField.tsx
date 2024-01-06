import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { IFormProps } from '../../models/Form';
import { IOption } from '../../models/Option';
import Error from './Error';

type ISelectFieldProps = {
  options: IOption[];
  defaultValue?: string;
  classes?: string;
} & IFormProps;

const SelectField: FC<ISelectFieldProps> = ({
  control,
  name,
  label,
  options,
  defaultValue,
  errors,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div>
            <label className="mb-2.5 block text-black dark:text-white">{label}</label>
            <select
              id="large"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              defaultValue={defaultValue}
              {...field}
            >
              {options.map(item => {
                return (
                  <option value={item.value} disabled={item.disabled}>
                    <div>{item.label}</div>
                  </option>
                );
              })}
            </select>
          </div>
        )}
      />
      <Error name={name} errors={errors} />
    </>
  );
};

export default SelectField;
