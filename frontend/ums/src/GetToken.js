export const getToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; Token=`);
  if (parts.length === 2) { 
    return parts.pop().split(';').shift();
  }
}

