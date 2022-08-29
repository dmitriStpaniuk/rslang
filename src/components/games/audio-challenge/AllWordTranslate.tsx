import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ResponseData } from "../sprint/SprintGame";

import useSound from "use-sound";
import { ThemeContext } from "@emotion/react";
type PropsWordTranslate = {
  words: ResponseData[];
  winnerWord: ResponseData | null;
  setIsWinnerImage: (a: boolean) => void;
  setButtonOpt: (a: boolean) => void;
  isHandleSound: string[];
};

export const correctAnswerWords: (ResponseData | null)[] = [];
export const unCorrectAnswerWords: (ResponseData | null)[] = [];

export const useAnswerWords = React.createContext(correctAnswerWords);
export const useUnAnswerWords = React.createContext(unCorrectAnswerWords);

function AnswerWords() {
  return (
    <ThemeContext.Provider value={correctAnswerWords}>
    </ThemeContext.Provider>
  );
}
function UnAnswerWords() {
  return (
    <ThemeContext.Provider value={unCorrectAnswerWords}>
    </ThemeContext.Provider>
  );
}

export const AllWordTranslate = ({
  words,
  setIsWinnerImage,
  setButtonOpt,
  winnerWord,
  isHandleSound,
}:
PropsWordTranslate) => {
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [playBad] = useSound(isHandleSound[0]);
  const [playGood] = useSound(isHandleSound[1]);
  
  useEffect(() => {
    setIsDisableButton(false);
  }, [words]);
  
  const carrectAnswer = (winnerWord: ResponseData | null) => {
    correctAnswerWords.push(winnerWord);
    playGood();
  };
  const unCarrectAnswer = (winnerWord: ResponseData | null) => {
    unCorrectAnswerWords.push(winnerWord)
    playBad();
  };
  const handleChange = (eventButton: ChildNode | null) => {
    setIsWinnerImage(true);
    setButtonOpt(true);
    eventButton?.textContent?.slice(1).trim() === winnerWord?.wordTranslate
      ? carrectAnswer(winnerWord)
      : unCarrectAnswer(winnerWord);
    setIsDisableButton(true);
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
            onClick={(e) => handleChange(e.currentTarget.firstChild)}
          >
            <>{index + 1 + " " + word.wordTranslate}</>
          </Button>
        ))}
      </>
    </Grid>
  );
};
