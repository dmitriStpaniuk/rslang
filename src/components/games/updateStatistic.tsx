import { axiosApiInstance, __baseUrl__ } from "../constant";
import { getUserWords, WordUser } from "../dictionary/Dictionary";
import {
  addUserWord,
  learnedWordFactory,
  unlearnWordFactory,
} from "../textbook/Textbook";
import { User } from "../UserProvider";
import { ResponseData } from "./sprint/SprintGame";

type StatisticWinnerWord = {
  id: string;
  wins: number;
};

type WinrateEnty = {
  date: string;
  audioCorrect: number;
  audioIncorrect: number;
  sprintCorrect: number;
  sprintIncorrect: number;
  sprintLongestSeries: number;
  audioLongestSeries: number;
};

export type Stat = {
  id?: string;
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

export const getStatistic = async (user: User | null) => {
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
  user: User
) => {
  const dt = new Date();

  const currentDate =
    dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

  const winnersId = correctAnswerWords.map((word) => word.id);
  const losersId = unCorrectAnswerWords.map((word) => word.id);

  const losersAudioId =
    nameGame === "audio" ? unCorrectAnswerWords.map((word) => word.id) : [];
  const losersSprintId =
    nameGame === "sprint" ? unCorrectAnswerWords.map((word) => word.id) : [];
  const winnersAudioId =
    nameGame === "audio" ? correctAnswerWords.map((word) => word.id) : [];
  const winnersSprintId =
    nameGame === "sprint" ? correctAnswerWords.map((word) => word.id) : [];

  const sprintLongestSeries = nameGame === "sprint" ? longestSeriesInGame : 0;
  const audioLongestSeries = nameGame === "audio" ? longestSeriesInGame : 0;

  const statistics = await getStatistic(user);

  const currentWinnerWord = winnersId.map((id) => {
    const statWord = statistics?.optional[nameGame].winnerWords.find(
      (winnerWord) => winnerWord.id === id
    );
    return statWord
      ? { ...statWord, wins: statWord?.wins + 1 }
      : { id: id, wins: 1 };
  });

  const url = document.location.pathname;
  const lewelDiff = url.split("/").at(-1) as string;

  const arrSprintAudio = statistics?.optional.audio.winnerWords.concat(
    statistics?.optional.sprint.winnerWords
  );

  const userWords = await getUserWords(user.id);

  const losersPromises = losersAudioId
    .concat(losersSprintId)
    .map((id) => addUserWord(lewelDiff, user.id, id, unlearnWordFactory));

  arrSprintAudio
    .filter((word) => word.wins === 3)
    .forEach((objWinId) => {
      if (user)
        addUserWord(lewelDiff, user?.id, objWinId.id, learnedWordFactory);
    });

  const newWinnerWords =
    statistics?.optional[nameGame].winnerWords
      .filter((winnerWord) => {
        return !winnersId.includes(winnerWord.id);
      })
      .concat(currentWinnerWord)
      .filter(({ id }) => !losersId.includes(id)) || [];

  const existedHistoryEntry = statistics?.optional.winrateHistory.data.find(
    (entry) => entry.date === currentDate
  );

  const learnedWords = userWords.filter(
    (word) => word.optional.isLearned
  ).length;
console.log(userWords)

  const newHistoryEntry = existedHistoryEntry
    ? {
        ...existedHistoryEntry,
        audioCorrect: existedHistoryEntry.audioCorrect + winnersAudioId.length,
        audioIncorrect:
          existedHistoryEntry.audioIncorrect + losersAudioId.length,
        sprintCorrect:
          existedHistoryEntry.sprintCorrect + losersSprintId.length,
        sprintIncorrect:
          existedHistoryEntry.sprintIncorrect + losersSprintId.length,
        audioLongestSeries: Math.max(
          existedHistoryEntry.audioLongestSeries,
          audioLongestSeries
        ),
        sprintLongestSeries: Math.max(
          existedHistoryEntry.sprintLongestSeries,
          sprintLongestSeries
        ),
      }
    : {
        date: currentDate,
        audioCorrect: winnersAudioId.length,
        audioIncorrect: losersAudioId.length,
        sprintCorrect: winnersSprintId.length,
        sprintIncorrect: losersSprintId.length,
        sprintLongestSeries: sprintLongestSeries,
        audioLongestSeries: audioLongestSeries,
      };

  const newHistory =
    statistics?.optional.winrateHistory.data
      .filter((entry) => entry.date !== currentDate)
      .concat(newHistoryEntry) || [];

  let newOptions: Stat = {
    ...statistics,
    learnedWords: learnedWords,

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
  delete newOptions.id;

  await axiosApiInstance.put(
    __baseUrl__ + "users/" + user?.id + "/statistics",
    newOptions
  );
  await Promise.all(losersPromises);
};
