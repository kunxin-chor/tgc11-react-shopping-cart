import React, {useContext} from 'react'
import UserProfile from '../UserProfile'
import CartContext from '../CartContext';

export default function ProfilePage(){
    let context = useContext(CartContext);

    return (
        <React.Fragment>
            <UserProfile/>
        </React.Fragment>
    )
}