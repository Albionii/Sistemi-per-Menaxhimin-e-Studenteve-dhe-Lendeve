import React from "react";
import { Box, useTheme, Typography, Button, Avatar } from "@mui/material";
import { tokens } from "../theme";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import TaskIcon from "@mui/icons-material/Task";

const Postimi = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Sample data for assignments
  const assignments = [
    { id: 1, title: "Assignment 1", dueDate: "2024-06-01" },
    { id: 2, title: "Assignment 2", dueDate: "2024-06-15" },
    { id: 3, title: "Assignment 3", dueDate: "2024-07-01" },
  ];

  // Sample data for posts
  const posts = [
    { id: 1, author: "John Doe", content: "Lorem ipsum dolor sit amet." },
    { id: 2, author: "Jane Smith", content: "Consectetur adipiscing elit." },
    {
      id: 3,
      author: "Alice Johnson",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    { id: 1, author: "John Doe", content: "Lorem ipsum dolor sit amet." },
    { id: 2, author: "Jane Smith", content: "Consectetur adipiscing elit." },
    {
      id: 3,
      author: "Alice Johnson",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    { id: 1, author: "John Doe", content: "Lorem ipsum dolor sit amet." },
    { id: 2, author: "Jane Smith", content: "Consectetur adipiscing elit." },
    {
      id: 3,
      author: "Alice Johnson",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    { id: 1, author: "John Doe", content: "Lorem ipsum dolor sit amet." },
    { id: 2, author: "Jane Smith", content: "Consectetur adipiscing elit." },
    {
      id: 3,
      author: "Alice Johnson",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <Box
      m={4}
      display="grid"
      gridTemplateColumns={{ xs: "1fr", sm: "repeat(12, 1fr)" }}
      gap={2}
    >
      {/* Red Box */}
      <Box
        gridColumn={{ xs: "span 12", sm: "span 12" }}
        sx={{
          background: colors.primary[600],
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

      {/* Content Boxes */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "repeat(12, 1fr)" }}
        gap={2}
        gridColumn={{ xs: "span 12", sm: "span 12" }}
      >
        {/* Button Box */}
        <Box gridColumn={{ xs: "span 12", sm: "span 3" }}>
          <Button
            sx={{
              background: colors.greenAccent[500],
              width: "100%",
              height: "100%",
              borderRadius: 3,
            }}
          >
            <Typography variant="h5" color={"#fff"} fontWeight={"bold"}>
              Shiko Materialin
            </Typography>
          </Button>
        </Box>

        {/* Input Box */}
        <Box gridColumn={{ xs: "span 12", sm: "span 9" }}>
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
                style={{
                  padding: "15px 30px",
                  width: "90%",
                  background: colors.primary[600],
                  borderRadius: "15px",
                  border: "2px solid " + colors.primary[400],
                }}
              />
              <Link to="/">
                <SendIcon />
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          mt={4}
          height={'100%'}
          gridColumn={{ xs: "span 12", sm: "span 12", md: 'span 3'}}
          sx={{ background: colors.primary[600], minWidth: '350px' }}
          padding={"20px"}
          borderRadius={3}
        >
          <Typography variant="h4" fontWeight={"bold"} mb={2}>
            Assignments:
          </Typography>
          {assignments.map((assignment) => (
            <Box>
              <Box
                key={assignment.id}
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
                    Detyre Shtepie 1
                  </Typography>
                </Box>
                <Box
                  padding={"15px"}
                  sx={{ background: colors.blueAccent[800] }}
                  borderRadius={3}
                >
                  <Typography>Due:</Typography>
                  <Typography>19/05/2024</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          mt={4}
          gridColumn={{ xs: "span 12", sm: "span 12", md:'span 9' }}
          sx={{ height: "100%" }}
        >
          {posts.map((post) => (
            <Box key={post.id} sx={{ marginBottom: "40px" }}>
              <Box
                padding={"15px"}
                borderRadius={"15px"}
                sx={{ background: colors.primary[600] }}
              >
                <Box display={"flex"}>
                  <Avatar></Avatar>
                  <Box ml={"15px"}>
                    <Typography variant="h5">{post.author}</Typography>
                    <Typography fontSize={"12px"} color={"text.secondary"}>
                      {"May 5th, 2024"}
                    </Typography>
                  </Box>
                </Box>
                <Box padding={"25px 50px"}>
                  Albin Kurti is the undisputed Goat Albin Kurti is the
                  undisputed Goat Albin Kurti is the undisputed Goat Albin Kurti
                  is the undisputed Goat Albin Kurti is the undisputed Goat
                  Albin Kurti is the undisputed Goat Albin Kurti is the
                  undisputed Goat Albin Kurti is the undisputed Goat Albin Kurti
                  is the undisputed Goat Albin Kurti is the undisputed Goat
                  Albin Kurti is the undisputed Goat Albin Kurti is the
                  undisputed Goat Albin Kurti is the undisputed Goat Albin Kurti
                  is the undisputed Goat Albin Kurti is the undisputed Goat
                </Box>
                <Box
                  sx={{ background: colors.primary[600] }}
                  borderTop={"3px solid " + colors.primary[400]}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={2}
                  >
                    <Avatar />
                    <Box
                      width={"95%"}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <input
                        type="text"
                        placeholder="Write something here"
                        style={{
                          padding: "15px 30px",
                          width: "90%",
                          background: colors.primary[600],
                          borderRadius: "15px",
                          border: "2px solid " + colors.primary[400],
                        }}
                      />
                      <Link to="/">
                        <SendIcon />
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Postimi;
