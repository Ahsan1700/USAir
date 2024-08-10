import { Box } from '@mui/material';
import { LoadScript, GoogleMap, MarkerF, PolylineF } from '@react-google-maps/api';
import { MapProps } from '../data/interfaces';

const containerStyle = {
  width: '100%',
  height: '400px'
};
  
const center = {
  lat: 39.50,
  lng: -98.35
};

const Map = ({departurePosition, departureCode, arrivalPosition, arrivalCode} : MapProps) => {
  const createPolyLine = () =>{
    if (departurePosition != null && arrivalPosition != null) {
      let flightPlanCoordinates = [departurePosition, arrivalPosition];

      return(
        <PolylineF
          path={flightPlanCoordinates} 
          options={{
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
      )
    }
    
    return(<></>);
  };

  return (
    <Box justifyContent='center'>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAP_TOKEN!}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={3}>
            {departurePosition && departureCode? <MarkerF position={departurePosition} title={departureCode}></MarkerF> : <></>}
            {arrivalPosition && arrivalCode ? <MarkerF position={arrivalPosition} title={arrivalCode}></MarkerF> : <></>}
            {createPolyLine()}
          </GoogleMap>
      </LoadScript>
    </Box>
  );
};
export default Map;