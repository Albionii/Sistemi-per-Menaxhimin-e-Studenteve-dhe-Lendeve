import axios from "axios";

export const getToken = () => {
  const value = `; ${document.cookie}`;
    const parts = value.split(`; Token=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
}

export const getTokenBeggining = ({ setToken, setLoggedIn }) => {
  getFromRefreshToken().then(() => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; Token=`);
    if (parts.length === 2) {
      const LoggedIn = isTokenValid(parts.pop().split(';').shift(),{setLoggedIn})
      setToken(parts.pop().split(';').shift());

      // setLoggedIn(true);


    }
  });

}
export const isTokenValid = async (token,{setLoggedIn}) => {
    axios
      .post("http://localhost:8080/auth/verifyjwt", null,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.status + " JWT STATUS JWT STATUS");
        setLoggedIn(true);
      })
      .catch((error) => {
        setLoggedIn(false);
        
        
      });
}
export const getFromRefreshToken = async () => {
  const fifteenMinutes = 15 * 60 * 1000;

  try {
    const response = await fetch('http://localhost:8080/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const jwt = await response.json();

    const expirationTime = new Date(Date.now() + fifteenMinutes);

    document.cookie = `Token=${encodeURIComponent(jwt.jwt)}; expires=${expirationTime.toUTCString()}`;
    return jwt.jwt;
  } catch (error) {
    console.log("ERROR KA ERROR KA ERROR KA" + error);
    return null;
  }
}

