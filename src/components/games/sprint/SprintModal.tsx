import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponseData } from "./SprintGame";
import { Divider, Grid, IconButton } from "@mui/material";
import { __baseUrl__ } from "../../constant";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { updateStatistic } from "../updateStatistic";
import { useUser } from "../../UserProvider";

export type PropsModal = {
  correctAnswerWords: ResponseData[];
  unCorrectAnswerWords: ResponseData[];
  count?: number;
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
  correctAnswerWords,
  unCorrectAnswerWords,
  longSeries,
}: PropsModal) => {
  const [open, setOpen] = useState(true);
  const [user] = useUser();
  const longestSeriesInGame = longSeries.sort((a, b) => b - a)[0];
  let navigate = useNavigate();
  const handleClose = () => {
    navigate(-2);
    setOpen(false);
    updateStatistic(
      correctAnswerWords,
      unCorrectAnswerWords,
      longestSeriesInGame,
      "sprint",
      user,
    );
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
              {correctAnswerWords.length}
            </Typography>
          </Grid>
          <Grid height={"40%"} overflow="auto">
            {correctAnswerWords.map((word) => (
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
              {unCorrectAnswerWords.length}
            </Typography>
          </Grid>
          <Grid height={"40%"} overflow="auto">
            {unCorrectAnswerWords.map((word) => (
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
