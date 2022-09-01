import { CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { __baseUrl__ } from "../constant";
import {
  AddDifficultButton,
  DeleteDifficultButton,
} from "../textbook/AddLearnWord";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import StopIcon from "@mui/icons-material/Stop";
import { Word } from "../textbook/Textbook";
import { useEffect, useRef, useState } from "react";
import { WordsLearnedCounter } from "../textbook/WordsLearnedCounter";
import { LearnedWordButton } from "../textbook/LearnedWordButton";

type DescriptionProps = {
  card: string;
};

type Card = {
  card: Word;
  lewelDiff?: string;
  isDifficult?: boolean;
  isLearned?: boolean;
  handleAddDifficult?: (cardId: string) => void;
  handleDeleteDifficult: (cardId: string) => void;
  handleLearnWord?: (cardId: string) => void;
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

export const CardTextbook = ({
  card,
  isDifficult,
  isLearned,
  handleAddDifficult,
  handleDeleteDifficult,
  handleLearnWord,
}: Card) => {
  const [currentPlaylist, setCurrentPlaylist] = useState<string[]>([]);
  const [isPlaying, pause, path] = useSound(currentPlaylist);
  const hideDeleteButton = isDifficult ? true : false;
  console.log(hideDeleteButton);
  const isPlayingCheck = (cardPlaylist: string[]) => {
    return cardPlaylist.includes(path) && isPlaying;
  };
  const background = isLearned ? "green" : isDifficult ? "orange" : "white";
  return (
    <Grid
      container
      flexWrap="nowrap"
      key={card.id}
      item
      xs={8}
      sm={8}
      md={10}
      direction={{ md: "row", sm: "column", xs: "column" }}
      sx={{
        p: 2,
        width: "100%",
        borderRadius: "10px",
        background: background,
      }}
    >
      <Grid
        position="relative"
        sx={{
          width: {
            md: "35%",
            sm: "100%",
            xs: "100%",
          },
        }}
      >
        <Grid
          container
          position={"absolute"}
          bottom="5px"
          flexWrap="nowrap"
          justifyContent="center"
          gap={1}
        >
          {handleAddDifficult ? (
            <AddDifficultButton
              cardId={card.id}
              handleAddDifficult={handleAddDifficult}
              hideDeleteButton={hideDeleteButton}
            />
          ) : null}
          {
            <DeleteDifficultButton
              cardId={card.id}
              handleDeleteDifficult={handleDeleteDifficult}
              hideDeleteButton={hideDeleteButton}
            />
          }
        </Grid>
        {handleLearnWord ? (
          <LearnedWordButton
            cardId={card.id}
            handleLearnWord={handleLearnWord}
          />
        ) : null}
        <CardMedia
          component="img"
          sx={{
            borderRadius: "10px",
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
          fontWeight: "200",
          p: 2,
          color: "white",
          border: "1px solid white",
          borderRadius: "10px",
          width: {
            md: "65%",
            sm: "100%",
            xs: "100%",
          },
          background: "#1976D2",
          lineHeight: {
            sm: 1.1,
            xs: 1.1,
          },
        }}
      >
        <Grid
          display="flex"
          flexDirection="column"
          sx={{
            pb: {
              sm: 1,
              xs: 1,
            },
          }}
        >
          <Grid
            display="flex"
            sx={{
              justifyContent: {
                md: "space-between",
                sm: "space-between",
              },
              flexDirection: {
                md: "row",
                sm: "column-reverse",
                xs: "column-reverse",
              },
              alignContent: "flex-start",
            }}
          >
            <Grid>
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
            <Grid>
              <Grid
                display="flex"
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <WordsLearnedCounter />
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
            </Grid>
          </Grid>
        </Grid>
        <Grid
          sx={{
            lineHeight: 1,
            fontSize: {
              lg: "1rem",
              // md: 20,
              // sm: '0.9rem',
              xs: 14,
            },
          }}
        >
          <Description1 card={card.textExample} />
          <Typography
            color="whitesmoke"
            sx={{
              fontWeight: "200",
              pt: 1,
              pb: 2,
              lineHeight: 1,
              fontSize: {
                lg: "1rem",
                // md: 20,
                sm: "0.9rem",
                xs: 13,
              },
            }}
          >
            {card.textExampleTranslate}
          </Typography>
        </Grid>
        <Grid
          sx={{
            fontSize: {
              lg: "1rem",
              // md: 20,
              // sm: 18,
              xs: 14,
            },
          }}
        >
          <Description2 card={card.textMeaning} />
          <Typography
            sx={{
              fontWeight: "200",
              pt: 1,
              lineHeight: 1,
              fontSize: {
                lg: "1rem",
                // md: 20,
                // sm: 18,
                xs: 13,
              },
            }}
          >
            {card.textMeaningTranslate}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
