import {createContext} from 'react';

export const riderStateContext = createContext({
    currentUser:'',
    currentDriver:'',
    rideId:'',
});

function AuthContexter(){

}
