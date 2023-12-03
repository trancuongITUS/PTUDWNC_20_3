import { Box, Container, Typography } from '@mui/material';
import { useStateContext } from '../context';
import { TypeOf, object, string } from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi, updateUserFn } from '../services/authApi';
import { toast } from 'react-toastify';
import FormInput from '../components/form/FormInput';
import { LoadingButton } from '@mui/lab';
import { IUserResponse } from 'services/types';

const updateSchema = object({
  fullname: string().min(1, 'Full name is required').max(100),
  email: string().min(1, 'Email address is required').email('Email Address is invalid'),
});

export type UpdateInput = TypeOf<typeof updateSchema>;

const ProfilePage = () => {
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;

  const getMeFn = async () => {
    const response = await authApi.get<IUserResponse>('users/me');
    stateContext.dispatch({ type: 'SET_USER', payload: response.data.result });
    return response.data.result;
  };

  // API Get Current Logged-in user
  const { refetch } = useQuery({
    queryFn: getMeFn,
    queryKey: ['authUser'],
    enabled: false,
    retry: 1,
  });

  const methods = useForm<UpdateInput>({
    resolver: zodResolver(updateSchema),
    defaultValues: { fullname: user?.fullname, email: user?.email },
  });

  // 👇 Calling the Register Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (userData: UpdateInput) => updateUserFn(userData),
    onSuccess(data) {
      refetch();
      toast.success(data?.message, {
        hideProgressBar: true,
        autoClose: 1000,
      });
    },
    onError(error: any) {
      toast.error((error as any).response.data.message, {
        position: 'top-right',
        hideProgressBar: true,
        autoClose: 1000,
      });
    },
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<UpdateInput> = values => {
    // 👇 Execute the Mutation
    mutate(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: '#2363eb',
        minHeight: '100vh',
        pt: '5rem',
      }}
    >
      <Box
        maxWidth="lg"
        sx={{
          backgroundColor: '#ece9e9',
          maxHeight: '30rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: '2rem',
          mx: 'auto',
        }}
      >
        <Typography variant="h2" component="h1" sx={{ color: '#1f1e1e', fontWeight: 500 }}>
          Profile Page
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
            maxWidth="27rem"
            width="100%"
            sx={{
              backgroundColor: '#e5e7eb',
              p: { xs: '1rem', sm: '2rem' },
              borderRadius: 2,
            }}
          >
            <FormInput name="fullname" label="Full Name" />
            <FormInput name="email" label="Email" />
            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type="submit"
              loading={isPending}
            >
              Update
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default ProfilePage;
