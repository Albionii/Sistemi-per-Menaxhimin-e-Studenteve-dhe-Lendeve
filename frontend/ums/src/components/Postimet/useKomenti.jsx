import { useState, useEffect } from "react";
import axios from "axios";

const useKomenti = (postimiId, token) => {
  const [komentet, setKomentet] = useState([]);
  const [viewMyComment, setViewMyComment] = useState(true);

  const getKomentet = () => {
    axios
      .get(`http://localhost:8080/komenti/postimi/${postimiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setKomentet(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const userKomentet = () => {
    axios
      .get(`http://localhost:8080/komenti/user/${postimiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setKomentet(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const createKomenti = (koment) => {
    axios
      .post(`http://localhost:8080/komenti/create/${postimiId}`, koment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        if (viewMyComment) {
          getKomentet();
        } else {
          userKomentet();
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const deleteKomenti = (komentId) => {
    axios
      .delete(`http://localhost:8080/komenti/delete/${komentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        if (viewMyComment) {
          getKomentet();
        } else {
          userKomentet();
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const updateKomenti = (komentId, update) => {
    axios
      .put(`http://localhost:8080/komenti/update/${komentId}`, update, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        if (viewMyComment) {
          getKomentet();
        } else {
          userKomentet();
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const toggleViewMyComment = () => {
    setViewMyComment(!viewMyComment);
    if (viewMyComment) {
      userKomentet();
    } else {
      getKomentet();
    }
  };

  useEffect(() => {
    getKomentet();
  }, []);

  return {
    komentet,
    createKomenti,
    deleteKomenti,
    updateKomenti,
    toggleViewMyComment,
    viewMyComment,
  };
};

export default useKomenti;
