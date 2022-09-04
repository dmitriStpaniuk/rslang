/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Grid } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ResponseData } from '../sprint/SprintGame';
import useSound from 'use-sound';

type PropsWordsTranslate = {
  words: ResponseData[];
  winnerWord: ResponseData | null;
  setIsWinnerImage: (a: boolean) => void;
  setButtonOpt: (a: boolean) => void;
  setCorrectAnswerWords: Dispatch<SetStateAction<ResponseData[]>>;
  setUnCorrectAnswerWords: Dispatch<SetStateAction<ResponseData[]>>;
  isHandleSound: string[];
  correctAnswerWords: ResponseData[];
  unCorrectAnswerWords: ResponseData[];
  series: number;
  setSeries: (a: number) => void;
  longSeries: number[];
};


export const AllWordsTranslate = ({
  words,
  setIsWinnerImage,
  setButtonOpt,
  winnerWord,
  isHandleSound,
  correctAnswerWords,
  unCorrectAnswerWords,
  setCorrectAnswerWords,
  setUnCorrectAnswerWords,
  series,
  setSeries,
  longSeries
}:
PropsWordsTranslate) => {
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [isActivButton, setIsActivButtun] = useState(true);
  const [playBad] = useSound(isHandleSound[0]);
  const [playGood] = useSound(isHandleSound[1]);

  
  useEffect(() => {
    setIsDisableButton(false);
  }, [words]);
  useEffect(() => {
    setIsActivButtun(true);
  }, [words]);
 
  
    const carrectAnswer = (winnerWord: ResponseData | null) => {
      if(winnerWord)
      setCorrectAnswerWords([...correctAnswerWords, winnerWord])
      setSeries(series + 1)
    longSeries.push(series + 1);
    playGood()
  };
  const unCarrectAnswer = (winnerWord: ResponseData | null) => {
    if(winnerWord)
    setUnCorrectAnswerWords([...unCorrectAnswerWords, winnerWord])
    longSeries.push(series);
    playBad();
    setSeries(0)
  };
  const handleChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsWinnerImage(true);
    setButtonOpt(true);
    event.currentTarget.firstChild?.textContent?.slice(1).trim() === winnerWord?.wordTranslate
      ? carrectAnswer(winnerWord)
      : unCarrectAnswer(winnerWord);
      setIsDisableButton(true);
      setIsActivButtun(false);
  };
  return (
    <Grid display="flex" gap={2} flexWrap="wrap" justifyContent="center">
      <>
        {words?.map((word, index) => (
          <Button
            key={word.id}
            disabled={word.id !== winnerWord?.id ? isDisableButton : undefined}
            sx={{
              fontSize: "calc(0.6rem + .7vw)",
              textTransform: "uppercase",
            }}
            onClick={(event) => isActivButton? handleChange(event): '' }
          >
            <>{index + 1 + " " + word.wordTranslate}</>
          </Button>
        ))}
      </>
    </Grid>
  );
};


