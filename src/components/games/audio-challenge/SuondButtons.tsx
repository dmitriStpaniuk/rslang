import { Button } from "@mui/material";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

type PropsSoundIcon = {
  badSound: string;
  goodSound: string;
  setIsHandleSound: (value: React.SetStateAction<any[]> | []) => void;
  isHandleSound: string[] | [];
};

export const SoundButtons = ({
  badSound,
  goodSound,
  setIsHandleSound,
  isHandleSound,
}: PropsSoundIcon) => {


  const SoundIcon = () => {
    return (
      <Button onClick={() => setIsHandleSound([])}>
        <MusicNoteIcon />
      </Button>
    );
  };

  const OffSoundIcon = () => {
    return (
      <Button onClick={() => setIsHandleSound([badSound, goodSound])}>
        <MusicOffIcon />
      </Button>
    );
  };
  return <>{isHandleSound.length ? <SoundIcon /> : <OffSoundIcon />}</>;
};
