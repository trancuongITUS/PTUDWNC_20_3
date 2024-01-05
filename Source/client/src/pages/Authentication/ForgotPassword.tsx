import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextFieldIcon from '../../components/form/TextFieldIcon';
import { useStateContext } from '../../context';
import { ForgotPasswordInput, forgotPasswordSchema } from '../../models/ForgotPassword';
import { forgotPasswordFn } from '../../services/authApi';
import SubmitButton from '../UiElements/SubmitButton';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const stateContext = useStateContext();

  //  API Login Mutation
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: (mail: ForgotPasswordInput) => forgotPasswordFn(mail),
    onSuccess: data => {
      toast.success('You successfully logged in', {
        hideProgressBar: true,
        autoClose: 1000,
      });
      stateContext.dispatch({ type: 'SET_USER', payload: data.user });
      navigate('/');
    },
    onError: (error: any) => {
      toast.error((error as any).response.data.message, {
        position: 'top-right',
        hideProgressBar: true,
        autoClose: 1000,
      });
    },
  });

  const onSubmitHandler: SubmitHandler<ForgotPasswordInput> = values => {
    forgotPassword(values);
  };

  const onErrorHandler: SubmitErrorHandler<ForgotPasswordInput> = values => {
    console.log(values);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center min-h-screen">
          <div className="border-stroke dark:border-strokedark xl:w-1/2 border-2 rounded-md">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Forgot Password
              </h2>

              <form onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}>
                <TextFieldIcon
                  control={control}
                  name="email"
                  errors={errors}
                  label="Email"
                  icon={<MdOutlineEmail />}
                />

                <SubmitButton label="Sign In" isPending={isPending} />

                <div className="mt-6 text-center">
                  <Link to="/login" className="text-primary">
                    Comeback to sign in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
