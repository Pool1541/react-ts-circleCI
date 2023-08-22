import { useEffect, useState } from 'react';
import { Box, Container, Grid, CircularProgress, Typography, Divider, Chip } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getCharacterById } from '../../services/characters.service';
import { ICharacter } from '../../models/Character.model';

export default function Character(): JSX.Element {
  const { characterID } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ICharacter | null>(null);

  useEffect(() => {
    setLoading(true);
    getCharacterById(characterID as string)
      .then((response) => setData(response.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [characterID]);

  return (
    <Box sx={{ width: '100%' }} mt={10}>
      <Container maxWidth="xl">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            container
            columnSpacing={4}
            rowSpacing={4}
            mt={2}
            sx={{
              flexDirection: { xs: 'column-reverse', sm: 'row' },
              alignContent: 'center',
              flexWrap: 'nowrap',
            }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h1">{data!.name}</Typography>
              <Divider />
              <Typography variant="h6">{data!.origin.name}</Typography>
              <Box sx={{ mt: 2 }}>
                <Chip
                  label={data!.status}
                  variant="filled"
                  color={
                    data!.status === 'Alive'
                      ? 'success'
                      : data!.status === 'Dead'
                      ? 'error'
                      : 'default'
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src={data!.image} style={{ width: '100%', borderRadius: '0.5em' }} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
