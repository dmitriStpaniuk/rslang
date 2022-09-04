import * as React from "react";
import sprintImg from "./assets/img/sprint.png";
import audioImg from "./assets/img/audio.png";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { arrayCards } from "./constant";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

export const Statistics = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Learned word count',
        },
      },
    };
  
  const labels = arrayCards.map((item) => item.day);
  const arrayLearn = arrayCards.map((item) => item.learnWords)
  const arrayFilter = arrayLearn.map((e)=>e.filter(item => item.learn === true).length);
  
  const data = {
    labels,
    datasets: [
      {
        data: (arrayFilter),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  
  const styles = {
      div: {
          width: "75%",
      }
  }

  return (
    <Box 
      display={"flex"}
      justifyContent={"flex-start"}
      // alignContent={'center'}
      alignItems={"center"}
      gap={2}
      flexDirection="column"
      p={5}
      height={"calc(100hv - 64px)"}
      width={'100%'}
      sx={{ background: "rgb(245, 245, 245)" }}
    >
      <Grid textAlign={'center'}>
        <Typography sx={{ fontSize: "2rem" }}>Today</Typography>
      </Grid>
      <Grid container gap={2} justifyContent={"center"}>
        <Grid item>
          <Card sx={{ minWidth: 275, minHeight: 225 }}>
            <CardContent>
              <Grid container justifyContent={"space-around"}>
                <Grid>
                  <Typography
                    component="p"
                    sx={{ fontSize: "5rem", lineHeight: 1.1 }}
                    color="text.secondary"
                  >
                    1
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="h3" component="p">
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
                <Typography sx={{ fontSize: "2rem" }}>{25}??%</Typography>
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
                      110
                    </Typography>
                    <Typography variant="h5" component="div">
                      0%
                    </Typography>
                    <Typography variant="h5" component="div">
                      0
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
                    Audio <br/>challenge
                  </Typography>
                </Grid>
                <Grid container justifyContent={"center"} gap={2}>
                  <Grid item md={3} xs={3} sm={3}>
                    <Typography variant="h5" component="div">
                      10
                    </Typography>
                    <Typography variant="h5" component="div">
                      0%
                    </Typography>
                    <Typography variant="h5" component="div">
                      0
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
      <div style={styles.div}>
            <Line options={options} data={data} updateMode='resize'/>
      </div>
    </Box>
  );
};
