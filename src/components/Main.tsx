import { Box, CardMedia, Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import mainImg from "./assets/img/digital-education-main-banner-img.png";
import { CardMain } from './cards/CardMain';
import { mainState } from "./constant";
import { Dictionary } from "./dictionary/Dictionary";
import DifficultyLevel from "./games/DifficultyLevel";
import { ProfileUser } from './profile/ProfileUser';
import { Registration } from './registration/Registration';
import { SignIn } from './registration/SignIn';
import { Textbook } from './textbook/Textbook';
import { SprintGame } from './games/sprint/SprintGame';
import { AudioChallehgeGame } from "./games/audio-challenge/AudioChallengeGame";
import { Footer } from "./Footer";
import { GamePage } from "./GamePage";
import { Statistics } from "./Statistics";
import { AboutUs } from "./AboutUs.tsx/AboutUs";
import { Statistic } from "./statistic/Statistic";

const Placeholder = () => (
  <Grid
    sx={{pr: 2, pl: 2, mt: 2 }}
    container
    maxWidth={"1900px"}
    spacing={1}
    direction="column"
    alignItems=" flex-start"
    justifyContent="center"
    flexDirection="row"
  >
    {mainState.map((card, index) => (
      <Grid key={index} item xs={12} sm={12} md={4}>
        <CardMain
          img={card.img}
          title={card.title}
          discription={card.discription}
          src={card.src}
        />
      </Grid>
    ))}

    <Grid item xs={false} md={9} display={{ xs: "none", sm: "block" }}>
      <CardMedia component="img" image={mainImg} alt="main-img" />
    </Grid>
    <Footer />
  </Grid>
);
export const Main = () => {
  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        width: "100%",
        // height: "calc(100vh - 64px)",
        justifyContent: "center",
      }}
    >
      <Routes>
        <Route path="/" element={<Placeholder />} />
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<Registration />} />
        <Route path="profile" element={<ProfileUser />} />
        <Route path="dictionary" element={<Dictionary />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="difficulty/:id" element={<DifficultyLevel />} />
        <Route path="library/level/:id" element={<Textbook />} />
        <Route path="sprint/level/:id" element={<SprintGame />} />
        <Route path="audio/level/:id" element={<AudioChallehgeGame />} />
        <Route path="/statistic" element={<Statistics />} />
        <Route path="game" element={<GamePage />} />
      </Routes>
    </Box>
  );
};
