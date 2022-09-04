import { ArrowBack } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { __baseUrl__ } from "../../constant";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import background from "./../../assets/img/white-abstract-background.png";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SprintModal } from "./SprintModal";
import { getArrayWords, randomPage, randomTranslate, Timer } from "./Sprint";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useSound from "use-sound";
import goodSound from "./../../assets/sounds/good.mp3";
import badSound from "./../../assets/sounds/bad.mp3";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export type ResponseData = {
  id: string;
  group?: number;
  page?: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning?: string;
  audioExample?: string;
  textMeaning?: string;
  textExample?: string;
  transcription?: string;
  textExampleTranslate?: string;
  textMeaningTranslate?: string;
  wordTranslate: string;
};

export const SprintGame = () => {
  const [index, setIndex] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [words, setWords] = useState<ResponseData[]>([]);
  const [modal, setModal] = useState(false);
  const [playGood] = useSound(goodSound);
  const [playBad] = useSound(badSound);
  const [points, setPoints] = useState<number>(0);
  const [series, setSeries] = useState(0);
  const [correctAnswerWordsInSprint, setCorrectAnswerWordsInSprint] = useState<
    ResponseData[]
  >([]);
  const [unCorrectAnswerWordsInSprint, setUnCorrectAnswerWordsInSprint] =
    useState<ResponseData[]>([]);
  const [longSeries, setLongSeries] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const page = searchParams.get("page");
  useEffect(() => {
    if (!searchParams.get("page")) setSearchParams({ page: String(randomPage()) });
  }, []);

  const group = String(Number(location.pathname.split("/").at(-1)) - 1);
  useEffect(() => {
    if (page) {
      getArrayWords(group, page as string)
        .then((a) => setWords(a.data))
        .then(() => setIndex(0));
    }
  }, [page, group]);

  const biggestPoints = () => {
    let x = 10;
    if (points === 2) x = 20;
    if (points >= 3) x = 30;
    return x;
  };

  function BasicRating() {
    return (
      <Box>
        <Typography component="legend">+ {biggestPoints()} points</Typography>
        <Rating name="read-only" value={points} readOnly max={3} />
      </Box>
    );
  }
  let navigate = useNavigate();
  // console.log(location)
  const translateWordInCard = words[randomTranslate(index)]?.wordTranslate;
  const comparison = () => {
    return words[index]?.wordTranslate === translateWordInCard;
  };
  const trueWords = () => {
    comparison() ? right() : wrong();
    newWord();
  };
  const falseWords = () => {
    !comparison() ? right() : wrong();
    newWord();
  };
  const newWord = () => {
   if (page) {
    index < 19
    ? setIndex((index) => index + 1)
    : setSearchParams({ page: String(+page === 30 ? 1: +page + 1) });
   }
  };
  const right = () => {
    setCorrectAnswerWordsInSprint([
      ...correctAnswerWordsInSprint,
      words[index],
    ]);
    playGood();
    setCounter(counter + biggestPoints());
    setPoints(points + 1);
    setSeries(series + 1);
  };
  const wrong = () => {
    setUnCorrectAnswerWordsInSprint([
      ...unCorrectAnswerWordsInSprint,
      words[index],
    ]);
    playBad();
    setPoints(0);
    setLongSeries([...longSeries, series]);
    setSeries(0);
  };

  setTimeout(() => {
    setModal(true);
  }, 60000);
  const wordAudio = words.length
    ? new Audio(__baseUrl__ + `${words[index].audio}`)
    : null;
  const meaningAudio = words.length
    ? new Audio(`${__baseUrl__ + words[index].audioMeaning}`)
    : null;

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height={"calc(100vh - 65px)"}
      sx={{ background: `url(${background})` }}
    >
      <Grid
        item
        xs={10}
        sm={8}
        md={6}
        sx={{ border: "solid 1px #1976D2", p: 5, borderRadius: 2 }}
      >
        {modal ? (
          <SprintModal
            count={counter}
            correctAnswerWords={correctAnswerWordsInSprint}
            unCorrectAnswerWords={unCorrectAnswerWordsInSprint}
            longSeries={longSeries}
          />
        ) : (
          false
        )}
        <Grid
          container
          justifyContent="space-between"
          alignItems={"center"}
          mb="1rem"
          sx={{ flexWrap: "no-wrap" }}
        >
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
            fontSize="calc(0.7rem + 2.5vw)"
            color="#1976D2"
            fontWeight="600"
          >
            {counter}
          </Grid>
          <Grid item>
            <Timer />
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"} color="#1976D2" gap={3}>
          <BasicRating />
        </Grid>
        <Grid container justifyContent={"center"} gap={3}>
          <Grid
            item
            xs={5}
            sm={5}
            md={5}
            display="flex"
            alignItems="center"
            justifyContent={"space-around"}
          >
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={() => {
                wordAudio?.play();
              }}
            >
              <PlayCircleOutlineIcon
                sx={{
                  color: "#e14e30f0",
                  width: "calc(1.5rem + 1.5vw)",
                  height: "calc(1.5rem + 1.5vw)",
                }}
              />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={() => {
                meaningAudio?.play();
              }}
            >
              <VolumeMuteIcon
                sx={{
                  color: "#e14e30f0",
                  width: "calc(1.5rem + 1.5vw)",
                  height: "calc(1.5rem + 1.5vw)",
                }}
              />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={7}
            sm={7}
            md={7}
            display="flex"
            justifyContent="center"
            flexWrap="nowrap"
            gap="0.5rem"
          >
            <Button
              variant="contained"
              onClick={() => falseWords()}
              sx={{
                width: "90%",
                bgcolor: "#e14e30f0",
                minWidth: "auto",
                "&:hover": {
                  bgcolor: "red",
                },
              }}
            >
              <CloseIcon />
            </Button>
            <Button
              variant="contained"
              onClick={() => trueWords()}
              sx={{
                width: "90%",
                bgcolor: "#058c92c4",
                minWidth: "auto",
                "&:hover": {
                  bgcolor: "#056c94c4",
                },
              }}
            >
              <CheckIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
          mt="1rem"
          color="wheat"
          sx={{
            height: "fit-content",
            backgroundColor: "#1976D2",
            borderRadius: "5px",
          }}
        >
          <Typography
            component={"span"}
            sx={{
              fontSize: "calc(0.5rem + 2vw)",
              textTransform: "uppercase",
            }}
          >
            {words[index]?.word}
          </Typography>
          <Typography
            component={"span"}
            sx={{
              fontSize: "calc(0.5rem + 0.7vw)",
              textTransform: "uppercase",
            }}
          >
            ===
          </Typography>
          <Typography
            component={"p"}
            sx={{
              fontSize: "calc(0.5rem + 1vw)",
              fontFamily: "cursive",
              textTransform: "uppercase",
            }}
          >
            {translateWordInCard}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
