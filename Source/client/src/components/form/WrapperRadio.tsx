import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { IFormProps } from '../../models/Form';
import { IOption } from '../../models/Option';
import RadioButton from './RadioButton';
import Error from './Error';

type IWrapperRadioProps = {
  options: IOption[];
  defaultValue?: string;
  classes?: string;
} & IFormProps;

const WrapperRadio: FC<IWrapperRadioProps> = ({
  control,
  name,
  label,
  options,
  defaultValue,
  errors,
  classes,
}) => {
  return (
    <>
      <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, ...props } }) => (
          <div className={classes}>
            {options.map((option, index) => (
              <RadioButton
                key={index}
                {...props}
                onChange={onChange}
                option={option}
                label={label}
                name={name}
              />
            ))}
          </div>
        )}
      />
      <Error name={name} errors={errors} />
    </>
  );
};

export default WrapperRadio;
