import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { IoPersonOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import api from '../api';
import Breadcrumb from '../components/Breadcrumb';
import ConfirmButton from '../components/dialog/ConfirmButton';
import Button from '../components/form/Button';
import Error from '../components/form/Error';
import { useStateContext } from '../context';
import useDialog from '../hooks/useDialog';
import { UpdateUserInput, updateUserSchema } from '../models/UpdateUser';
import { updateUserFn } from '../services/authApi';
import { IUserResponse } from '../services/types';
import { useEffect } from 'react';

const Profile = () => {
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;

  const { isOpen, open, close } = useDialog();

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    reset,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { fullname: user?.fullname, email: user?.email },
  });

  // trigger validate
  useEffect(() => {
    trigger();
  }, [isValid]);

  // 👇 Calling the Register Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (userData: UpdateUserInput) => updateUserFn(userData),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      toast.success(data?.message, {
        hideProgressBar: true,
        autoClose: 1000,
      });
      close();
    },
    onError(error: any) {
      toast.error((error as any).response.data.message, {
        position: 'top-right',
        hideProgressBar: true,
        autoClose: 1000,
      });
    },
  });

  const onSubmitHandler: SubmitHandler<UpdateUserInput> = values => {
    // 👇 Execute the Mutation
    mutate(values);
  };

  const onErrorHandler: SubmitErrorHandler<UpdateUserInput> = values => {
    console.log(values);
    close();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Profile" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-5">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="p-7">
                <div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full ">
                      <label className="mb-2.5 block text-black dark:text-white">Full Name</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3">
                          <IoPersonOutline className={'size-6'} />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          {...register('fullname')}
                        />
                        <Error name={'fullname'} errors={errors} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label className="mb-2.5 block text-black dark:text-white">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        {...register('email')}
                      />
                      <Error name={'email'} errors={errors} />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <Button label="Reset" transparent onClick={handleReset} disable={!isDirty} />
                    <ConfirmButton
                      label="Save"
                      isPending={isPending}
                      disable={!isDirty || !isValid}
                      isOpen={isOpen}
                      close={close}
                      onClick={open}
                      title={'Confirm Dialog'}
                      message={'Do you want to update your information?'}
                      onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
