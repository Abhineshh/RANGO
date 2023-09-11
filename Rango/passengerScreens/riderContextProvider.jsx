import {createContext,useState,useContext,useMemo} from 'react';
import LoadingScreen from './loadingScreen';
import PassengerDetails from './PassengerDetails';
import PassengerMap from './PassengerMap';
import Eotp from './Eotp';
import Chooser from './Chooser';


export const riderStateContext = createContext({
  RangoRideId:'',
  setRangoRideId:()=>{},
});

function main(){
    const [RangoRideId,setRangoRideId] = useState('');
    const value = useMemo(
        ()=>({RangoRideId,setRangoRideId}),
        [RangoRideId]
    );
    return(
        <RangoRideContext.Provider value={value}>
        {useMemo(() =>(
            <>
        <PassengerDetails/>
        <PassengerMap />
        <Eotp/>
        <Chooser />
        <LoadingScreen/>
        </>
        ),[])}
    </RangoRideContext.Provider>
    );
}
