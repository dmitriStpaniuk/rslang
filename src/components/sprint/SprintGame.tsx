import { ArrowBack } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { SetHandleStartGame } from "./SprintStart";
import { NewWord } from "./Sprint";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { __baseUrl__ } from "../constant";
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import sprintImg from './../assets/img/sprint.png';
import { useState } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
export type ResponseData = {
    id?: string,
    group?: number,
    page?: number,
    word: string,
    image: string,
    audio: string,
    audioMeaning?: string,
    audioExample?: string,
    textMeaning?: string,
    textExample?: string,
    transcription?: string,
    textExampleTranslate?: string,
    textMeaningTranslate?: string,
    wordTranslate: string,
}

const Timer = () => (
    <CountdownCircleTimer
        isPlaying
        duration={60}
        colors={['#058c92c', '#dbb1239', '#1976d2', '#e14e30f0']}
        colorsTime={[60, 40, 20, 0]}
        size={50}
        strokeWidth={5}
    >
        {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
)






export const SprintGame = ({ setHandleStartGame, word, audio, image, audioMeaning, wordTranslate, newWord }: SetHandleStartGame & NewWord & ResponseData ) => {
    const [prompt, setPromt] = useState(false)

    setTimeout(() => {
        // setHandleStartGame(true)
    }, 60000);

    let wordAudio = new Audio(`${__baseUrl__ + audio}`);
    let meaningAudio = new Audio(`${__baseUrl__ + audioMeaning}`);
    



    const handleClick = () => {
        setHandleStartGame(true)
    }
    const hendlePromt = () => {
        setPromt(true)
    }
    const removeHendlePromt = () => {
        setPromt(false)
    }
    // removeHendlePromt()
    return (
        <Grid container sx={{
            padding: '1%'
        }}>
            <Grid container sx={{
                justifyContent: 'space-between'
            }}>
                <Grid item>
                    <ArrowBack
                        sx={{
                            cursor: 'pointer',
                            width: '3rem',
                            height: '3rem',
                            '&:hover': {
                                color: "#e14e30f0"
                            }
                        }}
                        onClick={handleClick} />
                </Grid>
                <Grid item sx={{
                    // margin: 'auto'
                }}>
                    counter
                </Grid>
                <Grid item>
                    <Timer />
                </Grid>
            </Grid>
            <Grid container
                sx={{
                    justifyContent: 'center',
                    flexWrap: 'no-wrap'
                }}>
                <Grid item
                    md={5}
                    xs={7}
                    sm={5}
                >
                    <Grid container
                        sx={{
                            flexDirection: 'column',
                            flexWrap: 'no-wrap',
                            margin: 'auto',
                        }}>
                        <Grid item
                            sx={{
                                margin: 'auto 1%',
                                height: '28vw',
                            }}
                        >
                            {prompt
                                ? <Grid item sx={{
                                    backgroundImage: `url(${__baseUrl__}${image})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    height: '28vw',
                                    backgroundSize: '100%',
                                }}
                                >
                                </Grid>
                                : false}
                        </Grid>
                        <Grid item sx={{
                            textAlign: 'center',
                        }}>
                            <Button variant="contained"
                                sx={{
                                    fontFamily: 'cursive',
                                    alignSelf: 'end',
                                    marginTop: '2%',
                                    width: '7rem'
                                }}
                                onClick={hendlePromt}
                            >Подсказка</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item
                    xs={false}
                    sm={5}
                    md={6}
                    sx={{
                        backgroundImage: `url(${sprintImg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '80%',
                        backgroundPosition: 'center',
                        height: '28vw',
                        margin: 'auto 0',
                    }}
                >
                </Grid>
            </Grid>
            <Grid container
                sx={{
                    height: 'fit-content',
                    backgroundColor: '#dbb1239c',
                    margin: '2% auto',
                    borderRadius: '5px',
                    padding: '2%',
                }}
            >
                <Grid container sx={{
                    justifyContent: 'space-around',

                }}>
                    <IconButton color="secondary" aria-label="add an alarm"
                    onClick={() => {wordAudio.play()}}>
                        <PlayCircleOutlineIcon sx={{
                            color: '#e14e30f0',
                            width: 'calc(1.5rem + 1.5vw)',
                            height: 'calc(1.5rem + 1.5vw)'
                        }} 
                        />
                    </IconButton>
                    <Typography 
                        component={'p'}
                        sx={{
                            fontFamily: 'cursive',
                            fontSize: 'calc(1rem + 1.5vw)',
                            textTransform: 'uppercase',
                            minWidth: '55%',
                            textAlign: 'center'
                        }}>{word}</Typography>
                    <IconButton color="secondary" aria-label="add an alarm"
                    onClick={() => {meaningAudio.play()}}>
                        <VolumeMuteIcon sx={{
                            color: '#e14e30f0',
                            width: 'calc(1.5rem + 1.5vw)',
                            height: 'calc(1.5rem + 1.5vw)'
                        }} 
                        />
                    </IconButton>
                </Grid>
                <Typography
                    component={'p'}
                    sx={{
                        margin: '0 auto 2%',
                        fontSize:'calc(1rem + 0.5vw)',
                        fontFamily: 'cursive',
                        textTransform: 'uppercase',
                    }}>{wordTranslate}</Typography>
                <Grid container sx={{
                    justifyContent: 'center',
                    gap: '1rem'
                }}>
                    <Button variant="contained"
                        onClick={() => newWord()}
                        sx={{
                            width: '7rem',
                            bgcolor: '#e14e30f0',
                            '&:hover': {
                                bgcolor: "red"
                            }
                        }}>Неверно</Button>
                    <Button variant="contained"
                        onClick={() => newWord()}
                        sx={{
                            width: '7rem',
                            bgcolor: '#058c92c4',
                            '&:hover': {
                                bgcolor: "#056c94c4"
                            }
                        }}>Верно</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
