import { CardMedia, Grid, Typography } from "@mui/material";
import boss from "./../assets/img/Boss.jpg";
import macroBoss from "./../assets/img/macroBoss.jpg";
import miniBoss from "./../assets/img/miniBoss.jpg";

type DataTeamProps = {
  title: string;
  img: any;
  discription: string;
  src: string;
};
export const dataTeam = [
  {
    title: "DalnoOld",
    img: boss,
    discription:
      "Духовный лидер. Верстка, Электронный учебник. Список слов. Изученные слова.",
    src: "https://github.com/dmitriStpaniuk",
  },
  {
    title: "Vlad",
    img: macroBoss,
    discription: "Исполнитель чуда. Миниигры. Статистика.",
    src: "https://github.com/VladimirKukolovich",
  },
  {
    title: "lopyx191",
    img: miniBoss,
    discription: "Моральный адепт. Моральная еженедельная поддержка. Долгосрочная статистика",
    src: "https://github.com/lopyx191",
  },
];

export const CardOurTeam = ({
  title,
  img,
  discription,
  src,
}: DataTeamProps) => {
  return (
    <>
      <Grid
        container
        sx={{ border: "1px solid #1976D2", borderRadius: "10px" }}
      >
        <Grid sx={{p:2, width:'15%'}}>
          <CardMedia
            component="img"
            image={img}
            alt="green iguana"
            sx={{ borderRadius: "10px" , p:1, objectFit:'contain'}}
          />
        </Grid>
        <Grid item sx={{p:2, width:'85%'}}>
          <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center', fontSize:'2rem'}}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{p:2,textAlign:'center'}}>
            {discription}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
