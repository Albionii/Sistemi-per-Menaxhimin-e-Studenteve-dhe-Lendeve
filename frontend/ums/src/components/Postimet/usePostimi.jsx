import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const usePostimi = (ligjerataId, token) => {
  const [postimet, setPostimet] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [viewMyPosts, setViewMyPosts] = useState(true);
  const [postNotification, setPostNotification] = useState(false);
  const [deletePostNotification, setDeletePostNotification] = useState(false);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [userEnd, setUserEnd] = useState(5);
  const [hasMore, setHasMore] = useState(false);

  const fetchMoreData = () => {
    if (viewMyPosts) {
      setEnd((prevEnd) => prevEnd + 5);
    } else {
      setUserEnd((prevEnd) => prevEnd + 5);
    }
  };

  const getPostimet = useCallback(() => {
    axios
      .get(`http://localhost:8080/api/postimi/get/ligjerata/${ligjerataId}`, {
        params: {
          start,
          end,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPostimet(response.data.postimet);
        setHasMore(response.data.hasMore);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [ligjerataId, start, end, token]);

  const post = (postim) => {
    axios
      .post(`http://localhost:8080/api/postimi/create/${ligjerataId}`, postim, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setPostNotification(false);
        setEnd((prevEnd) => prevEnd + 1);
        setUserEnd((prevEnd) => prevEnd + 1);
        setPostNotification(true);
        setTimeout(() => {
          setPostNotification(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const updatePostimi = (postimiId, updatedPostimi) => {
    axios
      .put(
        `http://localhost:8080/api/postimi/update/${postimiId}`,
        updatedPostimi,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getPostimet();
      })
      .catch((error) => {
        console.error("Error:" + error);
      });
  };

  const deletePostimi = (postimiId) => {
    axios
      .delete(`http://localhost:8080/api/postimi/delete/${postimiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setDeletePostNotification(false);
        setEnd((prevEnd) => prevEnd - 1);
        setUserEnd((prevEnd) => prevEnd - 1);
        setDeletePostNotification(true);
        setTimeout(() => {
          setDeletePostNotification(false);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const getUserInfo = useCallback(() => {
    axios
      .get(`http://localhost:8080/api/user/get/user/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const getPostimetUser = useCallback(() => {
    axios
      .get(`http://localhost:8080/api/postimi/get/user/${ligjerataId}`, {
        params: {
          start: 0,
          end: userEnd,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPostimet(response.data.postimet);
        setHasMore(response.data.hasMore);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [ligjerataId, userEnd, token]);

  const toggleViewMyPosts = () => {
    setViewMyPosts((prev) => !prev);
    console.log("viewMYPosts:" + viewMyPosts);
    if(viewMyPosts) {
      setEnd(5);
    }else {
      setUserEnd(5);
    }
  };

  useEffect(() => {
    getPostimet();
    getUserInfo();
  }, [ligjerataId]);

  useEffect(() => {
    if (viewMyPosts) {
      getPostimet();
    }
  }, [viewMyPosts, end]);

  useEffect(() => {
    if (!viewMyPosts) {
      getPostimetUser();
    }
  }, [viewMyPosts, userEnd]);

  return {
    postimet,
    post,
    userInfo,
    updatePostimi,
    deletePostimi,
    getPostimetUser,
    toggleViewMyPosts,
    deletePostNotification,
    postNotification,
    fetchMoreData,
    hasMore,
    viewMyPosts,
    setEnd,
    setUserEnd,
  };
};

export default usePostimi;
