export interface DistanceProps {
    distance: number;
};

export interface SearchProps {
    setDeparture: React.Dispatch<React.SetStateAction<string | null>>;
    setArrival: React.Dispatch<React.SetStateAction<string | null>>;
    setDepartureCode: React.Dispatch<React.SetStateAction<string | null>>;
    setArrivalCode: React.Dispatch<React.SetStateAction<string | null>>;
};

export interface MapProps {
    departurePosition: google.maps.LatLng | null;
    departureCode: string | null;
    arrivalPosition: google.maps.LatLng | null;
    arrivalCode: string | null;
};