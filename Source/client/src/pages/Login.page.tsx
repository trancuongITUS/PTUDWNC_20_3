import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IUserResponse } from 'services/types';
import { TypeOf, object, string } from 'zod';
import FormInput from '../components/form/FormInput';
import { useStateContext } from '../context';
import { authApi, loginUserFn } from '../services/authApi';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const loginSchema = object({
  username: string().min(1, 'User name is required').max(100),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const stateContext = useStateContext();

  const getMeFn = async () => {
    const response = await authApi.get<IUserResponse>('users/me');
    stateContext.dispatch({ type: 'SET_USER', payload: response.data.data.user });
    return response.data;
  };

  // API Get Current Logged-in user
  const query = useQuery({
    queryFn: getMeFn,
    queryKey: ['authUser'],
    enabled: false,
    retry: 1,
  });

  //  API Login Mutation
  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: (userData: LoginInput) => loginUserFn(userData),
    onSuccess: () => {
      query.refetch();
      toast.success('You successfully logged in', {
        hideProgressBar: true,
      });
      navigate('/');
    },
    onError: (error: any) => {
      toast.error((error as any).response.data.message, {
        position: 'top-right',
        hideProgressBar: true,
      });
    },
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<LoginInput> = values => {
    // 👇 Executing the loginUser Mutation
    loginUser(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#2363eb',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          textAlign="center"
          component="h1"
          sx={{
            color: '#f9d13e',
            fontWeight: 600,
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Welcome Back!
        </Typography>
        <Typography variant="body1" component="h2" sx={{ color: '#e5e7eb', mb: 2 }}>
          Login to have access!
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
            <FormInput name="username" label="User name" />
            <FormInput name="password" label="Password" type="password" />

            {/* <Typography sx={{ fontSize: '0.9rem', mb: '1rem', textAlign: 'right' }}>
              <LinkItem to="/" style={{ color: '#333' }}>
                Forgot Password?
              </LinkItem>
            </Typography> */}

            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type="submit"
              loading={isPending}
            >
              Login
            </LoadingButton>

            <Typography sx={{ fontSize: '0.9rem', mt: '1rem' }}>
              Need an account? <LinkItem to="/register">Sign Up Here</LinkItem>
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default LoginPage;
