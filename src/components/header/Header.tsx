import { Box, Divider, Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';

type HeaderProps = {
  title: string;
  description: string;
  element?: ReactNode | null;
};

export default function Header({ title, description, element }: HeaderProps): JSX.Element {
  return (
    <>
      <Box sx={{ width: '100%', height: '350px' }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%' }}>
          <Grid item xs={5}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ height: '100%' }}>
              <Grid item>
                <Typography variant="h1" fontWeight={500}>
                  {title}
                </Typography>
              </Grid>
              <Grid item sx={{ mt: 2 }}>
                <Typography>{description}</Typography>
              </Grid>
              {element !== undefined && (
                <Grid item sx={{ mt: 4, width: '100%' }}>
                  {element}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </>
  );
}
