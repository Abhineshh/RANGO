import { createContext, useState, useContext, useMemo } from 'react';
import DriverDetails from './DriverDetails';
import DriverMap from './DriverMap';
import Sotp from './Sotp';
import AvailRide from './AvailRide';

export const riderStateContext = createContext({
    RangoRideId: '',
    setRangoRideId: () => { },
});

function main() {
    const [RangoRideId, setRangoRideId] = useState('');
    const value = useMemo(
        () => ({ RangoRideId, setRangoRideId }),
        [RangoRideId]
    );
    return (
        <RangoRideContext.Provider value={value}>
            {useMemo(() => (
                <>
                   
                    <DriverDetails />
                    <DriverMap />
                    <Sotp />
                    <AvailRide />
                </>
            ), [])}
        </RangoRideContext.Provider>
    );
}
