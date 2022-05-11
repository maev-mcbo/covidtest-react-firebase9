import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider';

function Profile() {

    const {user} = useContext(UserContext)


  return (
    <>
        <h1>Profile</h1>

        <p>
            usuario  {user.email} {user.displayName}
        </p>
    </>
  )
}

export default Profile;