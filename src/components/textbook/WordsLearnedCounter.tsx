import { Avatar, Chip } from "@mui/material"
import { Stack } from "@mui/system"
import withAuth from "../WithAuth"

export const WordsLearnedCounter = withAuth(() => {
  return (
    <Stack direction="row" spacing={1} sx={{p:1}}>
      <Chip sx={{fontSize:10, background:'green', color:'white'}} avatar={<Avatar>0</Avatar>} label="+" />
      <Chip sx={{fontSize:10, background:'#c87b7b', color:'white'}} avatar={<Avatar>0</Avatar>} label="-" />
    </Stack>
  )
}
)