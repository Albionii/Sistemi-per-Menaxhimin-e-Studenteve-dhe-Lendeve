import React, { useState } from "react";
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
import Materiali from "../components/Materiali/Materiali";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

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

const Postimi = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ligjerataId = 2;
  const USER_ROLE = "ROLE_STUDENT";
  const token = `eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTY1NzM2NDIsImV4cCI6MTcxNjU4MjI4MiwiZW1haWwiOiJzdHVkZW50QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9TVFVERU5UIn0.Lu7uWoYB9zTca0J5aoeULAOVRoTB5GG6078jS2pap44`;
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  const {
    assignments,
    createAssignment,
    deleteAssignment,
    updateAssignment,
    submitAssignment,
    updateSubmission,
  } = useAssignments(ligjerataId, token);

  const {
    postimet,
    post,
    userInfo,
    updatePostimi,
    deletePostimi,
    getPostimetUser,
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
  const openMateriali = () => setMateriali(true);
  const closeMateriali = () => setMateriali(false);

  const [data, setData] = useState([]);

  


  const handleMaterialiClick = () => {
    setMateriali(!materiali);
  };

  const handlePostFilter = () => {
    getPostimetUser();
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
    console.log("success");
  };

  return (
    <Box
      m={4}
      display="grid"
      gridTemplateColumns={{ xs: "1fr", sm: "repeat(12, 1fr)" }}
      gap={2}
    >
      <Box
        gridColumn={{ xs: "span 12", sm: "span 12" }}
        sx={{
          backgroundImage: `url(${imageUrl})`,
          borderRadius: "30px",
          height: "250px",
          position: "relative",
          border: "4px solid " + colors.primary[700],
        }}
      >
        <Box position="absolute" bottom={0} left={0} ml={4} mb={3} zIndex={1}>
          <Typography variant="h2" fontWeight="bold">
            Hyrje ne Shkenca Kompjuterike
          </Typography>
          <Typography variant="h5">Blerim Zylfiu</Typography>
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
            <Avatar />
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" fontWeight={"bold"} mb={2}>
              Assignments:
            </Typography>
            {USER_ROLE === "ROLE_PROFESSOR" && (
              <Button
                sx={{ background: colors.greenAccent[500], borderRadius: 3 }}
                variant="contained"
                onClick={handleOpen}
              >
                <Typography variant="h5" color={"#fff"} fontWeight={"bold"}>
                  +
                </Typography>
              </Button>
            )}
          </Box>
          {assignments.map((assignment) => (
            <Box key={assignment.id}>
              <Link
                onClick={() => {
                  setViewAssignment(assignment);
                  handleEditOpen();
                }}
              >
                <Box>
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
                      <Typography>{assignment.expireAt}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Link>
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <TaskIcon sx={{ fontSize: "25px" }} />
                      <Typography>{viewAssignment.titulli}</Typography>
                      <Box>
                        <Typography>{viewAssignment.mesazhi}</Typography>
                      </Box>
                      <Box>
                        <Typography>
                          Due date: {viewAssignment.expireAt}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ textAlign: "center", marginBottom: 1 }}
                        >
                          Files:
                        </Typography>
                        {viewAssignment.fileNames.map((fileName, index) => (
                          <Box
                            key={index}
                            display="flex"
                            alignItems="center"
                            mb={1}
                          >
                            {getFileIcon(fileName)}
                            <Typography
                              variant="body1"
                              sx={{
                                cursor: "pointer",
                                marginLeft: 1,
                                "&:hover": {
                                  backgroundColor: colors.primary[300],
                                },
                              }}
                              onClick={() => handleDownload(fileName)}
                            >
                              {fileName}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      <Box>
                        {(USER_ROLE === "ROLE_PROFESSOR" ||
                          USER_ROLE === "ROLE_ADMIN") && (
                          <Box sx={{ display: "flex", gap: "15px" }}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={openUpdate}
                            >
                              <Typography>Edit</Typography>
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
                        {USER_ROLE === "ROLE_STUDENT" && (
                          <HasSubmission
                            assignmentId={viewAssignment.id}
                            token={token}
                            onSubmit={openCreateSubmission}
                            onUpdate={openEditSubmission}
                          />
                        )}
                      </Box>
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
                    assignmentId={viewAssignment.id}
                    token={token}
                    open={submissionsOpen}
                    onClose={handleSubmissionsClose}
                  />
                  <Modal
                    open={editSubmission}
                    onClose={closeEditSubmission}
                    aria-labelledby="Create Submission"
                    aria-describedby="Assignment Submission"
                  >
                    <Box sx={style}>
                      <UpdateSubmission
                        onSubmit={updateSubmission}
                        onClose={closeEditSubmission}
                        initialData={submissionData}
                        ligjerataId={viewAssignment.id}
                        assignmentId={viewAssignment.id}
                        token={token}
                      />
                    </Box>
                  </Modal>
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
                        ligjerataId={viewAssignment.id}
                      />
                    </Box>
                  </Modal>
                </Box>
              )}
            </Box>
          ))}
        </Box>
        <Box
          mt={4}
          gridColumn={{ xs: "span 12", sm: "span 12", md: "span 9" }}
          sx={{ height: "100%" }}
        >
          <IconButton
            onClick={() => {
              handlePostFilter();
            }}
          >
            <FilterAltIcon />
            <Typography>Mine Only</Typography>
          </IconButton>

          {!materiali ? (
            postimet
              .toReversed()
              .map((post) => (
                <Postim
                  post={post}
                  user={userInfo}
                  updatePostimi={updatePostimi}
                  deletePostimi={deletePostimi}
                  USER_ROLE={USER_ROLE}
                />
              ))
          ) : (
            <Materiali ligjerataId={2} token={token} USER_ROLE={USER_ROLE} />
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
  );
};

export default Postimi;


