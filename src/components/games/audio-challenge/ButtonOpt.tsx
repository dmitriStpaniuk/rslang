import { Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
type PropsButtonOptArrow = {
  setIsWinnerImage: (a: boolean) => void;
  setButtonOpt: (a: boolean) => void;
  setIndexWinnerWord:(a: number) => void;
  indexWinnerWord: number;
  setIsModalCondition: (a: boolean) => void;
}
type PropsButtonOpt = {
  setIsWinnerImage: (a: boolean) => void;
  setButtonOpt: (a: boolean) => void;
}

export const ButtonOpt = ({setIsWinnerImage, setButtonOpt}:PropsButtonOpt) => {
    const toggleShowWinnerImage = () => {
        setIsWinnerImage(true);
        setButtonOpt(true);
      };
    return (
      <Button
        variant="contained"
        onClick={() => toggleShowWinnerImage()}
        sx={{
          bgcolor: "#058c92c4",
          height: "2.3rem",
          minWidth: "8rem",
          "&:hover": { bgcolor: "#056c94c4" },
        }}
      >
        I don't know
      </Button>
    );
  };

  export const ButtonOptArrow = ({setIsWinnerImage, setButtonOpt, setIndexWinnerWord, indexWinnerWord, setIsModalCondition}:PropsButtonOptArrow) => {
    const newWord = () => {
        indexWinnerWord < 19
          ? setIndexWinnerWord(indexWinnerWord + 1)
          : setIsModalCondition(true);
        setIsWinnerImage(false);
        setButtonOpt(false);
      };
    return (
      <Button
        variant="contained"
        onClick={() => newWord()}
        sx={{
          bgcolor: "#7eadaf73",
          color: "black",
          height: "2.3rem",
          minWidth: "8rem",
          "&:hover": { bgcolor: "#71b5b7e3" },
        }}
      >
        <ArrowRightAltIcon fontSize={"large"} />
      </Button>
    );
  };