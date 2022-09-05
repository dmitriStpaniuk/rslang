import { Avatar, Chip } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { getStatistic, Stat } from "../games/updateStatistic";
import { useUser } from "../UserProvider";
import withAuth from "../WithAuth";

type CardId = {
  cardId: string;
};
export const WordsLearnedCounter = withAuth(({ cardId }: CardId) => {
  const [user] = useUser();
  const [allUserWords, setAllUserWords] = useState<Stat>();
  useEffect(() => {
    if (user) {
      getStatistic(user).then(setAllUserWords);
    }
  }, []);

  const label = allUserWords
    ? allUserWords.optional.audio.winnerWords
        .concat(allUserWords.optional.sprint.winnerWords)
        .filter((obj) => obj.id === cardId).reduce((acc, obj)=> acc + obj.wins ,0)
    : 0;

  return (
    <Stack direction="row" spacing={1} sx={{ p: 1 }}>
      <Chip
        sx={{ fontSize: 10, background: "green", color: "white" }}
        avatar={<Avatar>{label}</Avatar>}
        label="+"
      />
      {/* <Chip
        sx={{ fontSize: 10, background: "#c87b7b", color: "white" }}
        avatar={<Avatar>?</Avatar>}
        label="-"
      /> */}
    </Stack>
  );
});
