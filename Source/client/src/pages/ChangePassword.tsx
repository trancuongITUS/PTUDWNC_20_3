import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Breadcrumb from '../components/Breadcrumb';
import TextField from '../components/form/TextField';
import { ChangePasswordInput, changePasswordSchema } from '../models/ChangePassword';
import { changePasswordFn } from '../services/authApi';
import SubmitButton from '../components/form/SubmitButton';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  // 👇 Calling the Register Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (pass: ChangePasswordInput) => changePasswordFn(pass),
    onSuccess(data) {
      toast.success(data?.message, {
        hideProgressBar: true,
        autoClose: 1000,
      });
      reset({});
      navigate('/');
    },
    onError(error: any) {
      toast.error((error as any).response.data.message, {
        position: 'top-right',
        hideProgressBar: true,
        autoClose: 1000,
      });
    },
  });

  const onSubmitHandler: SubmitHandler<ChangePasswordInput> = values => {
    mutate(values);
  };

  const onErrorHandler: SubmitErrorHandler<ChangePasswordInput> = values => {
    console.log(values);
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Change Password" />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-5">
            {/* <!-- orm --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <form onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}>
                <div className="p-6.5">
                  <TextField
                    control={control}
                    name="oldPassword"
                    errors={errors}
                    label="Old Password"
                    type="password"
                    placeholer="Enter your old password"
                  />

                  <br />
                  <TextField
                    control={control}
                    name="newPassword"
                    errors={errors}
                    label="New Password"
                    type="password"
                    placeholer="Enter your new password"
                  />

                  <br />

                  <TextField
                    control={control}
                    name="passwordConfirm"
                    errors={errors}
                    label="Confirm Password"
                    type="password"
                    placeholer="Enter your new password again"
                  />

                  <br />

                  <SubmitButton label="Change password" isPending={isPending} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
