import { Button } from "@mui/material";
import withAuth from "../WithAuth";

type AddDifficultButtonProps = {
  cardId: string;
  handleAddDifficult: (cardId: string) => void;
};
type DeleteDifficultButtonProps = {
  cardId: string;
  handleDeleteDifficult: (cardId: string) => void;
};

export const AddDifficultButton = withAuth(
  ({ cardId, handleAddDifficult }: AddDifficultButtonProps) => {
    return (
      <Button
        sx={{
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
  ({ cardId, handleDeleteDifficult }: DeleteDifficultButtonProps) => {
    return (
      <Button
        sx={{
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
