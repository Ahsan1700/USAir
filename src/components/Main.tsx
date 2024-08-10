import axios from 'axios';
import { useEffect, useState } from 'react';
import { Paper, Stack } from '@mui/material';
import SearchForm from './SearchForm';
import DistanceForm from './DistanceForm';
import Map from './Map';

const Main = () => {
  const [departure, setDeparture] = useState<string | null>(null);
  const [arrival, setArrival] = useState<string | null>(null);
  const [departureCode, setDepartureCode] = useState<string | null>(null);
  const [arrivalCode, setArrivalCode] = useState<string | null>(null);
  const [deperaturePosition, setDeparturePosition] = useState<google.maps.LatLng | null>(null);
  const [arrivalPosition, setArrivalPosition] = useState<google.maps.LatLng | null>(null);
  const [distance, setDistance] = useState<number>(0);

  const updatePositions = (depLat:number, depLng:number, arrLat:number, arrLng:number) => {
    let depPos = new google.maps.LatLng(depLat, depLng);
    let arrPos = new google.maps.LatLng(arrLat, arrLng);
    setDeparturePosition(depPos);
    setArrivalPosition(arrPos);
  };

  const calcHaversine = (depLat:number, depLng:number, arrLat:number, arrLng:number) => {
    const R = 6371e3;
    const phi1 = depLat * Math.PI/180;
    const phi2 = arrLat * Math.PI/180;
    const deltaLat = (arrLat-depLat) * Math.PI/180;
    const deltaLng = (arrLng-depLng) * Math.PI/180;

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = (R * c) / 1852;
    
    setDistance(d);
  };

  const updateDistanceAndPositions = () => {
    if ((departureCode != null) && (arrivalCode != null)){

      const depApi = 'https://airportdb.io/api/v1/airport/' + departureCode + '?apiToken=' + process.env.REACT_APP_AIRDB_TOKEN;
      const arrApi = 'https://airportdb.io/api/v1/airport/' + arrivalCode + '?apiToken=' + process.env.REACT_APP_AIRDB_TOKEN;

      const getDep = axios.get(depApi);
      const getArr = axios.get(arrApi);

      axios.all([getDep, getArr]).then(
        axios.spread((...response) => {
          const depLat = response[0].data.latitude_deg;
          const depLng = response[0].data.longitude_deg;
          const arrLat = response[1].data.latitude_deg;
          const arrLng = response[1].data.longitude_deg;
          
          updatePositions(depLat, depLng, arrLat, arrLng);
          calcHaversine(depLat, depLng, arrLat, arrLng);
        })
      )
    }
  };


  useEffect(() => {
    updateDistanceAndPositions();
    // NOTE: This is used because a 'Warning' is stopping the deployment on Netifly
    // eslint-disable-next-line
  }, [departure, arrival]);

  return (
  <div className='main'>
      <Paper elevation={3} sx={{ p:4 }}>
        <Stack justifyContent='center' spacing={2}>
          <SearchForm 
            setDeparture={setDeparture} 
            setArrival={setArrival} 
            setDepartureCode={setDepartureCode} 
            setArrivalCode={setArrivalCode}
          />
          <DistanceForm distance={distance}/>
          <Map 
            departurePosition={deperaturePosition} 
            arrivalPosition={arrivalPosition} 
            departureCode={departureCode} 
            arrivalCode={arrivalCode}
          />
        </Stack>
      </Paper>
  </div>
  );
};
export default Main;