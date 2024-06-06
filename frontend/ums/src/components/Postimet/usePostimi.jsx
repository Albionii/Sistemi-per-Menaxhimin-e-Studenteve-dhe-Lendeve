import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const usePostimi = (ligjerataId, token) => {
  const [postimet, setPostimet] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [viewMyPosts, setViewMyPosts] = useState(true);

  const getPostimet = () => {
    axios
      .get(`http://localhost:8080/api/postimi/get/ligjerata/${ligjerataId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPostimet(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const post = (postim) => {
    axios
      .post(`http://localhost:8080/api/postimi/create/${ligjerataId}`, postim, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        if (viewMyPosts) {
          getPostimet();
        } else {
          getPostimetUser();
        }
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
        if (viewMyPosts) {
          getPostimet();
        } else {
          getPostimetUser();
        }
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
        if (viewMyPosts) {
          getPostimet();
        } else {
          getPostimetUser();
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const getUserInfo = () => {
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
  };

  const getPostimetUser = () => {
    axios
      .get(`http://localhost:8080/api/postimi/get/user/${ligjerataId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPostimet(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  
  const getEnroll = () => {
    axios
      .get(`http://localhost:8080/api/student/get/enrollments/${semestriId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEnrolledData(response.data);
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  };

  const toggleViewMyPosts = () => {
    setViewMyPosts(!viewMyPosts);
    if (viewMyPosts) {
      getPostimetUser();
    } else {
      getPostimet();
    }
  };

  useEffect(() => {
    getPostimet();
    getUserInfo();
  }, [ligjerataId]);

  return {
    postimet,
    post,
    userInfo,
    updatePostimi,
    deletePostimi,
    getPostimetUser,
    toggleViewMyPosts,
  };
};

export default usePostimi;
