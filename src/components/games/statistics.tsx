/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { axiosApiInstance, __baseUrl__ } from "../constant";
import { useUser } from "../UserProvider";
import { ResponseData } from "./sprint/SprintGame";
type Stat = {
  learnedWords: number;
  optional: {
      sprint: {
          winnerWords: {
              id: string;
              wins: number;
          }[];
      };
      audio: {
          winnerWords: {
              id: string;
              wins: number;
          }[];
      };
  };
}
export const Statistics = (
  correctAnswerWords: ResponseData[],
  unCorrectAnswerWords: ResponseData[],
  longestSeriesInGame: number,
  nameGame: "sprint" | "audio"
) => {
  const [user, setUser] = useUser();
  const [getData, setGetData] = useState<Stat>();

  const winnersId = correctAnswerWords.map((word) => word.id);
  const losersId = unCorrectAnswerWords.map((word) => word.id);

  const stat = async () => {
    const response = await axiosApiInstance.get(
      __baseUrl__ + `users/${user?.id}/statistics`
    );
    setGetData(response.data);
  };
  useEffect(() => {
    stat()
  }, [user]);

  const currentWinnerWord = winnersId.map((id) => {
    const statWord = getData?.optional[nameGame].winnerWords.find(
      (winnerWord) => winnerWord.id === id
    );

    return statWord
      ? { ...statWord, wins: statWord?.wins + 1 }
      : { id: id, wins: 1 };
  });

  const newWinnerWords = getData?.optional[nameGame].winnerWords
    .filter((winnerWord) => {
      !winnersId.includes(winnerWord.id);
    })
    .concat(currentWinnerWord)
    .filter(({ id }) => !losersId.includes(id));

  const newOptions = {
    ...getData,
    optional: {
      ...getData?.optional,
      [nameGame]: {
        ...getData?.optional[nameGame],
        winnerWords: newWinnerWords,
      },
    },
  };

  // console.log(newOptions)
};
