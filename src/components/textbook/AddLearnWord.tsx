import { Button, Grid } from "@mui/material"
import withAuth from "../WithAuth"




export const AddLearnWord = withAuth(() => {
  return (
    <Grid container position={'absolute'} bottom='5px' flexWrap='nowrap' justifyContent="center" gap={1} >
      <Button sx={{ background: '#e97719', fontSize: '10px' }} variant="contained"> В сложные слова</Button>
      <Button sx={{ background: '#e97719', fontSize: '10px' }} variant="contained"> Удалить слово</Button>
    </Grid >
  )
})





