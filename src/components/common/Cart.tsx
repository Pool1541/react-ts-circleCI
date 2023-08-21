import { Drawer, Box, Stack, Typography, Divider, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { useAppSelector } from '../../redux/hooks';
import { HorizontalCardComponent } from '../horizontalCard/HorizontalCard';

type CartProps = {
  open: boolean;
  handlerStateViewDrawer: () => void;
};

export default function Cart({ open, handlerStateViewDrawer }: CartProps): JSX.Element {
  const items = useAppSelector((state) => state.cartReducer);
  return (
    <Drawer anchor="right" open={open}>
      <Box sx={{ width: { xs: '100vw', md: '25em' }, p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Cart</Typography>
          <IconButton color="primary" onClick={() => handlerStateViewDrawer()}>
            <CloseRounded />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        {items.length > 0
          ? items.map((item) => (
              <HorizontalCardComponent
                image={item.image}
                id={item.id}
                name={item.name}
                info={item.info}
                key={item.id}
              />
            ))
          : ''}
      </Box>
    </Drawer>
  );
}
