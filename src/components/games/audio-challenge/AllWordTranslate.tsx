/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ResponseData } from "../sprint/SprintGame";

import useSound from "use-sound";
type PropsWordTranslate = {
  words: ResponseData[];
  winnerWord: ResponseData | null;
  setIsWinnerImage: (a: boolean) => void;
  setButtonOpt: (a: boolean) => void;
  isHandleSound: string[];
};

export const correctAnswerWordsInAudioChell: (ResponseData | null)[] = [];
export const unCorrectAnswerWordInAudioChells: (ResponseData | null)[] = [];

export const useAnswerWordsInAudioChell = React.createContext(correctAnswerWordsInAudioChell);
export const useUnAnswerWordsInAudioChell = React.createContext(unCorrectAnswerWordInAudioChells);

export const AllWordTranslate = ({
  words,
  setIsWinnerImage,
  setButtonOpt,
  winnerWord,
  isHandleSound,
}:
PropsWordTranslate) => {
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
      correctAnswerWordsInAudioChell.push(winnerWord);
    playGood()

  };
  const unCarrectAnswer = (winnerWord: ResponseData | null) => {
    unCorrectAnswerWordInAudioChells.push(winnerWord)
    playBad();
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
