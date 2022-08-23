import { ArrowBack } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { __baseUrl__ } from "../constant";
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import sprintImg from './../assets/img/sprint.png';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { SprintModal } from "./SprintModal";
import { getArrayWords, newArrayWords, randomPage, Timer } from "./sprint";
type ResponseData = {
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
export const SprintGame = () => {
    const [index, setIndex] = useState<number>(0)
    const [prompt, setPromt] = useState(false)
    const [words, setWords] = useState<ResponseData[]>([])
    const [modal, setModal] = useState(false)
    let navigate = useNavigate();
    const location = useLocation();
    const group = location.pathname.split('/').at(-1)
    useEffect(() => { getArrayWords( group).then(a => setWords(a.data)) }, [])

    const newWord = () => {
     index < 19  ? setIndex(() => index + 1): newArrayWords(group).then(a => setWords(a.data))
        setPromt(false)
    }
    setTimeout(() => { setModal(true) }, 60000);
    const wordAudio = words.length ? new Audio(__baseUrl__ + `${words[index].audio}`) : null;
    const meaningAudio = words.length ? new Audio(`${__baseUrl__ + words[index].audioMeaning}`) : null;
    const hendlePromt = () => {
        setPromt(true)
    }
    return (
        <Grid container sx={{
            padding: '1%'
        }}>
            {modal ? <SprintModal /> : false}
            <Grid container sx={{
                justifyContent: 'space-between'
            }}>
                <Grid item>
                    <ArrowBack
                        onClick={() => navigate(-1)}
                        sx={{
                            cursor: 'pointer',
                            width: '3rem',
                            height: '3rem',
                            '&:hover': {
                                color: "#e14e30f0"
                            }
                        }}
                    />
                </Grid>
                <Grid item sx={{
                    alignSelf: 'center'
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
                                    backgroundImage: `url(${__baseUrl__}${words[index].image})`,
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
                    md={5}
                    sx={{
                        backgroundImage: `url(${sprintImg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '80%',
                        backgroundPosition: 'center',
                        height: 'calc(50% + 19vw)',
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
                        onClick={() => { wordAudio?.play() }}>
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
                        }}>
                        {words[index]?.word}
                    </Typography>
                    <IconButton color="secondary" aria-label="add an alarm"
                        onClick={() => { meaningAudio?.play() }}>
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
                        fontSize: 'calc(1rem + 0.5vw)',
                        fontFamily: 'cursive',
                        textTransform: 'uppercase',
                    }}>
                    {words[index]?.wordTranslate}
                </Typography>
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
                        }}>Неверно
                    </Button>
                    <Button variant="contained"
                        onClick={() => newWord()}
                        sx={{
                            width: '7rem',
                            bgcolor: '#058c92c4',
                            '&:hover': {
                                bgcolor: "#056c94c4"
                            }
                        }}>Верно
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
function x() {
    throw new Error("Function not implemented.");
}

