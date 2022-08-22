import { Button, FormControl, Grid, InputLabel, NativeSelect, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import sprintImg from './../assets/img/sprint.png'
export type SetHandleStartGame = {
    setHandleStartGame: React.Dispatch<React.SetStateAction<boolean>>
}


export const SprintStart = ({ setHandleStartGame }: SetHandleStartGame) => {
    const handleClick = () => {
        setHandleStartGame(false)
    }
    return (
        <Grid container>
            <Grid container spacing={1}
                sx={{
                    justifyContent: "space-between",
                    margin: 'auto',
                }}
            >
                <Grid item sx={{
                    width: 150,
                }}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native"
                        >
                        </InputLabel>
                        <NativeSelect
                            defaultValue={1}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                            sx={{
                                fontSize: '130%',
                                fontFamily: 'cursive',
                                alignItems: 'center'
                            }}
                        >
                            <option value={1}>уровень 1</option>
                            <option value={2}>уровень 2</option>
                            <option value={3}>уровень 3</option>
                            <option value={4}>уровень 4</option>
                            <option value={5}>уровень 5</option>
                            <option value={6}>уровень 6</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item><CloseIcon
                        sx={{
                            fontSize: '2.5rem',
                            alignItems: 'flex-end',
                            '&:hover': {
                                color: "red"
                            }
                        }} />

                </Grid>
            </Grid>
            <Grid container>
                <Grid item sx={{
                    margin: 'auto',
                }}
                    sm={5.5}
                    md={4.5}
                >
                    <Typography
                        component={'span'}
                        sx={{
                            fontWeight: '800',
                            fontFamily: 'cursive',
                            color: '#058c92c4',
                            fontSize: 'calc(2rem + 4.5vw)'
                        }}
                    >Спринт</Typography>
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
                    }}>
                </Grid>

            </Grid>
            <Grid item
                sx={{
                    textAlign: 'center',
                    width: '80%',
                    backgroundColor: '#9ad8e7ab',
                    margin: 'auto',
                    borderRadius: '5px',
                    p: '3%'
                }}>
                <Typography
                //  variant="h5"
                    component={'p'}
                    sx={{
                        margin: '1rem',
                        fontFamily: 'cursive',
                        fontSize: 'calc(1rem + 0.6vw)'
                    }}>Спринт поможет тебе проверить знаешь ли ты правильный перевод.<br />
                    Игра длится 1 минуту или пока не закончаться слова.</Typography>
                <Button variant="contained"
                    onClick={handleClick}
                    sx={{
                        width: 'fit-content',
                        alignSelf: 'center',
                        backgroundColor: '#e14e30f0'
                    }}>Начать</Button>
            </Grid>
        </Grid>
    )
}

