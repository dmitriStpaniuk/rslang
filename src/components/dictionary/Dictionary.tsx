import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CardTextbook } from "../cards/CardTextbook";
import { axiosApiInstance, __baseUrl__ } from "../constant";
import { Footer } from "../Footer";
import { alfaBackground } from "../textbook/alfaBackground";
import { Word } from "../textbook/Textbook";
import { User, useUser } from "../UserProvider";

export type WordUser = {
  difficulty: string;
  id: string;
  optional: { isDifficult?: boolean; isLearned?: boolean };
  wordId: string;
};
export const getUserWords = async (userId: string) => {
  const response = await axiosApiInstance.get<WordUser[]>(
    `${__baseUrl__}users/${userId}/words `
  );
  return response.data;
};

const getWordsFromUserId = async (id: string) => {
  const result = await axiosApiInstance.get<Word>(`${__baseUrl__}words/${id}`);
  return result.data;
};

const deleteWordFromHard = async (userId: User["id"], wordId: string) => {
  const result = await axiosApiInstance.delete(
    `${__baseUrl__}users/${userId}/words/${wordId}`
  );
  return result.data;
};

export const Dictionary = () => {
  const [user] = useUser();
  const [wordsId, setWordsId] = useState<WordUser[]>([]);
  const [wordsFromUserId, setWordsFromUserId] = useState<Word[]>([]);
  const [emptyPage, setEmptyPage] = useState<boolean>();
  const handleDeleteDifficult = async (cardId: string) => {
    if (user) {
      await deleteWordFromHard(user.id, cardId);
      setWordsId((wordsId) =>
        wordsId?.filter((card) => card.wordId !== cardId)
      );
    }
  };

  useEffect(() => {
    if (user) {
      getUserWords(user.id).then(setWordsId);
    }
  }, [user]);

  useEffect(() => {
    Promise.all(wordsId.map((i) => getWordsFromUserId(i.wordId)))
      .then((e) => e.reverse())
      .then(setWordsFromUserId);
  }, [wordsId]);
  useEffect(() => {
    wordsId.length === 0 ? setEmptyPage(true) : setEmptyPage(false);
  }, [wordsId]);
  const emptyPageMessage = emptyPage ? "flex" : "none";
  return (
    <Grid
      justifyContent="center"
      container
      sx={{
        background: alfaBackground(0.3, "1"),
      }}
    >
      <Grid
        container
        alignItems="center"
        flexDirection="column"
        flexWrap="nowrap"
        sx={{ maxWidth: "1900px", minHeight: "calc(100vh - 135px)" }}
      >
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
          Сложные слова
        </Grid>
        <Typography display={emptyPageMessage}>Данный раздел пуст</Typography>
        <Grid container gap={1} justifyContent="center">
          {wordsFromUserId.map((card) => (
            <CardTextbook
              key={card.id}
              card={card}
              isDifficult={true}
              handleDeleteDifficult={handleDeleteDifficult}
            />
          ))}
        </Grid>
        {/* <Grid
          position={"absolute"}
          sx={{ width: "100%", bottom: 0, background: "f9f9f9" }}
        > */}
        {/* </Grid> */}
      </Grid>
      <Footer />
    </Grid>
  );
};
