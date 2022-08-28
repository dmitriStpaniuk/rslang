import { Grid } from "@mui/material";
import background from "./../../assets/img/white-abstract-background.png";
import { ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ResponseData } from "../sprint/SprintGame";
import { getArrayWords } from "../sprint/Sprint";
import { __baseUrl__ } from "../../constant";
import { AudioChallengeModal } from "./AudioChallengeModal";
import { AllWordTranslate } from "./AllWordTranslate";
import goodSound from "./../../assets/sounds/good.mp3";
import badSound from "./../../assets/sounds/bad.mp3";
import { SoundButtons } from "./SuondButtons";
import { BigAudioButton, ShowWinnerImage } from "./ListenButtonArea";
import { ButtonOpt, ButtonOptArrow } from "./ButtonOpt";

export const shuffle = <T,>(array: T[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const AudioChallehgeGame = () => {
  const [words, setWords] = useState<ResponseData[]>([]);
  const [indexWinnerWord, setIndexWinnerWord] = useState<number>(0);
  const [winnerWord, setWinnerWord] = useState<ResponseData | null>(null);
  const [isModalCondition, setIsModalCondition] = useState(false);
  const [isWinnerImage, setIsWinnerImage] = useState(false);
  const [buttonOpt, setButtonOpt] = useState(false);
  const [wordsForGame, setWordsForGame] = useState<ResponseData[]>([]);
  const [isHandleSound, setIsHandleSound] = useState([badSound, goodSound]);
  useEffect(() => {
    if (winnerWord) {
      const wordsWithoutWinner = words.filter(
        (word) => word.id !== winnerWord?.id
      );
      const newWordsForGame = shuffle(
        shuffle(wordsWithoutWinner).slice(0, 4).concat(winnerWord)
      );
      setWordsForGame(newWordsForGame);
    }
  }, [winnerWord, words]);

  useEffect(() => {
    getArrayWords(group).then((a) => setWords(a.data));
  }, []);

  useEffect(() => {
    if (words) setWinnerWord(words[indexWinnerWord]);
  }, [indexWinnerWord, words]);
  
  const sound = words.length
  ? new Audio(__baseUrl__ + `${words[indexWinnerWord].audio}`)
  : null;
  useEffect(() => {
    sound?.play();
  }, [words, indexWinnerWord]);

  const navigate = useNavigate();
  const location = useLocation();
  const group = location.pathname.split("/").at(-1);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height={"100%"}
      sx={{ background: `url(${background})`, backgroundSize: "cover" }}
    >
      {isModalCondition ? (
        <AudioChallengeModal/>
      ) : (
        false
      )}
      <Grid
        item
        xs={10}
        sm={8}
        md={7}
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ border: "solid 1px #1976D2", p: 2, borderRadius: 2 }}
      >
        <Grid container justifyContent="space-between">
          <Grid item>
            <ArrowBack
              fontSize="large"
              onClick={() => navigate(-1)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "#e14e30f0",
                },
              }}
            />
          </Grid>
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent={"space-around"}
          ></Grid>
          <Grid item>
            <SoundButtons
              badSound={badSound}
              goodSound={goodSound}
              setIsHandleSound={setIsHandleSound}
              isHandleSound={isHandleSound}
            />
          </Grid>
        </Grid>
        {isWinnerImage ? (
          <ShowWinnerImage
            words={words}
            indexWinnerWord={indexWinnerWord}
            sound={sound}
          />
        ) : (
          <BigAudioButton sound={sound} />
        )}

        <Grid
          item
          xs={11}
          sm={11}
          md={11}
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap="0.5rem"
        >
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            p=".3rem"
          >
            <AllWordTranslate
              words={wordsForGame}
              setIsWinnerImage={setIsWinnerImage}
              setButtonOpt={setButtonOpt}
              winnerWord={winnerWord}
              isHandleSound={isHandleSound}
              // answerWord={answerWord}
            />
          </Grid>
          {buttonOpt ? (
            <ButtonOptArrow
              setIndexWinnerWord={setIndexWinnerWord}
              setIsWinnerImage={setIsWinnerImage}
              setButtonOpt={setButtonOpt}
              indexWinnerWord={indexWinnerWord}
              setIsModalCondition={setIsModalCondition}
            />
          ) : (
            <ButtonOpt
              setIsWinnerImage={setIsWinnerImage}
              setButtonOpt={setButtonOpt}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
