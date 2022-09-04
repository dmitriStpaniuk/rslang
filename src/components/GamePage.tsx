import { Grid, Typography } from "@mui/material";
import { CardMain } from "./cards/CardMain";
import { gameState } from "./constant";
import { Footer } from "./Footer";
import background from './assets/img/white-abstract-background.png';

export const GamePage = () => {
  return (
    <Grid container sx={{height:'93vh', alignContent: 'flex-start', justifyContent: 'center', background: `url(${background})`, backgroundSize: "cover"}}>
      <Typography sx={{ pt: 2,pb:2, fontSize: "3rem" }}>GamePage</Typography>
      <Grid gap={1} sx={{m:1}} container justifyContent={'space-evenly'}>
        {gameState.map((card, index) => (
          <Grid  key={index} item xs={12} sm={12} md={4}>
            <CardMain
              img={card.img}
              title={card.title}
              discription={card.discription}
              src={card.src}
            />
          </Grid>
        ))}
      </Grid>
      <Grid position={'absolute'} sx={{width:"100%", bottom:0}}>
        <Footer />
      </Grid>
    </Grid>
  );
};
