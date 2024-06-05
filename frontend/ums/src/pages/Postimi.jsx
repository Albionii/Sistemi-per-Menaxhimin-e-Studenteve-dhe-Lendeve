import React, { Suspense, useState, lazy } from "react";
import {
  Box,
  useTheme,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import { tokens } from "../theme";
import SendIcon from "@mui/icons-material/Send";
import { Link, useLocation } from "react-router-dom";
import TaskIcon from "@mui/icons-material/Task";
import Modal from "@mui/material/Modal";
import useAssignments from "../components/Assignments/useAssignment";
import CreateAssignment from "../components/Assignments/CreateAssignment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import UpdateAssignment from "../components/Assignments/UpdateAssignment";
import DeleteAssignment from "../components/Assignments/DeleteAssignment";
import ViewSubmissions from "../components/Assignments/ViewSubmissions";
import SubmitAssignment from "../components/Assignments/SubmitAssignment";
import UpdateSubmission from "../components/Assignments/UpdateSubmission";
import axios from "axios";
import HasSubmission from "../components/Assignments/HasSubmission";
import Postim from "../components/Postimet/Postim";
import usePostimi from "../components/Postimet/usePostimi";
import extractFileName from "../components/global/extractFileName";
import { OrbitProgress } from "react-loading-indicators";
import CreatedNoftifications from "../components/Notifications/CreatedNoftifications";

import dayjs from "dayjs";

const Materiali = lazy(() => import("../components/Materiali/Materiali"));

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeletedNotification from "../components/Notifications/DeletedNotification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Postimi = ({ token, user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const USER_ROLE = user.role;
  const location = useLocation();
  const ligjerataId = location.state?.id;
  const imageUrl = location.state?.imageUrl;

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    assignments,
    createAssignment,
    deleteAssignment,
    updateAssignment,
    submitAssignment,
    updateSubmission,
    downloadFile,
    showNotification,
    deleteNotification,
  } = useAssignments(ligjerataId, token, setHasSubmitted);

  const {
    postimet,
    post,
    userInfo,
    updatePostimi,
    deletePostimi,
    getPostimetUser,
    toggleViewMyPosts,
  } = usePostimi(ligjerataId, token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [update, setUpdate] = useState(false);
  const openUpdate = () => setUpdate(true);
  const closeUpdate = () => setUpdate(false);

  const [submissionsOpen, setSubmissionsOpen] = useState(false);
  const handleSubmissionsOpen = () => setSubmissionsOpen(true);
  const handleSubmissionsClose = () => setSubmissionsOpen(false);

  const [createSubmission, setCreateSubmission] = useState(false);
  const openCreateSubmission = () => setCreateSubmission(true);
  const closeCreateSubmission = () => setCreateSubmission(false);

  const [editSubmission, setEditSubmission] = useState(false);
  const openEditSubmission = () => setEditSubmission(true);
  const closeEditSubmission = () => setEditSubmission(false);

  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [viewAssignment, setViewAssignment] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const [materiali, setMateriali] = useState(false);

  const [postimCount, setPostimCount] = useState(10);

  const loadMorePosts = () => {
    setPostimCount((prevCount) => prevCount + 10);
  };

  const handleMaterialiClick = () => {
    setMateriali(!materiali);
  };

  const handlePostFilter = () => {
    getPostimetUser();
  };

  const handleDownload = (assignmentId, fileName) => {
    downloadFile(assignmentId, fileName);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return <InsertDriveFileIcon />;
      case "doc":
      case "docx":
        return <DescriptionIcon />;
      default:
        return <AttachFileIcon />;
    }
  };

  const initialData = {
    titulli: "",
    mesazhi: "",
    expireAt: "",
    fileNames: [],
  };

  const submissionData = {
    mesazhi: "",
    fileNames: [],
  };

  const PostimiData = {
    titulli: "",
    mesazhi: "",
  };

  const [postimi, setPostimi] = useState(PostimiData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostimi((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePost = (e) => {
    e.preventDefault();
    post(postimi);
    setPostimi(PostimiData);
  };

  return (
    <>
      {showNotification && (
        <CreatedNoftifications message={"Assignment Created Successfully!"} />
      )}
      {deleteNotification && (
        <DeletedNotification message={"Assignment Deleted Successfully!"} />
      )}
      <Box
        m={4}
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "repeat(12, 1fr)" }}
        gap={2}
      >
        <Box
          gridColumn={{ xs: "span 12", sm: "span 12" }}
          sx={{
            background: location.state.background,
            borderRadius: "30px",
            height: "250px",
            position: "relative",
            border: "4px solid " + colors.primary[700],
          }}
        >
          <Box position="absolute" bottom={0} left={0} ml={4} mb={3} zIndex={1}>
            <Typography variant="h2" fontWeight="bold">
              {location.state.name}
            </Typography>
            <Typography variant="h5">{location.state.professor}</Typography>
          </Box>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "repeat(12, 1fr)" }}
          gap={2}
          gridColumn={{ xs: "span 12", sm: "span 12" }}
        >
          <Box gridColumn={{ xs: "span 12", sm: "span 3" }}>
            <Button
              onClick={handleMaterialiClick}
              sx={{
                background: colors.greenAccent[500],
                width: "100%",
                height: "100%",
                borderRadius: 3,
                "&:hover": { bgcolor: colors.greenAccent[600] },
              }}
            >
              <Typography variant="h5" color={"#fff"} fontWeight={"bold"}>
                {materiali ? "Shiko Postimet" : "Shiko Materialin"}
              </Typography>
            </Button>
          </Box>
          <Box
            gridColumn={{ xs: "span 12", sm: "span 9" }}
            component="form"
            onSubmit={handlePost}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={3}
              sx={{ background: colors.primary[600] }}
              borderRadius={4}
            >
              <Avatar
                src={`http://localhost:8080/profile-pictures/${user.profile}`}
              />
              <Box
                width={"94%"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <input
                  type="text"
                  placeholder="Write something here"
                  required
                  style={{
                    padding: "15px 30px",
                    width: "90%",
                    background: colors.primary[600],
                    borderRadius: "15px",
                    border: "2px solid " + colors.primary[400],
                  }}
                  onChange={handleInputChange}
                  name="mesazhi"
                  value={postimi.mesazhi}
                />
                <Button variant="contained" type="submit">
                  <SendIcon />
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            mt={4}
            maxHeight={"100%"}
            gridColumn={{ xs: "span 12", sm: "span 12", md: "span 3" }}
            sx={{ background: colors.primary[600], minWidth: "350px" }}
            padding={"20px"}
            borderRadius={3}
          >
            {assignments.length === 0 ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>No Assignments Have been uploaded!</Typography>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "10px",
                  }}
                >
                  <Typography variant="h4" fontWeight={"bold"}>
                    Assignments:
                  </Typography>
                  {USER_ROLE === "ROLE_PROFESSOR" &&
                    user.id === location.state.professorId && (
                      <Button
                        sx={{
                          background: colors.greenAccent[500],
                          borderRadius: 3,
                          "&:hover": { bgcolor: colors.greenAccent[600] },
                        }}
                        variant="contained"
                        onClick={handleOpen}
                      >
                        <Typography
                          variant="h5"
                          color={"#fff"}
                          fontWeight={"bold"}
                        >
                          +
                        </Typography>
                      </Button>
                    )}
                </Box>

                {assignments.map((assignment) => (
                  <Box key={assignment.id}>
                    <Box
                      onClick={() => {
                        setViewAssignment(assignment);
                        handleEditOpen();
                      }}
                      sx={{ ":hover": { cursor: "pointer" } }}
                    >
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        padding={"15px"}
                        sx={{ background: colors.blueAccent[700] }}
                        mb={2}
                        borderRadius={3}
                      >
                        <Box display={"flex"} alignItems={"center"}>
                          <TaskIcon sx={{ marginRight: 2, fontSize: "25px" }} />
                          <Typography variant="h5" fontWeight={"bold"}>
                            {assignment.titulli}
                          </Typography>
                        </Box>
                        <Box
                          padding={"15px"}
                          sx={{ background: colors.blueAccent[800] }}
                          borderRadius={3}
                        >
                          <Typography>Due:</Typography>
                          <Typography>
                            {dayjs(assignment.expireAt).format(
                              "YYYY-MM-DD/HH:mm:ss"
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {viewAssignment && viewAssignment.id === assignment.id && (
                      <Modal
                        open={editOpen}
                        onClose={handleEditClose}
                        aria-labelledby="CreateAssignment"
                        aria-describedby="Assignment Creation"
                      >
                        <Box
                          p={4}
                          bgcolor={colors.primary[500]}
                          borderRadius={8}
                          boxShadow={24}
                          sx={{
                            width: "80%",
                            maxWidth: "800px",
                            maxHeight: "80%",
                            overflowY: "auto",
                            margin: "auto",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TaskIcon
                            sx={{
                              fontSize: "50px",
                              color: colors.blueAccent[500],
                            }}
                          />
                          <Typography
                            variant="h5"
                            sx={{ color: "white", mb: 2 }}
                          >
                            {viewAssignment.titulli}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "white", mb: 2 }}
                          >
                            {viewAssignment.mesazhi}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "white", mb: 2 }}
                          >
                            Due date: {viewAssignment.expireAt}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "white", mb: 2 }}
                          >
                            Files:
                          </Typography>
                          {viewAssignment.fileNames.map((fileName, index) => (
                            <Box
                              key={index}
                              display="flex"
                              alignItems="center"
                              mb={1}
                              sx={{
                                color: "white",
                                cursor: "pointer",
                                "&:hover": { opacity: 0.8 },
                              }}
                              onClick={() =>
                                handleDownload(assignment.id, fileName)
                              }
                            >
                              {getFileIcon(fileName)}
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                {extractFileName(fileName)}
                              </Typography>
                            </Box>
                          ))}
                          <Box mt={3}>
                            {USER_ROLE === "ROLE_PROFESSOR" &&
                              user.id === location.state.professorId && (
                                <Box sx={{ display: "flex", gap: "15px" }}>
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={openUpdate}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="info"
                                    onClick={() => {
                                      setCurrentAssignmentId(viewAssignment.id);
                                      handleSubmissionsOpen();
                                    }}
                                  >
                                    View Submissions
                                  </Button>
                                  <DeleteAssignment
                                    assignmentId={viewAssignment.id}
                                    deleteAssignment={deleteAssignment}
                                  />
                                </Box>
                              )}
                            {USER_ROLE === "ROLE_STUDENT" &&
                              location.state.isEnrolled &&
                              (!dayjs().isAfter(
                                dayjs(viewAssignment.expireAt)
                              ) ? (
                                <HasSubmission
                                  assignmentId={viewAssignment.id}
                                  token={token}
                                  onSubmit={openCreateSubmission}
                                  updateSubmission={updateSubmission}
                                  closeEditSubmission={closeEditSubmission}
                                  submissionData={submissionData}
                                  ligjerataId={ligjerataId}
                                  editSubmission={editSubmission}
                                  viewAssignment={viewAssignment}
                                  onUpdate={openEditSubmission}
                                  hasSubmitted={hasSubmitted}
                                  setHasSubmitted={setHasSubmitted}
                                />
                              ) : (
                                <div>
                                  Assignment Submission Time has Expired
                                </div>
                              ))}
                          </Box>
                        </Box>
                      </Modal>
                    )}

                    {viewAssignment && (
                      <Box>
                        <Modal
                          open={update}
                          onClose={closeUpdate}
                          aria-labelledby="CreateAssignment"
                          aria-describedby="Assignment Creation"
                        >
                          <Box sx={style}>
                            <UpdateAssignment
                              onSubmit={updateAssignment}
                              onClose={closeUpdate}
                              initialData={viewAssignment}
                              ligjerataId={viewAssignment.id}
                              onUpdateAssignment={(updatedAssignment) => {
                                setViewAssignment(updatedAssignment);
                              }}
                            />
                          </Box>
                        </Modal>
                        <ViewSubmissions
                          assignment={viewAssignment}
                          token={token}
                          open={submissionsOpen}
                          onClose={handleSubmissionsClose}
                        />

                        <Modal
                          open={createSubmission}
                          onClose={closeCreateSubmission}
                          aria-labelledby="Create Submission"
                          aria-describedby="Assignment Submission"
                        >
                          <Box sx={style}>
                            <SubmitAssignment
                              onSubmit={submitAssignment}
                              onClose={closeCreateSubmission}
                              initialData={submissionData}
                              assignmentId={viewAssignment.id}
                              hasSubmitted={hasSubmitted}
                              setHasSubmitted={setHasSubmitted}
                            />
                          </Box>
                        </Modal>
                      </Box>
                    )}
                  </Box>
                ))}
              </>
            )}
          </Box>

          <Box
            mt={4}
            gridColumn={{ xs: "span 12", sm: "span 12", md: "span 9" }}
            sx={{ height: "100%" }}
          >
            {!materiali && postimet.length > 0 && (
              <IconButton
                onClick={() => {
                  toggleViewMyPosts();
                }}
              >
                <FilterAltIcon />
                <Typography>Mine Only</Typography>
              </IconButton>
            )}

            {!materiali && postimet.length === 0 && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography>No Posts Have Been Made here</Typography>
              </Box>
            )}

            {!materiali ? (
              <>
                {postimet.slice(0, postimCount).map((post) => (
                  <Postim
                    key={post.id}
                    post={post}
                    user={userInfo}
                    updatePostimi={updatePostimi}
                    deletePostimi={deletePostimi}
                    USER_ROLE={USER_ROLE}
                    token={token}
                  />
                ))}
                {postimet.length > postimCount && (
                  <Box width="100%" display="flex" justifyContent="center">
                    <Button
                      sx={{
                        "&:hover": {
                          textDecoration: "underline",
                          textDecorationColor: "white",
                        },
                      }}
                      onClick={loadMorePosts}
                    >
                      <Typography color="white">Show More Posts</Typography>
                    </Button>
                  </Box>
                )}
              </>
            ) : (
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
                <Materiali
                  ligjerataId={ligjerataId}
                  token={token}
                  USER_ROLE={USER_ROLE}
                  user={user}
                  professorId={location.state.professorId}
                  notification={showNotification}
                />
              </Suspense>
            )}
          </Box>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="CreateAssignment"
          aria-describedby="Assignment Creation"
        >
          <Box sx={style}>
            <CreateAssignment
              onSubmit={createAssignment}
              onClose={handleClose}
              initialData={initialData}
              ligjerataId={ligjerataId}
              token={token}
            />
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Postimi;
