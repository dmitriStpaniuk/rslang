import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ResponseData } from "./SprintGame";
import { Divider, Grid, IconButton } from "@mui/material";
import { axiosApiInstance, __baseUrl__ } from "../../constant";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useUser } from "../../UserProvider";

type PropsSprintModal = {
  correctAnswerWordsInSprint: (ResponseData | null)[];
  unCorrectAnswerWordsInSptint: (ResponseData | null)[];
  count: number;
  longSeries: number[];
};
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

export const SprintModal = ({
  count,
  correctAnswerWordsInSprint,
  unCorrectAnswerWordsInSptint,
  longSeries,
}: PropsSprintModal) => {
  const [user, setUser] = useUser();


  
  const getStatisticsSprint = async () => {
    await axiosApiInstance.put(__baseUrl__ + `users/${user?.id}/statistics`);
  };


  const longestSeriesInGame = longSeries.sort((a, b) => b - a)[0];
  const statisticsSprintUnAutoriz = {
    learnedWords: 0,
    optional: {
 
    },
  };





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
        <Box
          sx={style}
          height={"60%"}
          width={"fit-content"}
          borderRadius={"10px"}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textTransform="uppercase"
          >
            <span>your score {count} points</span>
          </Typography>

          <Typography component={"span"} fontSize={"1.3rem"}>
            I know
          </Typography>
          <Grid
            display={"inline"}
            ml="1rem"
            sx={{ background: "#058c92c4", borderRadius: "25%", p: "4px 6px" }}
          >
            <Typography component={"span"} fontSize={"1.3rem"}>
              {correctAnswerWordsInSprint.length}
            </Typography>
          </Grid>
          <Grid height={"40%"} overflow="auto">
            {correctAnswerWordsInSprint.map((word) => (
              <Box key={word?.id}>
                <IconButton
                  aria-label="add an alarm"
                  onClick={() =>
                    new Audio(__baseUrl__ + `${word?.audio}`).play()
                  }
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
          </Grid>
          <Divider sx={{ m: 3 }}></Divider>
          <Typography component={"span"} fontSize={"1.3rem"}>
            I don't know
          </Typography>
          <Grid
            display={"inline"}
            ml="1rem"
            sx={{ background: "#ed0000b0", borderRadius: "25%", p: "4px 6px" }}
          >
            <Typography component={"span"} fontSize={"1.3rem"}>
              {unCorrectAnswerWordsInSptint.length}
            </Typography>
          </Grid>
          <Grid height={"40%"} overflow="auto">
            {unCorrectAnswerWordsInSptint.map((word) => (
              <Box key={word?.id}>
                <IconButton
                  aria-label="add an alarm"
                  onClick={() =>
                    new Audio(__baseUrl__ + `${word?.audio}`).play()
                  }
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
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};
