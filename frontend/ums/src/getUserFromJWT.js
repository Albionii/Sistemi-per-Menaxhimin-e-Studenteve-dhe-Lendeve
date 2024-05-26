import { useState, useEffect } from "react";


export const getFromCookies = ({ setUserData }) => {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let split = el.split('=');
        cookie[split[0].trim()] = split.slice(1).join("=");
    })
    const token = cookie["Token"];
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
                })
                setUser(await userDetails.json());
            } catch (error) {
                console.error('Error fetching user details:', error);
                document.cookie = "Token=";
                window.location.reload();
            } finally {

            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (user != null) {
            // console.log(user);
            returnUser(user);
        }
    }), [user];

    function returnUser(user) {
        setUserData(user);
    }
}