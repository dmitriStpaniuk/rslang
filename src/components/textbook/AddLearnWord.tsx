import { Button } from "@mui/material";
import withAuth from "../WithAuth";

type AddDifficultButtonProps = {
  cardId: string;
  hideDeleteButton: boolean;
  handleAddDifficult: (cardId: string) => void;
};
type DeleteDifficultButtonProps = {
  cardId: string;
  hideDeleteButton: boolean;
  handleDeleteDifficult: (cardId: string) => void;
};

export const AddDifficultButton = withAuth(
  ({
    cardId,
    handleAddDifficult,
    hideDeleteButton,
  }: AddDifficultButtonProps) => {
    const display = hideDeleteButton ? "none" : "flex";
    return (
      <Button
        sx={{
          display: display,
          background: "#e97719",
          fontSize: "10px",
        }}
        variant="contained"
        onClick={() => handleAddDifficult(cardId)}
      >
        {" "}
        сложное
      </Button>
    );
  }
);
export const DeleteDifficultButton = withAuth(
  ({
    cardId,
    handleDeleteDifficult,
    hideDeleteButton,
  }: DeleteDifficultButtonProps) => {
    const display = !hideDeleteButton ? "none" : "flex";
    return (
      <Button
        sx={{
          display: display,
          background: "#e97719",
          fontSize: "10px",
        }}
        variant="contained"
        onClick={() => handleDeleteDifficult(cardId)}
      >
        Удалить
      </Button>
    );
  }
);
