import { axiosApiInstance, __baseUrl__ } from "../constant";
import { User } from "../UserProvider";

import { ResponseData } from "./sprint/SprintGame";

type StatisticWinnerWord = {
  id: string;
  wins: number;
  date: string;
};

type WinrateEnty = {
  date: string;
  correct: number;
  incorrect: number;
  longestSeries: number;
};

export type Stat = {
  learnedWords: number;
  optional: {
    sprint: {
      winnerWords: StatisticWinnerWord[];
    };
    audio: {
      winnerWords: StatisticWinnerWord[];
    };
    winrateHistory: {
      data: WinrateEnty[];
    };
  };
};

const getStatistic = async (user: User | null) => {
  const response = await axiosApiInstance.get<Stat>(
    __baseUrl__ + `users/${user?.id}/statistics`
  );

  return response.data;
};

export const updateStatistic = async (
  correctAnswerWords: ResponseData[],
  unCorrectAnswerWords: ResponseData[],
  longestSeriesInGame: number,
  nameGame: "sprint" | "audio",
  user: User | null,
  // statistics: Stat
) => {
  const dt = new Date();

  const currentDate =
    dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

  const winnersId = correctAnswerWords.map((word) => word.id);
  const losersId = unCorrectAnswerWords.map((word) => word.id);

  const statistics = await getStatistic(user);
  

  const currentWinnerWord = winnersId.map((id) => {
    const statWord = statistics?.optional[nameGame].winnerWords.find(
      (winnerWord) => winnerWord.id === id
    );

    return statWord
      ? { ...statWord, wins: statWord?.wins + 1 }
      : { id: id, wins: 1, date: currentDate };
  });
  // console.log('currentWinnerWord' + currentWinnerWord)
  const newWinnerWords =
    statistics?.optional[nameGame].winnerWords
      .filter((winnerWord) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !winnersId.includes(winnerWord.id);
      })
      .concat(currentWinnerWord)
      .filter(({ id }) => !losersId.includes(id)) || [];

  const existedHistoryEntry = statistics?.optional.winrateHistory.data.find(
    (entry) => entry.date === currentDate
  );

  const newHistoryEntry = existedHistoryEntry
    ? {
        ...existedHistoryEntry,
        correct: existedHistoryEntry.correct + winnersId.length,
        incorrect: existedHistoryEntry.correct + losersId.length,
        longestSeries: Math.max(
          existedHistoryEntry.longestSeries,
          longestSeriesInGame
        ),
      }
    : {
        date: currentDate,
        correct: winnersId.length,
        incorrect: losersId.length,
        longestSeries: longestSeriesInGame,
      };
  const newHistory =
    statistics?.optional.winrateHistory.data
      .filter((entry) => entry.date !== currentDate)
      .concat(newHistoryEntry) || [];
  const newOptions: Stat = {
    ...statistics,
    optional: {
      ...statistics?.optional,
      [nameGame]: {
        ...statistics?.optional[nameGame],
        winnerWords: newWinnerWords,
      },
      winrateHistory: {
        data: newHistory,
      },
    },
  };

  // console.log('newHistory ' + newHistory);
  // console.log('newOptions' + newOptions);
};
