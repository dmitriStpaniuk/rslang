import {
  alpha,
  CardMedia,
  Grid,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { difficulty, __baseUrl__ } from "../constant";
import { Stack } from "@mui/system";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import StopIcon from "@mui/icons-material/Stop";
import { AddLearnWord } from "./AddLearnWord";

type Word = {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
};

const ColorBacground = [
  "#F7B68E",
  "#253CA2",
  "#C62D3E",
  "#BF7E46",
  "#39ABB8",
  "#7E368E",
];

const responseNonAotorization = async (
  group: number | undefined,
  page: number | undefined
) => {
  return await axios.get(__baseUrl__ + `words?page=${page}&group=${group}`);
};

const titlePages = (numberGroup: string | undefined) => {
  if (numberGroup) return difficulty[+numberGroup - 1].title;
};
type DescriptionProps = {
  card: string;
};

const Description1 = ({ card }: DescriptionProps) => {
  const withoutTags = card.replaceAll("<b>", "").replaceAll("</b>", "");
  const wordBold = String(card.match(/(?<=<[b]>)([\s\S]*?)(?=<\/[b]>)/g));
  const x = wordBold ? withoutTags.split(wordBold) : "";
  return (
    <Grid item>
      {x[0]} <b style={{ color: "orange" }}>{wordBold}</b> {x[1]}
    </Grid>
  );
};

const Description2 = ({ card }: DescriptionProps) => {
  const withoutTags = card.replaceAll("<i>", "").replaceAll("</i>", "");
  const wordBold = String(card.match(/(?<=<[i]>)([\s\S]*?)(?=<\/[i]>)/g));
  const x = wordBold ? withoutTags.split(wordBold) : "";
  return (
    <Grid item>
      {x[0]} <i style={{ color: "orange" }}>{wordBold}</i> {x[1]}
    </Grid>
  );
};

const useSound = (traks: string[]) => {
  const [currentTrack, setCurrentTrack] = useState<HTMLAudioElement | null>(
    null
  );
  const trackRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackNumber, setCurrentTrackNumber] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    trackRef.current = currentTrack;
  }, [currentTrack]);

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTrackNumber((x) => x + 1);
  };

  useEffect(() => {
    if (traks.length && currentTrackNumber <= traks.length) {
      const track = new Audio();
      track.src = traks[currentTrackNumber];
      track.addEventListener("ended", handleEnded);
      setCurrentTrack(track);
    }
  }, [traks, currentTrackNumber]);

  useEffect(() => {
    if (traks.length) setCurrentTrackNumber(0);
  }, [traks]);

  useEffect(() => {
    if (currentTrack) {
      setIsPlaying(true);
      currentTrack.play();
    }
  }, [currentTrack]);

  const pause = () => {
    if (currentTrack) {
      currentTrack?.pause();
      setCurrentTrackNumber(-100);
      currentTrack.removeEventListener("ended", handleEnded);
    }
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  return [isPlaying, pause, currentTrack?.src || ""] as [
    boolean,
    () => void,
    string
  ];
};

