import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import { getToken } from "../../GetToken";
import { getFromCookies } from "../../getUserFromJWT";
import Avatar from "react-avatar-edit";
import { Avatar as Avatari } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "90vw",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  overflow: "auto",
};

const ProfilePicture = ({
  open,
  handleOpen,
  handleClose,
  setUserData,
  user,
}) => {
  let token  = getToken();
  useEffect(() => {
    token = getToken();
  }, [])

  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [profileExists, setProfileExists] = useState(false);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };

  const fetchData = async () => {
    try {
      const url = "http://localhost:8080/api/user";
      const userDetails = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
      const data = await userDetails.json();

      if (data.profile === null) {
        data.profile = ""; 
      }

      setUserData(data);
      checkProfilePicture();
    } catch (error) {
      console.error("Error fetching user details:", error);
      // document.cookie = "Token=";
    }
  };

  const deletePicture = async () => {
    try {
      await axios.delete("http://localhost:8080/api/storage/profile/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Profile Picture Has been deleted!");
      await fetchData();
    } catch (error) {
      console.error("Error deleting profile picture:", error);
    }
  };

  const checkProfilePicture = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/storage/profile/exists', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfileExists(data);
      } else {
        throw new Error('Profile existence check failed');
      }
    } catch (error) {
      console.error('Error checking profile existence:', error);
    }
  };

  useEffect(() => {
    checkProfilePicture();
  }, [token])


  const handleSave = async () => {
    const blob = await fetch(preview).then((res) => res.blob());
    const formData = new FormData();
    formData.append("files", blob, "avatar.png");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/storage/profile/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        fetchData();
        setUserData(response.data);
        setPreview(null);
        handleClose();
        
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

 
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
        gap: "25px",
      }}
    >
      <Avatari
        alt={user.firstName}
        src={`http://localhost:8080/profile-pictures/${
          user.profile
        }?${new Date().getTime()}`}
        sx={{
          width: 150,
          height: 150,
          ":hover": { cursor: "pointer" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: { lg: "row", xs: "column" },
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleOpen}
        >
          Upload Picture
        </Button>
        {profileExists && (
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={deletePicture}
          >
            Remove Picture
          </Button>
        )}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {preview && (
              <img
                src={preview}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  marginBottom: "1rem",
                }}
              />
            )}
            <Avatar
              width={300}
              height={200}
              onCrop={onCrop}
              onClose={onClose}
              src={src}
              cropRadius={50}
              cropColor="transparent"
              closeIconColor="transparent"
              lineWidth={0}
              style={{
                width: "100%",
                maxWidth: 300,
                height: "auto",
              }}
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSave}
                sx={{ mr: 2 }}
              >
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Anulo
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfilePicture;
