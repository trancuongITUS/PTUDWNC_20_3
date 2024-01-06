import { Control, FieldErrors } from 'react-hook-form';

export interface IFormProps {
  control: Control<any, any>;
  name: string;
  label?: string;
  errors?: FieldErrors;
}
