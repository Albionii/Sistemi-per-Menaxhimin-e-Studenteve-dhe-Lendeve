import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const usePostimi = (ligjerataId, token) => {
  const [postimet, setPostimet] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [viewMyPosts, setViewMyPosts] = useState(true);


  const getPostimet = () => {
    axios
      .get(`http://localhost:8080/postimi/get/ligjerata/${ligjerataId}`, {
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
      .post(`http://localhost:8080/postimi/create/${ligjerataId}`, postim, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getPostimet();
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const updatePostimi = (postimiId, updatedPostimi) => {
    axios
      .put(
        `http://localhost:8080/postimi/update/${postimiId}`,
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
      .delete(`http://localhost:8080/postimi/delete/${postimiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getPostimet();
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
      .get(`http://localhost:8080/postimi/get/user/${ligjerataId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        setPostimet(response.data);
        setViewMyPosts(!viewMyPosts)
        if(viewMyPosts !== true) {
          getPostimet();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  }

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
    getPostimetUser
  };
};

export default usePostimi;
