import {
  AppBar,
  Box,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Link,
  Button,
} from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Routes } from '../../config/routes';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useCookies } from 'react-cookie';
import Cart from './Cart';
import { logoutThunk } from '../../redux/thunks/auth.thunk';

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const [, , remove] = useCookies();
  const items = useAppSelector((state) => state.cartReducer);
  const { isAuth } = useAppSelector((state) => state.authReduce);
  const [open, setOpen] = useState<boolean>(false);

  const handleStateViewDrawer = () => {
    setOpen((state) => !state);
  };

  const handleLogout = () => {
    dispatch(logoutThunk());
    remove('accessToken');
  };

  return (
    <Box sx={{ flexGrow: 1 }} position="sticky" zIndex="100">
      <AppBar>
        <Toolbar>
          <Container maxWidth="xl">
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography>REACT-TS-MUI</Typography>
              </Grid>
              <Grid item>
                <Stack spacing={2} direction="row" alignItems="center">
                  <IconButton color="primary" onClick={() => handleStateViewDrawer()}>
                    <Badge color="error" badgeContent={items.length}>
                      <ShoppingCartOutlined />
                    </Badge>
                  </IconButton>
                  {isAuth ? (
                    <Button variant="contained" onClick={handleLogout}>
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Link
                        component={RouterLink}
                        to={Routes.Login}
                        underline="none"
                        sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Inicia sesión
                      </Link>
                      <Link
                        component={RouterLink}
                        to={Routes.Signup}
                        underline="none"
                        sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Registrate
                      </Link>
                    </>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <Cart open={open} handlerStateViewDrawer={handleStateViewDrawer} />
    </Box>
  );
}
