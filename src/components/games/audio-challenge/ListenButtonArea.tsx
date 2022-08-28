import { Grid, IconButton, Typography } from "@mui/material";
import { __baseUrl__ } from "../../constant";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { ResponseData } from "../sprint/SprintGame";
type PropsListenArea = {
    words: ResponseData[];
    indexWinnerWord:number;
    sound:  HTMLAudioElement | null
}
type PropsBigButton = {
    sound:  HTMLAudioElement | null
}

export const ShowWinnerImage = ({words, indexWinnerWord, sound}:PropsListenArea) => {
    return (
      <Grid
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        height={"15vh"}
      >
        <Grid
          borderRadius={"50%"}
          sx={{
            background: `url(${__baseUrl__}${words[indexWinnerWord]?.image})`,
            width: "calc(2.7rem + 8.5vw)",
            height: "calc(2.6rem + 4.5vw)",
            backgroundSize: "160%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid container justifyContent="space-around" alignItems="center">
          <Typography
            component={"p"}
            textTransform="uppercase"
            fontWeight={"600"}
          >
            {words[indexWinnerWord]?.word}
          </Typography>
          <IconButton aria-label="add an alarm" onClick={() => sound?.play()}>
            <PlayCircleOutlineIcon
              sx={{
                color: "#e14e307d",
                width: "calc(.7rem + 3vw)",
                height: "calc(.7rem + 3vw)",
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

 export const BigAudioButton = ({sound}: PropsBigButton) => {
    return (
      <Grid display={"flex"} alignItems="center" height={"15vh"}>
        <IconButton aria-label="add an alarm" onClick={() => sound?.play()}>
          <PlayCircleOutlineIcon
            sx={{
              color: "#e14e307d",
              width: "calc(2rem + 4.5vw)",
              height: "calc(2rem + 4.5vw)",
            }}
          />
        </IconButton>
      </Grid>
    );
  };
