
import {createContext,useState,useContext,useMemo} from 'react';
import Driverlogin from './Driverlogin';
import AvailRide from './AvailRide';
import Driverlogin from './Driverlogin';
import Driversignup from './Driversignup';
import Sotp from './Sotp';
import DriverDetails from './DriverDetails';

export const CurrentUserContext = createContext({
    CurrentUser:'',
    setUserEmail:()=>{},
});


function main(){
    const [CurrentUser,setUserEmail] = useState('');
    const value = useMemo(
        () =>({CurrentUser,setUserEmail}),
        [CurrentUser]
    );
    return(
    <CurrentUserContext.Provider value={value}>
        {useMemo(() =>(
            <>
        <Driverlogin />
        <Driversignup/>
        <DriverDetails/>
        <DriverMap />
        <Sotp/>
        <AvailRide />
        </>
        ),[])}
    </CurrentUserContext.Provider>
    );
}