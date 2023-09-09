import Eotp from "./Eotp";
import PassengerDetails from "./PassengerDetails";
import Passengerlogin from "./Passengerlogin";
import Passengersignup from "./Passengersignup";
import PassengerHome from "./passengerHome";

import {createContext,useState,useConstext,useMemo} from 'react';

export const CurrentUserContext = createContext({
    CurrentUser:'',
    setUserEmail:()=>{},
});


function main(){
    const [CurrentUser,setUserEmail] = useState('');
    const value = useMemo(
        () =>({CurrentUser,setUserEmail}),
        [userName]
    );
    return(
    <CurrentUserContext.Provider value={value}>
        {useMemo(() =>(
            <>
        <Passengerlogin />
        <Passengersignup/>
        <PassengerDetails/>
        <PassengerMap />
        <Eotp/>
        <Chooser />
        </>
        ),[])}
    </CurrentUserContext.Provider>
    );
}