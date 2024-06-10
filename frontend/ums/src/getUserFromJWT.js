import { useState, useEffect } from "react";

export const getFromCookies = ({ setUserData, changeLoggedInState }) => {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let split = el.split('=');
        cookie[split[0].trim()] = split.slice(1).join("=");
    });
    const token = cookie["Token"];
    getFromCookies.token = token;

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'http://localhost:8080/api/user';
                const userDetails = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({})
                });
                const data = await userDetails.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user details:', error);
                // document.cookie = "Token=";
                window.location.reload();
            }
        };

        fetchData();
    }, [token]); // Add token to the dependency array

    useEffect(() => {
        if (user != null) {
            if (user.status === 500) {
                // document.cookie = "Token=";
                // changeLoggedInState();
                // window.location.reload();
            } else {
                setUserData(user); // Directly set user data here
            }
        }
    }, [user, changeLoggedInState, setUserData]); // Add dependencies

    return token; // Optionally, return the token if needed
};
