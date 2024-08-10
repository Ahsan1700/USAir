import { Stack, Typography } from '@mui/material';
import CountUp from 'react-countup';
import { DistanceProps } from '../data/interfaces';

const DistanceForm = ({distance}: DistanceProps) => {

  return (
    <div className='distanceform'>
      <Stack>
        <Typography>The Distance is:</Typography>
        <b>
          <CountUp
          end={distance}
          decimals={2}
          duration={1} 
          suffix=' NM'
          />
        </b>
      </Stack>
    </div>
  );
};
export default DistanceForm;