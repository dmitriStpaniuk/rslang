import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import { useAnswerWords, useUnAnswerWords } from "./AllWordTranslate";
import { Divider, Grid, IconButton } from "@mui/material";
import { __baseUrl__ } from "../../constant";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AudioChallengeModal = () => {
  const correctAnswerWords = useContext(useAnswerWords);
  const unCorrectAnswerWords = useContext(useUnAnswerWords);

  const [open, setOpen] = React.useState(true);
  let navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component={"span"} fontSize={"1.3rem"}>
            I know
          </Typography>
          <Grid
            display={"inline"}
            ml="1rem"
            sx={{ background: "#058c92c4", borderRadius: "25%", p: "4px 6px" }}
          >
            <Typography component={"span"} fontSize={"1.3rem"}>
              {correctAnswerWords.length}
            </Typography>
          </Grid>
          {correctAnswerWords.map((word) => (
            <Box key={word?.id}>
              <IconButton
                aria-label="add an alarm"
                onClick={() => new Audio(__baseUrl__ + `${word?.audio}`).play()}
              >
                <PlayCircleOutlineIcon
                  sx={{
                    color: "#e14e307d",
                  }}
                />
              </IconButton>
              <Typography
                component={"span"}
                id="modal-modal-description"
                sx={{ mt: 2, color: "green" }}
              >
                {word?.word}
              </Typography>
              <Typography
                component={"span"}
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {" "}
                {"-"} {word?.wordTranslate}
              </Typography>
            </Box>
          ))}
          <Divider sx={{m:3}}></Divider>
          <Typography component={"span"} fontSize={"1.3rem"}>
            I don't know
          </Typography>
          <Grid
            display={"inline"}
            ml="1rem"
            sx={{ background: "#ed0000b0", borderRadius: "25%", p: "4px 6px" }}
          >
            <Typography component={"span"} fontSize={"1.3rem"}>
              {unCorrectAnswerWords.length}
            </Typography>
          </Grid>
          {unCorrectAnswerWords.map((word) => (
            <Box key={word?.id}>
              <IconButton
                aria-label="add an alarm"
                onClick={() => new Audio(__baseUrl__ + `${word?.audio}`).play()}
              >
                <PlayCircleOutlineIcon
                  sx={{
                    color: "#e14e307d",
                  }}
                />
              </IconButton>
              <Typography
                component={"span"}
                id="modal-modal-description"
                sx={{ mt: 2, color: "red" }}
              >
                {word?.word}
              </Typography>
              <Typography
                component={"span"}
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {" "}
                {"-"} {word?.wordTranslate}
              </Typography>
            </Box>
          ))}
        </Box>
      </Modal>
    </div>
  );
};
