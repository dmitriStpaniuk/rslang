import { Button } from "@mui/material"
import withAuth from "../WithAuth"
type LearnedWordButtonProps = {
  cardId: string,
  handleLearnWord: (cardId: string) => void
}
export const LearnedWordButton = withAuth(({ cardId, handleLearnWord }: LearnedWordButtonProps) => {
  return (
    <Button
      sx={{ background: '#245b0c', fontSize: '10px', position: 'absolute', right: 2, top: 2, borderRadius: '10px' }}
      variant="contained"
      onClick={() => handleLearnWord(cardId)}
    >
      Выученное
    </Button>
  )
}
)
