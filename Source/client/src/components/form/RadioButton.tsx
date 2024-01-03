import { forwardRef } from 'react';
import { IOption } from '../../models/Option';

type IRadioProps = {
  option?: IOption;
  name?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  onChange?: (value?: string) => void;
};

const RadioButton = ({ option, name, value, label, disabled, onChange }: IRadioProps, ref: any) => {
  const isChecked = value === option?.value;

  const handleOnChange = () => {
    onChange?.(option?.value);
  };

  return (
    <div>
      <label htmlFor={option?.value} className="flex cursor-pointer select-none items-center m-3">
        <div className="relative">
          <input
            key={option?.value}
            ref={ref}
            type="radio"
            id={option?.value}
            name={name}
            value={value}
            className="sr-only"
            onChange={handleOnChange}
            aria-label={label}
            disabled={disabled}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
              isChecked && 'border-primary'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${isChecked && '!bg-primary'}`}
            >
              {' '}
            </span>
          </div>
        </div>
        <label className="block font-semibold text-2xl text-black dark:text-white">
          {option?.label}
        </label>
      </label>
    </div>
  );
};

export default forwardRef(RadioButton);
