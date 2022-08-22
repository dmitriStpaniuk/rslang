/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import { ResponseData, SprintGame } from "./SprintGame";
import { SprintStart } from "./SprintStart";
import { useEffect, useState } from "react";
import axios from "axios";
import { __baseUrl__ } from "../constant";
// export type SetNewWord = {
//     setNewWord: number
//     // React.Dispatch<React.SetStateAction<number>>
// }
export type NewWord = {
    newWord: () => number
}
const getArrayWords = async () => {
    return await axios.get(__baseUrl__ + 'words?page=2&group=0')
}

// const newWord = (): number => {
//     return Math.ceil(Math.random() * 20)
// }


export const Sprint = () => {
    const [handleStartGame, setHandleStartGame] = useState(true)
    const [words, setWords] = useState<ResponseData[]>([])
    const [word, setNewWord] = useState<number>(0)
    // // let x = newWord()
    // // let x = newWord
    // console.log(newWord)
    // useEffect(() => { setNewWord() }, [])
let x = 0;
const newWord = () => {
    setNewWord(() => word + 1)
    return x
}
    console.log(word)


    useEffect(() => { getArrayWords().then(a => setWords(a.data)) }, [])

    return (
        <Grid container sx={{
            padding: '1%'
        }}>
            <Grid item
                sx={{
                    margin: 'auto'
                }}
                xs={12}
                sm={10}
                md={8}>
                {handleStartGame
                    ? <SprintStart setHandleStartGame={setHandleStartGame} />
                    : <SprintGame setHandleStartGame={setHandleStartGame}
                        word={words[word].word}
                        image={words[word].image}
                        audioMeaning={words[word].audioMeaning}
                        audio={words[word].audio}
                        wordTranslate={words[word].wordTranslate}
                        // setNewWord={setNewWord }
                        newWord={newWord}
                    />
                }
            </Grid>
        </Grid >
    )
}