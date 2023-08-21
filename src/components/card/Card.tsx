import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../config/routes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addToCart } from '../../redux/slices';
import { useState, useEffect } from 'react';

type CardProps = {
  image: string;
  name: string;
  species: string;
  status: string;
  id: number;
};

export default function CardComponent({
  image,
  name,
  species,
  status,
  id,
}: CardProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  const cartState = useAppSelector((state) => state.cartReducer);

  function handleClick() {
    navigate(`/${Routes.Character}/${id}`);
  }

  function handleAddToCart() {
    dispatch(
      addToCart({
        id,
        name,
        image,
        info: status,
      })
    );
  }

  useEffect(() => {
    const itemExist = cartState.some((item) => item.id === id);
    setDisabledBtn(itemExist);
  }, [cartState, id]);

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h4" sx={{ mb: 1.5 }} noWrap>
          {name}
        </Typography>
        <Divider />
        <Typography sx={{ mt: 1.5 }}>Especie: {species}</Typography>
        <Typography sx={{ mt: 1.5 }}>Estado : {status}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" fullWidth onClick={handleClick}>
          Leer más
        </Button>
        <Button
          size="small"
          variant="outlined"
          fullWidth
          onClick={handleAddToCart}
          disabled={disabledBtn}>
          Agregar al carrito
        </Button>
      </CardActions>
    </Card>
  );
}
