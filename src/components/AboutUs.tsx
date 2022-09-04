import { Grid, Typography } from "@mui/material";
import { CardOurTeam, dataTeam } from "./cards/CardOurTeam";

export const AboutUs = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      gap={1}
    >
      <Typography fontSize={'3rem'}sx={{p:5}}>Our team</Typography>
      {dataTeam.map((unit) => (
        <CardOurTeam key={unit.title} title={unit.title} img={unit.img} discription={unit.discription} src={unit.src}/>
      ))}
    </Grid>
  );
};
