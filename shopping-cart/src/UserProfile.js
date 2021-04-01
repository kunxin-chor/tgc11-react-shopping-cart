import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "./config";

export default function UserProfile() {

  const [profile, setProfile] = useState({});

  useEffect( () => {
    const fetch = async  () => {
        const response = await axios.get(config.BASE_URL + "/api/users/profile",{
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setProfile(response.data);
    }

    fetch();
  })

  return (
    <React.Fragment>
      <h1>User Profile</h1>
      <ul>
          <li>User Name: {profile.username}</li>
          <li>Email: {profile.email}</li>
      </ul>

    </React.Fragment>
  );
}
