import { Button, Grid } from "@mui/material"
import withAuth from "../WithAuth"

type AddLearnWordProps = {
  cardId: string
  handleAddDifficult: (cardId: string) => void
  handleDeleteDifficult: (cardId: string) => void
}

export const AddLearnWord = withAuth(({ cardId, handleAddDifficult, handleDeleteDifficult }: AddLearnWordProps) => {
  return (
    <Grid container position={'absolute'} bottom='5px' flexWrap='nowrap' justifyContent="center" gap={1} >
      <Button sx={{ background: '#e97719', fontSize: '10px' }} variant="contained" onClick={() => handleAddDifficult(cardId)}> В сложные слова</Button>
      <Button sx={{ background: '#e97719', fontSize: '10px' }} variant="contained" onClick={() => handleDeleteDifficult(cardId)}> Удалить слово</Button>
    </Grid >
  )
})
