import { Grid, Box, Typography } from '@mui/material';
import fly from '../assets/fly.png';

const Header = () => {
  return (
    <div className='Header'>
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Typography variant='h1' align='center' color='textPrimary' gutterBottom>
                    <b><u>USA</u>ir</b>
                </Typography>
                <Typography variant='h5' align='center' color='textSecondary'>
                    Your Tool for USA Airport Distances!
                </Typography>
            </Grid>
            <Box component={Grid} item sm={6} display={{ xs: 'none', sm: 'block' }}>
                <Box component='img' maxWidth='80%' src={fly} />
            </Box>
        </Grid>
    </div>
  );
}

export default Header;