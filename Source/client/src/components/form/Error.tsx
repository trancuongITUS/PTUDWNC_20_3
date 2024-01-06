import { FC } from 'react';
import { FieldErrors } from 'react-hook-form';

export interface IErrorProps {
  name: string;
  errors?: FieldErrors;
}

const Error: FC<IErrorProps> = ({ name, errors }) => {
  return (
    <span className="flex items-center font-medium tracking-wide text-meta-1 text-xs mt-1 ml-1">
      {errors?.[name] ? (errors[name]?.message as string) : ''}
    </span>
  );
};

export default Error;
