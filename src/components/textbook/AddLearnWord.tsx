import { Button, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { axiosApiInstance, __baseUrl__ } from "../constant"
import withAuth from "../WithAuth"
import { useUser, User } from '../UserProvider'

const data = (difficulty: string) => {
  const obj = {
    difficulty: difficulty,
    optional: {
      foo: 100
    }
  }
  return obj
}


const addWord = async (difficulty: string, userId: User["id"]) => {
  await axiosApiInstance.post(`${__baseUrl__}users/${userId}/words/5e9f5ee35eb9e72bc21af722`, data(difficulty))
}

export const AddLearnWord = withAuth(() => {
  const [user] = useUser() as [User, unknown]
  const [difficulty, setDifficulty] = useState<string>('')
  const location = useLocation() ? useLocation().pathname.split('/').at(-1) : ''
  if (location) useEffect(() => { setDifficulty(location) }, [])
  return (
    <Grid container position={'absolute'} bottom='5px' flexWrap='nowrap' justifyContent="center" gap={1} >
      <Button sx={{ background: '#e97719', fontSize: '10px' }} variant="contained" onClick={() => addWord(difficulty, user.id)}> В сложные слова</Button>
      <Button sx={{ background: '#e97719', fontSize: '10px' }} variant="contained"> Удалить слово</Button>
    </Grid >
  )
})
