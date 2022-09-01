import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { CardTextbook } from "../cards/CardTextbook"
import { axiosApiInstance, __baseUrl__ } from "../constant"
import { alfaBackground } from "../textbook/alfaBackground"
import { Word } from "../textbook/Textbook"
import { User, useUser } from "../UserProvider"

export type WordUser = {
  difficulty: string
  id: string
  optional: { isDifficult?: boolean, isLearned?: boolean }
  wordId: string
}
export const getUserWords = async (userId: string) => {
  const response =  await axiosApiInstance.get<WordUser[]>(`${__baseUrl__}users/${userId}/words `)
  return response.data
}

const getWordsFromUserId = async (id: string) => {
  const result = await axiosApiInstance.get<Word>(`${__baseUrl__}words/${id}`)
  return result.data
}

const deleteWordFromHard = async (
  userId: User["id"],
  wordId: string
) => {
  const result = await axiosApiInstance.delete(
    `${__baseUrl__}users/${userId}/words/${wordId}`
  );
  return result.data;
};

export const Dictionary = () => {
  const [user] = useUser()
  const [wordsId, setWordsId] = useState<WordUser[]>([])
  const [wordsFromUserId, setWordsFromUserId] = useState<Word[]>([])

  const handleDeleteDifficult = async (cardId: string) => {
    if (user) {
      await deleteWordFromHard(user.id, cardId)
      setWordsId((wordsId) => wordsId?.filter(card => card.wordId !== cardId))
    }
  }

  useEffect(() => {
    if (user) {
      getUserWords(user.id).then(setWordsId)
    }
  }, [user])

  useEffect(() => {
    Promise.all(wordsId.map((i) => getWordsFromUserId(i.wordId))).then(e => e.reverse()).then(setWordsFromUserId)
  }, [wordsId])
  return (
    <Grid
      justifyContent="center"
      container
      sx={{ background: alfaBackground(0.3, '1') }
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
          Сложные слова
        </Grid>
        <Grid container gap={1} justifyContent="center">
          {wordsFromUserId.map((card) => (
            <CardTextbook key={card.id} card={card} isDifficult={true} handleDeleteDifficult={handleDeleteDifficult}/>
          ))}
        </Grid>
        <Grid item md={10} justifyContent="center" sx={{ pb: 2 }}>
          <Grid item>Аудиовызов</Grid>
          <Grid item>Спринт</Grid>
        </Grid>
      </Grid>
    </Grid >
  )
}
