import sprintImg from "./assets/img/sprint.png";
import audioImg from "./assets/img/audio.png";
import background from "./assets/img/white-abstract-background.png";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { getStatistic, Stat } from "./games/updateStatistic";
import { useUser } from "./UserProvider";
import { useEffect, useState } from "react";

export const Statistics = () => {
  const [user] = useUser();
  const [dataStatistic, setStatInfo] = useState<Stat>();

  useEffect(() => {
    if (user) getStatistic(user).then(setStatInfo);
  }, [user]);

  const pathStat = dataStatistic?.optional.winrateHistory.data[0];

  const accAudio = pathStat?.audioCorrect;
  const accSprint = pathStat?.sprintCorrect;
  const learnedWords = dataStatistic?.learnedWords;

  const sumWordsInSprint = accSprint
    ? accSprint + pathStat?.sprintIncorrect
    : 0;
  const longSeriesSprint = pathStat?.sprintLongestSeries
    ? pathStat?.sprintLongestSeries
    : 0;
  const longSeriesAudio = pathStat?.audioLongestSeries
    ? pathStat?.audioLongestSeries
    : 0;
  const sumWordsInAudio = accAudio ? accAudio + pathStat?.audioIncorrect : 0;
  const accuracySprint = accSprint
    ? Math.round((accSprint / sumWordsInSprint) * 100)
    : 0;
  const accuracyAudio = accAudio
    ? Math.round((accAudio / sumWordsInAudio) * 100)
    : 0;

  const accuracyAllWords = pathStat
    ? Math.round(
        ((pathStat?.sprintCorrect + pathStat?.audioCorrect) /
          (sumWordsInSprint + sumWordsInAudio)) *
          100
      )
    : 0;
  return (
    <Grid
      container
      justifyContent="flex-start"
      gap={2}
      flexDirection="column"
      p={5}
      height="calc(100vh - 65px)"
      width="100%"
      sx={{ background: `url(${background})`, backgroundSize: "cover" }}
    >
      <Grid textAlign={"center"}>
        <Typography variant="h4">Today</Typography>
      </Grid>
      <Grid container gap={2} justifyContent={"center"}>
        <Grid item textAlign={"center"}>
          <Card sx={{ minWidth: 275, minHeight: 225 }}>
            <CardContent>
              <Grid container justifyContent={"space-around"}>
                <Grid>
                  <Typography
                    component="p"
                    sx={{ fontSize: "3rem", lineHeight: 1.1 }}
                    color="text.secondary"
                  >
                    {learnedWords}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="h4" component="p">
                    words
                  </Typography>
                  <Typography color="text.secondary">were learned</Typography>
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Typography sx={{ fontSize: "2rem" }}>Accuracy</Typography>
                <Typography sx={{ fontSize: "2rem" }}>
                  {accuracyAllWords + "%"}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Card sx={{ minWidth: 275, minHeight: 225 }}>
            <CardContent>
              <Grid display={"flex"} flexDirection={"column"} gap={1}>
                <Grid display={"flex"} gap={3}>
                  <img src={sprintImg} alt={"img"} height={80} />
                  <Typography
                    sx={{ fontSize: "2rem" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Sprint
                  </Typography>
                </Grid>
                <Grid container justifyContent={"center"} gap={2}>
                  <Grid item md={3} xs={3} sm={3}>
                    <Typography variant="h5" component="div">
                      {sumWordsInSprint}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {accuracySprint + "%"}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {longSeriesSprint}
                    </Typography>
                  </Grid>
                  <Grid item md={5} xs={5} sm={5}>
                    <Typography variant="h5" component="div">
                      words
                    </Typography>
                    <Typography variant="h5" component="div">
                      accuracy
                    </Typography>
                    <Typography variant="h5" component="div">
                      in a row
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Card sx={{ minWidth: 275, minHeight: 225 }}>
            <CardContent>
              <Grid display={"flex"} flexDirection={"column"} gap={1}>
                <Grid display={"flex"} gap={3}>
                  <img src={audioImg} alt={"img"} height={80} />
                  <Typography
                    sx={{ fontSize: "1.5rem" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Audio <br />
                    challenge
                  </Typography>
                </Grid>
                <Grid container justifyContent={"center"} gap={2}>
                  <Grid item md={3} xs={3} sm={3}>
                    <Typography variant="h5" component="div">
                      {sumWordsInAudio}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {accuracyAudio + "%"}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {longSeriesAudio}
                    </Typography>
                  </Grid>
                  <Grid item md={5} xs={5} sm={5}>
                    <Typography variant="h5" component="div">
                      words
                    </Typography>
                    <Typography variant="h5" component="div">
                      accuracy
                    </Typography>
                    <Typography variant="h5" component="div">
                      in a row
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};
