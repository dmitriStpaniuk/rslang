import { Button, Grid } from "@mui/material"
import { axiosApiInstance, __baseUrl__ } from "../constant"
import withAuth from "../WithAuth"
import { useUser, User } from '../UserProvider'


// const deleteWord = async (userId: User["id"], cardId: string) => {
//   await axiosApiInstance.delete(`${__baseUrl__}users/${userId}/words/${cardId}`)
// }

type AddLearnWordProps = {
  cardId: string
  handleAddDifficult: (cardId:string)=>void
}

export const AddLearnWord = withAuth(({ cardId, handleAddDifficult }: AddLearnWordProps) => {
  const [user] = useUser() as [User, unknown]
  
  return (
    <Grid container position={'absolute'} bottom='5px' flexWrap='nowrap' justifyContent="center" gap={1} >
      <Button sx={{ background: '#e97719', fontSize: '10px' }} variant="contained" onClick={() => handleAddDifficult(cardId)}> В сложные слова</Button>
      {/* <Button sx={{ background: '#e97719', fontSize: '10px' }} variant="contained" onClick={()=> deleteWord(user.id, cardId)}> Удалить слово</Button> */}
    </Grid >
  )
})
