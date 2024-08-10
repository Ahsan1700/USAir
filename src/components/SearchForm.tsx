import { Grid, Autocomplete, Typography, TextField, Button } from '@mui/material';
import { airports } from '../data/airports';
import { SearchProps } from '../data/interfaces';

const SearchForm = ({setDeparture, setArrival, setDepartureCode, setArrivalCode}: SearchProps) => {

    const updateDeparture = (value:string | null) => {
        if (value != null){
            setDeparture(value);
            setDepartureCode(value.split(" ").pop()!);
        }
    }

    const updateArrival = (value:string | null) => {
        if (value != null){
            setArrival(value);
            setArrivalCode(value.split(" ").pop()!);
        }
    }

    return (
        <div className='SearchForm'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6'>Search Airports around the USA!</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Autocomplete
                        id='departure'
                        options={airports}
                        onChange={(event, value) => updateDeparture(value)}
                        renderInput={(params) => <TextField {...params} label='Departure' />}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Autocomplete
                        id='arrival'
                        options={airports}
                        onChange={(event, value) => updateArrival(value)}
                        renderInput={(params) => <TextField {...params} label='Arrival' />}
                    />
                </Grid>
            </Grid>
        </div>
    );
};
export default SearchForm;