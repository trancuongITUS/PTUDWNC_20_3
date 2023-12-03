import { Box, Container, Grid, Typography } from '@mui/material';
import { useStateContext } from '../context';

const HomePage = () => {
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;
  return (
    <Container maxWidth={false} sx={{ backgroundColor: '#2363eb', minHeight: '100vh', pt: '5rem' }}>
      <Box
        maxWidth="md"
        sx={{
          backgroundColor: '#ece9e9',
          height: '15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h2" component="h1" sx={{ color: '#1f1e1e', fontWeight: 500 }}>
              Home Page
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h4" component="h3" sx={{ color: '#1f1e1e', fontWeight: 300 }}>
              Hello {user?.fullname}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
