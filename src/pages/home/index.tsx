import { Container, Button, Stack, Grid, Pagination, CircularProgress, Box } from '@mui/material';
import { CardComponent, Header } from '../../components';
import { useEffect, useState } from 'react';
import { getCharacters } from '../../services/characters';
import { ICharacter } from '../../models/Character.model';

export default function Home(): JSX.Element {
  const [characters, setCharacters] = useState<Array<ICharacter>>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  function handleChange(_event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  useEffect(() => {
    setLoading(true);
    getCharacters(page)
      .then(({ data }) => {
        setTotalPages(data.info.pages);
        setCharacters(data.results);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <Container maxWidth="xl">
      <Header
        title="Hola mundo"
        description="Este es mi componente Hero o header."
        element={
          <Stack sx={{ width: '100%', flexDirection: 'row', gap: '1em' }}>
            <Button variant="contained" sx={{ flex: '1 1 auto' }}>
              Click
            </Button>
            <Button variant="contained" sx={{ flex: '1 1 auto' }}>
              Click
            </Button>
          </Stack>
        }
      />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={4} my={5}>
            {characters.map((character) => (
              <Grid item key={character.id} xs={3}>
                <CardComponent
                  image={character.image}
                  name={character.name}
                  species={character.species}
                  status={character.status}
                  id={character.id}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
          />
        </>
      )}
    </Container>
  );
}
