import React, { useState, lazy, Suspense } from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  Button,
  Modal,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { tokens } from "../../theme";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UpdatePostimi from "./UpdatePostimi";
import ConfirmationModal from "./ConfirmationModal";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { OrbitProgress } from "react-loading-indicators";

// import Komentet from "./Komentet";
const Komentet = lazy(() => import("./Komentet"));

import useKomenti from "./useKomenti";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Postim = ({
  post,
  user,
  updatePostimi,
  deletePostimi,
  USER_ROLE,
  token,
  isEnrolled,
  professorId,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [update, setUpdate] = useState(false);
  const openUpdate = () => setUpdate(true);
  const closeUpdate = () => setUpdate(false);

  const [deletePost, setDeletePost] = useState(false);
  const openDelete = () => setDeletePost(true);
  const closeDelete = () => setDeletePost(false);

  const initialData = {
    teksti: "",
  };

  const [koment, setKoment] = useState(initialData);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [displayedCommentsCount, setDisplayedCommentsCount] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmation = () => {
    deletePostimi(post.id);
    setDeletePost(false);
  };
  const {
    komentet,
    createKomenti,
    deleteKomenti,
    updateKomenti,
    toggleViewMyComment,
    viewMyComment,
    userKomentet,
  } = useKomenti(post.id, token);

  const komento = (e) => {
    e.preventDefault();
    createKomenti(koment);
    setKoment(initialData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKoment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loadMoreComments = () => {
    setDisplayedCommentsCount((prevCount) => prevCount + 10);
  };

  const handleShowComments = () => {
    setShowComments(true);
    setDisplayedCommentsCount(5);
  };

  const handleCloseComments = () => {
    setShowComments(false);
    setDisplayedCommentsCount(0);
  };

  return (
    <Box>
      <Box key={post.id} sx={{ marginBottom: "40px" }}>
        <Box
          padding={"15px"}
          borderRadius={"15px"}
          sx={{ background: colors.primary[600] }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box display={"flex"}>
              <Avatar
                src={`http://localhost:8080/profile-pictures/${post.user.profile}`}
                alt={post.user.firstName}
              ></Avatar>
              <Box ml={"15px"}>
                <Typography variant="h5">
                  {post.user.firstName + " " + post.user.lastName}
                </Typography>
                <Typography fontSize={"12px"} color={"text.secondary"}>
                  {formatDate(post.data_Postimit)}
                </Typography>
              </Box>
            </Box>
            {(user.id === post.user.id || USER_ROLE === "ROLE_ADMIN") && (
              <IconButton
                aria-label="settings"
                aria-controls={menuOpen ? "menu" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Box>
          <Box padding={"25px 50px"}>
            <Typography>{post.mesazhi}</Typography>
          </Box>
          {showComments && (
            <Button
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                  textDecorationColor: "white",
                },
              }}
              onClick={handleCloseComments}
            >
              <Typography color="white">Close Comments</Typography>
            </Button>
          )}
          {showComments ? (
            <Box
              sx={{ background: colors.primary[600] }}
              borderTop={"3px solid" + colors.primary[400]}
            >
              <Box>
                <IconButton
                  onClick={() => {
                    toggleViewMyComment();
                  }}
                >
                  <FilterAltIcon />
                  {viewMyComment ? (
                    <Typography>Mine Only</Typography>
                  ) : (
                    <Typography>See all</Typography>
                  )}
                </IconButton>
                <Suspense
                  fallback={
                    <Box sx={{ textAlign: "center" }}>
                      <OrbitProgress
                        variant="track-disc"
                        color="#006cff"
                        size="medium"
                        text=""
                        textColor=""
                      />
                    </Box>
                  }
                >
                  <Komentet
                    deleteKomenti={deleteKomenti}
                    komentet={komentet}
                    postimId={post.id}
                    token={token}
                    user={user}
                    updateKomenti={updateKomenti}
                    displayedCommentsCount={displayedCommentsCount}
                    isEnrolled={isEnrolled}
                  />
                </Suspense>
              </Box>

              {displayedCommentsCount < komentet.length && (
                <Button
                  onClick={loadMoreComments}
                  sx={{
                    "&:hover": {
                      textDecoration: "underline",
                      textDecorationColor: "white",
                    },
                  }}
                >
                  <Typography color="white">Show More Comments</Typography>
                </Button>
              )}
            </Box>
          ) : (
            <>
              {komentet.length > 0 && (
                <Button
                  sx={{
                    "&:hover": {
                      textDecoration: "underline",
                      textDecorationColor: "white",
                    },
                  }}
                  onClick={handleShowComments}
                >
                  <Typography color="white">Show Comments</Typography>
                </Button>
              )}
            </>
          )}

          <Box
            sx={{ background: colors.primary[600] }}
            borderTop={"3px solid " + colors.primary[400]}
            component="form"
            onSubmit={komento}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={2}
            >
              <Avatar
                src={`http://localhost:8080/profile-pictures/${user.profile}`}
                alt={user.firstName}
              />
              <Box
                width={"95%"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <input
                  type="text"
                  name="teksti"
                  placeholder="Write something here"
                  disabled={
                    isEnrolled ||
                    user.id === professorId ||
                    USER_ROLE === "ROLE_ADMIN"
                      ? false
                      : true
                  }
                  style={{
                    padding: "15px 30px",
                    width: "90%",
                    background: colors.primary[600],
                    borderRadius: "15px",
                    border: "2px solid " + colors.primary[400],
                  }}
                  required
                  value={koment.teksti}
                  onChange={handleInputChange}
                />

                {(isEnrolled ||
                  user.id === professorId ||
                  USER_ROLE === "ROLE_ADMIN") && (
                  <IconButton type="submit">
                    <SendIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleClose}
          keepMounted
        >
          {user.id === post.user.id && USER_ROLE !== "ROLE_ADMIN" && (
            <MenuItem
              onClick={() => {
                openUpdate();
                handleClose();
              }}
            >
              Edit
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              openDelete();
              handleClose();
            }}
          >
            Delete
          </MenuItem>
        </Menu>

        <Modal
          open={update}
          onClose={closeUpdate}
          aria-labelledby="edit-post-modal"
          aria-describedby="modal-to-edit-post"
          BackdropProps={{
            onClick: (event) => event.stopPropagation(),
          }}
        >
          <Box
            p={4}
            bgcolor={colors.primary[500]}
            borderRadius={2}
            boxShadow={24}
            sx={{
              width: "60vw",
              position: "absolute",
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
              maxWidth: "800px",
              maxHeight: "80%",
              overflowY: "auto",
              margin: "auto",
              "@media (max-width: 960px)": {
                width: "80vw",
              },
              "@media (max-width: 600px)": {
                width: "90vw",
              },
            }}
          >
            <UpdatePostimi
              onSubmit={updatePostimi}
              onClose={closeUpdate}
              initialData={post}
              postimiId={post.id}
            />
          </Box>
        </Modal>

        <ConfirmationModal
          open={deletePost}
          handleClose={closeDelete}
          handleConfirm={handleConfirmation}
          title="Delete Post"
          message="Are you sure you want to proceed with deleting this post?"
        />
      </Box>
    </Box>
  );
};

export default Postim;
