import { TramOutlined } from "@mui/icons-material"
import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { CardTextbook } from "../cards/CardTextbook"
import { axiosApiInstance, __baseUrl__ } from "../constant"
import { alfaBackground } from "../textbook/alfaBackground"
import { Word } from "../textbook/Textbook"
import { useUser } from "../UserProvider"

export type WordUser = {
  difficulty: string
  id: string
  optional: { isDifficult: boolean }
  wordId: string
}
export const getUserWords = async (userId: string) => {
    return await axiosApiInstance.get(`${__baseUrl__}users/${userId}/words `)
}

const getWordsFromUserId = async (id: string) => {
    const result =  await axiosApiInstance.get<Word>(`${__baseUrl__}words/${id}`)
    return result.data
}

export const Dictionary = () => {
  const [user] = useUser()
  const [wordsId, setWordsId] = useState<WordUser[]>([])
  const [wordsFromUserId, setWordsFromUserId] = useState<Word[]>([])
  
  useEffect(() => {
    if (user) {
      getUserWords(user.id).then((e) => { if (e) setWordsId(e.data) })
    }
  }, [user])

  useEffect(() => {
    Promise.all(wordsId.map((i) => getWordsFromUserId(i.wordId))).then(setWordsFromUserId)
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
            <CardTextbook key={card.id} card={card} isDifficult={true}/>
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
