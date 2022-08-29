import { Grid, Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { axiosApiInstance, difficulty, __baseUrl__ } from "../constant";
import { Stack } from "@mui/system";
import { CardTextbook } from "../cards/CardTextbook";
import { alfaBackground } from "./alfaBackground";
import { User, useUser } from "../UserProvider";
import { getUserWords, WordUser } from "../dictionary/Dictionary";

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
  isDifficult?: boolean
};

const data = (difficulty: string) => {
  const obj = {
    difficulty: difficulty,
    optional: {
      isDifficult: false
    }
  }
  return obj
}

const addWord = async (difficulty: string, userId: User["id"], cardId: string) => {
  const result = await axiosApiInstance.post<WordUser>(`${__baseUrl__}users/${userId}/words/${cardId}`, data(difficulty))
  return result.data
}

const deleteWord = async (userId: User["id"], wordId: string) => {
  const result = await axiosApiInstance.delete(`${__baseUrl__}users/${userId}/words/${wordId}`)
  return result.data
}

const responseNonAotorization = async (
  group: number,
  page: number
) => {
  return await axios.get(__baseUrl__ + `words?page=${page - 1}&group=${group}`);
};

const titlePages = (numberGroup: string | undefined) => {
  if (numberGroup) return difficulty[+numberGroup - 1].title;
};

export const Textbook = () => {
  const [cards, setCards] = useState<Word[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [difficultWords, setDifficultWords] = useState<WordUser[]>([])
  const [user] = useUser()

  const location = useLocation();
  const lewelDiff = location.pathname.split("/").at(-1);
  const page = searchParams.get('page') || '1';

  useEffect(() => {
    if (user) {
      getUserWords(user.id).then((e) => { if (e) setDifficultWords(e.data) })
    }
  }, [user])

  useEffect(() => {
    if (lewelDiff)
      responseNonAotorization(+lewelDiff - 1, +page).then((e) =>
        setCards(e.data)
      );
  }, [page]);

  useEffect(() => {
    if (difficultWords) {
      setCards((cards) => {
        const cardsWithDifficult = cards.map(card => {
          return difficultWords.find(i => i.wordId === card.id) ? { ...card, isDifficult: true } : {...card, isDifficult: false}
        })
        return cardsWithDifficult
      })
    }
  }, [difficultWords])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: String(value) })
  };

  const handleAddDifficult = async (cardId: string) => {
    if (lewelDiff && user) {
      const newDifficultWord = await addWord(lewelDiff, user.id, cardId)
      setDifficultWords((difficultWords) => difficultWords?.concat(newDifficultWord))
    }
  }
  const handleDeleteDifficult = async (cardId: string) => {
    if (user) {
      await deleteWord(user.id, cardId)
      setDifficultWords((difficultWords) => difficultWords?.filter(card => card.wordId !== cardId))
    }
  }

  return (
    <Grid
      justifyContent="center"
      container
      sx={{ background: alfaBackground(0.3, lewelDiff) }
      }
    >
      <Grid
        container
        alignItems="center"
        flexDirection="column"
        flexWrap="nowrap"
        sx={{ maxWidth: "1900px" }}
      >
        <Grid item fontSize={30} sx={{
          p: 4, textAlign: 'center', fontSize: {
            lg: '2rem',
            md: '2rem',
            sm: '1.3rem',
            xs: '1rem'
          }
        }}>
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

            return <CardTextbook key={card.word}
              card={card}
              lewelDiff={lewelDiff}
              isDifficult={card.isDifficult}
              handleAddDifficult={handleAddDifficult}
              handleDeleteDifficult={handleDeleteDifficult} />
          }
          )}
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
        <Grid item md={10} justifyContent="center" sx={{ pb: 2 }}>
          <Grid item>Аудиовызов</Grid>
          <Grid item>Спринт</Grid>
        </Grid>
      </Grid>
    </Grid >
  );
};

