import { Grid, Link, Paper } from "@mui/material";
import rsSchool from "./assets/img/rs_school.svg";

const dateTeam = [
  { name: "dmitriStpaniuk", url: "https://github.com/dmitriStpaniuk" },
  { name: "VladimirKukolovich", url: "https://github.com/VladimirKukolovich" },
  { name: "lopyx191", url: "https://github.com/lopyx191" },
];

export const Footer = () => {
  return (
    
      <Grid
        container
        alignItems=" center"
        justifyContent="space-between"
        sx={{ p: 2 }}
      >
        <Grid item>
          <img src={rsSchool} alt="rsSchool" />
        </Grid>
        <Grid display="flex" gap={1}  flexWrap={'wrap'}>
          {dateTeam.map((user) => (
            <Grid key={user.name} item>
              <Link href={user.url} underline="hover">
                {user.name}
              </Link>
            </Grid>
          ))}
        </Grid>
        <Grid>2022</Grid>
      </Grid>
    
  );
};
