import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useKomenti = (postimiId, token) => {
  const [komentet, setKomentet] = useState([]);
  const [viewMyComment, setViewMyComment] = useState(true);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [userEnd, setUserEnd] = useState(5);
  const [hasMore, setHasMore] = useState(false);

  const fetchMoreData = () => {
    if (viewMyComment) {
      setEnd((prevEnd) => prevEnd + 5);
    } else {
      setUserEnd((prevEnd) => prevEnd + 5);
    }
  };

  const getKomentet = useCallback(() => {
    axios
      .get(`http://localhost:8080/api/komenti/postimi/${postimiId}`, {
        params: {
          start: start,
          end: end,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setKomentet(response.data.komentet);
        setHasMore(response.data.hasMore);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [postimiId, start, end, token]);

  const userKomentet = useCallback(() => {
    axios
      .get(`http://localhost:8080/api/komenti/user/${postimiId}`, {
        params: {
          start: start,
          end: userEnd,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setKomentet(response.data.komentet);
        setHasMore(response.data.hasMore);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [postimiId, start, userEnd, token]);

  const createKomenti = (koment) => {
    axios
      .post(`http://localhost:8080/api/komenti/create/${postimiId}`, koment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        if (viewMyComment) {
          setEnd((prevEnd) => prevEnd + 1);
        } else {
          setUserEnd((prevEnd) => prevEnd + 1);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const deleteKomenti = (komentId) => {
    axios
      .delete(`http://localhost:8080/api/komenti/delete/${komentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        if (viewMyComment) {
          setEnd((prevEnd) => prevEnd - 1);
        } else {
          setUserEnd((prevEnd) => prevEnd - 1);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const updateKomenti = (komentId, update) => {
    axios
      .put(`http://localhost:8080/api/komenti/update/${komentId}`, update, {
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
    setViewMyComment((prev) => !prev);
  };

  useEffect(() => {
    if (viewMyComment) {
      getKomentet();
    }
  }, [viewMyComment, end, postimiId, token, getKomentet]);

  useEffect(() => {
    if (!viewMyComment) {
      userKomentet();
    }
  }, [viewMyComment, userEnd, postimiId, token, userKomentet]);

  return {
    komentet,
    createKomenti,
    deleteKomenti,
    updateKomenti,
    toggleViewMyComment,
    viewMyComment,
    hasMore,
    fetchMoreData,
    setEnd,
    setUserEnd,
  };
};

export default useKomenti;