export const Textbook = () => {
  const [cards, setCards] = useState<Word[]>([]);
  const [page, setPage] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState<string[]>([]);
  const [isPlaying, pause, path] = useSound(currentPlaylist);
  const location = useLocation();
  const lewelDiff = location.pathname.split("/").at(-1);

  const isPlayingCheck = (cardPlaylist: string[]) => {
    return cardPlaylist.includes(path) && isPlaying;
  };
  useEffect(() => {
    if (lewelDiff)
      responseNonAotorization(+lewelDiff - 1, page).then((e) =>
        setCards(e.data)
      );
  }, [page]);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const alfaBackground = (alfa: number) => {
    if (lewelDiff) return alpha(ColorBacground[+lewelDiff - 1], alfa);
  };

  return (
    <Grid
      justifyContent="center"
      container
      sx={{ background: alfaBackground(0.3) }
      }
    >
      <Grid
        container
        alignItems="center"
        flexDirection="column"
        flexWrap="nowrap"
        sx={{ maxWidth: "1900px" }}
      >
        <Grid item fontSize={30} sx={{ p: 4 }}>
          Данные слова '{titlePages(lewelDiff)}' сложности
        </Grid>
        <Grid item>
          <Stack spacing={2} sx={{ pb: 2 }}>
            <Pagination
              count={30}
              variant="outlined"
              color="primary"
              onChange={handleChange}
            />
          </Stack>
        </Grid>
        <Grid container gap={1} justifyContent="center">
          {cards.map((card) => (
            <Grid
              container
              flexWrap="nowrap"
              key={card.id}
              item
              xs={10}
              sm={10}
              md={11}
              direction={{ md: "row", sm: "column", xs: "column" }}
              sx={{
                width: "100%",
                borderRadius: "10px",
                background: alfaBackground(0),
              }}
            >
              <Grid position="relative" sx={{
                width: {
                  md: '35%',
                  sm: '100%',
                  xs: '100%'
                },
              }}>
                <AddLearnWord />
                <CardMedia
                  component="img"
                  sx={{
                    borderRadius: "10px",
                    // objectFit: 'fill'
                  }}
                  image={__baseUrl__ + card.image}
                  alt={card.word}
                />
              </Grid>
              <Grid
                item
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                position="relative"
                sx={{
                  fontWeight: '200',
                  p: 2,
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "10px",
                  width: {
                    md: '65%',
                    sm: '100%',
                    xs: '100%'
                  },
                  background: "#1976D2",
                  lineHeight: {
                    sm: 1.1,
                    xs: 1.1
                  }
                }}
              >
                <Grid position="absolute" top={0} right={0}>
                  {!isPlayingCheck([
                    __baseUrl__ + card.audio,
                    __baseUrl__ + card.audioExample,
                    __baseUrl__ + card.audioMeaning,
                  ]) ? (
                    <IconButton
                      onClick={() => {
                        pause();
                        setCurrentPlaylist([
                          __baseUrl__ + card.audio,
                          __baseUrl__ + card.audioExample,
                          __baseUrl__ + card.audioMeaning,
                        ]);
                      }}
                    >
                      <VolumeDownIcon color="warning" />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        if (pause) {
                          pause();
                        }
                      }}
                    >
                      <StopIcon color="warning" />
                    </IconButton>
                  )}
                </Grid>
                <Grid display="flex" flexDirection="column" sx={{
                  pb: {
                    sm: 1,
                    xs: 1
                  }
                }}>
                  <Typography
                    color="orange"
                    sx={{ borderLeft: "2px solid orange", pl: 1 }}
                  >
                    {card.word.toUpperCase()} - {card.transcription}
                  </Typography>
                  <Typography
                    color="orange"
                    sx={{ borderLeft: "2px solid orange", pl: 1 }}
                  >
                    {card.wordTranslate.toUpperCase()}
                  </Typography>
                </Grid>
                <Grid sx={{

                  fontSize: {
                    lg: '1rem',
                    // md: 20,
                    // sm: 18,
                    // xs: 11
                  }
                }} >
                  <Description1 card={card.textExample} />
                  <Typography color="whitesmoke" sx={{
                    fontWeight: '200',
                    pt: 1,
                    lineHeight: 1,
                    fontSize: {
                      lg: '1rem',
                      // md: 20,
                      // sm: 18,
                      // xs: 12
                    }
                  }}>
                    {card.textExampleTranslate}
                  </Typography>
                </Grid>
                <Grid sx={{
                  fontSize: {
                    lg: '1rem',
                    // md: 20,
                    // sm: 18,
                    // xs: 11
                  }
                }}>
                  <Description2 card={card.textMeaning} />
                  <Typography sx={{
                    fontWeight: '200',
                    pt: 1,
                    lineHeight: 1,
                    fontSize: {
                      lg: '1rem',
                      // md: 20,
                      // sm: 18,
                      // xs: 11
                    }
                  }}>
                    {card.textMeaningTranslate}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          md={10}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ pt: 2, pb: 1 }}
        >
          <Stack spacing={2}>
            <Pagination
              count={30}
              variant="outlined"
              color="primary"
              onChange={handleChange}
            />
          </Stack>
        </Grid>
        <Grid item md={10} justifyContent="center" sx={{ pb: 2 }}>
          <Grid item>Аудиовызов</Grid>
          <Grid item>Спринт</Grid>
        </Grid>
      </Grid>
    </Grid >
  );
};
