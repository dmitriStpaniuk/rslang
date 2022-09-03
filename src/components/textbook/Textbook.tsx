import { Button, Grid, Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { axiosApiInstance, difficulty, __baseUrl__ } from "../constant";
import { Stack } from "@mui/system";
import { CardTextbook } from "../cards/CardTextbook";
import { alfaBackground } from "./alfaBackground";
import { User, useUser } from "../UserProvider";
import { getUserWords, WordUser } from "../dictionary/Dictionary";
import { SaidMenuDifficultLevel } from "./SaidMenuDifficultLevel";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { Link as RouterLink } from "react-router-dom";
import { Footer } from "../Footer";

export type Word = {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
  isDifficult?: boolean;
  isLearned?: boolean;
};

const difficultWordFactory = (difficulty: string) => {
  const obj = {
    difficulty: difficulty,
    optional: {
      isDifficult: true,
    },
  };
  return obj;
};

type DifficultWordFactory = typeof difficultWordFactory;

export const learnedWordFactory = (difficulty: string) => {
  const obj = {
    difficulty: difficulty,
    optional: {
      isLearned: true,
    },
  };
  return obj;
};

type LearnedWordFactory = typeof learnedWordFactory;

const addUserWord = async (
  difficulty: string,
  userId: User["id"],
  cardId: string,
  factory: DifficultWordFactory | LearnedWordFactory
) => {
  const allUserWords = await getUserWords(userId);
  const currentWord = allUserWords.find((word) => word.wordId === cardId);
  const method = currentWord ? "put" : "post";
  const result = await axiosApiInstance[method]<WordUser>(
    `${__baseUrl__}users/${userId}/words/${cardId}`,
    factory(difficulty)
  );

  return result.data;
};

const responseNonAotorization = async (group: number, page: number) => {
  return await axios.get(__baseUrl__ + `words?page=${page - 1}&group=${group}`);
};

const titlePages = (numberGroup: string | undefined) => {
  if (numberGroup) return difficulty[+numberGroup - 1].title;
};

export const Textbook = () => {
  const [cards, setCards] = useState<Word[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [difficultWords, setDifficultWords] = useState<WordUser[]>([]);
  const [learnedWords, setLearnedWords] = useState<WordUser[]>([]);
  const [user] = useUser();
  const location = useLocation();
  const lewelDiff = location.pathname.split("/").at(-1);
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    if (user) {
      getUserWords(user.id).then((words) => {
        const difficultWords = words.filter(
          (word) => word.optional.isDifficult
        );
        const learnedWords = words.filter((word) => word.optional.isLearned);
        setDifficultWords(difficultWords);
        setLearnedWords(learnedWords);
      });
    }
  }, [user, page, lewelDiff]);

  useEffect(() => {
    if (lewelDiff)
      responseNonAotorization(+lewelDiff - 1, +page).then((e) =>
        setCards(e.data)
      );
  }, [page, lewelDiff]);

  useEffect(() => {
    if (difficultWords) {
      setCards((cards) => {
        const cardsWithDifficult = cards.map((card) => {
          return difficultWords.find((i) => i.wordId === card.id)
            ? { ...card, isDifficult: true, isLearned: false }
            : { ...card, isDifficult: false };
        });
        return cardsWithDifficult;
      });
    }
  }, [difficultWords]);

  useEffect(() => {
    if (learnedWords) {
      setCards((cards) => {
        const cardsWithLearned = cards.map((card) => {
          return learnedWords.find((i) => i.wordId === card.id)
            ? { ...card, isLearned: true, isDifficult: false }
            : { ...card, isLearned: false };
        });
        return cardsWithLearned;
      });
    }
  }, [learnedWords]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: String(value) });
  };

  const handleAddDifficult = async (cardId: string) => {
    if (lewelDiff && user) {
      const newDifficultWord = await addUserWord(
        lewelDiff,
        user.id,
        cardId,
        difficultWordFactory
      );
      setLearnedWords((learnWords) =>
        learnWords?.filter((card) => card.wordId !== cardId)
      );
      setDifficultWords((difficultWords) =>
        difficultWords?.concat(newDifficultWord)
      );
    }
  };

  const isPageDifficult = cards.every(
    (word) => word.isDifficult || word.isLearned
  );

  const learnWordsPageBackground = isPageDifficult
    ? alfaBackground(0.3, "7")
    : alfaBackground(0.3, lewelDiff);
  const isGameButtonDisabled = isPageDifficult;

  const handleDeleteDifficult = async (cardId: string) => {
    if (user) {
      await axiosApiInstance.delete(
        __baseUrl__ + `users/${user.id}/words/${cardId}`
      );
      setDifficultWords((difficultWords) =>
        difficultWords?.filter((card) => card.wordId !== cardId)
      );
    }
  };

  const handleLearnWord = async (cardId: string) => {
    if (user && lewelDiff) {
      setDifficultWords((difficultWords) =>
        difficultWords?.filter((card) => card.wordId !== cardId)
      );
      const newLearnedWord = await addUserWord(
        lewelDiff,
        user.id,
        cardId,
        learnedWordFactory
      );
      setLearnedWords((learnedWords) => learnedWords?.concat(newLearnedWord));
    }
  };

  return (
    <Grid
      justifyContent="center"
      container
      sx={{ background: learnWordsPageBackground }}
    >
      <Grid
        container
        alignItems="center"
        flexDirection="column"
        flexWrap="nowrap"
        sx={{ maxWidth: "1900px" }}
      >
        <SaidMenuDifficultLevel />
        <Grid
          item
          fontSize={30}
          sx={{
            p: 4,
            textAlign: "center",
            fontSize: {
              lg: "2rem",
              md: "2rem",
              sm: "1.3rem",
              xs: "1rem",
            },
          }}
        >
          Данные слова '{titlePages(lewelDiff)}' сложности
        </Grid>
        <Grid item>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Pagination
              size="small"
              count={30}
              page={+page}
              variant="outlined"
              color="primary"
              onChange={handleChange}
            />
          </Stack>
        </Grid>
        <Grid container gap={1} justifyContent="center">
          {cards.map((card) => {
            return (
              <CardTextbook
                key={card.word}
                card={card}
                lewelDiff={lewelDiff}
                isDifficult={card.isDifficult}
                isLearned={card.isLearned}
                handleAddDifficult={handleAddDifficult}
                handleDeleteDifficult={handleDeleteDifficult}
                handleLearnWord={handleLearnWord}
              />
            );
          })}
        </Grid>
        <Grid
          item
          md={10}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ pt: 2, pb: 1 }}
        >
          <Stack spacing={2}>
            <Pagination
              size="small"
              count={30}
              page={+page}
              variant="outlined"
              color="primary"
              onChange={handleChange}
            />
          </Stack>
        </Grid>
        <Grid item md={10} justifyContent="center" sx={{ pb: 2, mt: 1 }}>
          <Button
            component={RouterLink}
            to={`/sprint/level/${lewelDiff}?page=${page || 1}`}
            disabled={isGameButtonDisabled}
            sx={{ mr: 1, textDecoration: "none" }}
            variant="contained"
            startIcon={<AgricultureIcon />}
          >
            Sprint
          </Button>

          <Button
            component={RouterLink}
            to={`/audio/level/${lewelDiff}?page=${page || 1}`}
            disabled={isGameButtonDisabled}
            sx={{ textDecoration: "none" }}
            variant="contained"
            startIcon={<HeadphonesIcon />}
          >
            Audio challenge
          </Button>
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  );
};
