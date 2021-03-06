import React, { FC, useState } from "react";
import { PASCAL_CASE, GET_LOCAL_STORAGE } from "../Helpers";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import pokeballColor from "../Assets/Images/pokeball-colored.png";
import checked from "../Assets/Icons/checked.png";

type TypeDialog = "success" | "failed" | "saved";

interface Props {
  visible: boolean;
  type: TypeDialog;
  pokemon: {
    name: string;
    image: string;
  };
  handleClose: () => void;
  handleSubmit: (name: string) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CatchDialog: FC<Props> = ({
  visible,
  type,
  pokemon,
  handleClose,
  handleSubmit,
}) => {
  /// State pokemon nickname input
  const [pokeName, setPokeName] = useState("");
  /// State flag error input
  const [errorInput, setErrorInput] = useState(false);
  /// State duplicate nickname input
  const [errorText, setErrorText] = useState("");

  /// Find duplication nickname from my pokemon' pocket
  const nameExistValidate = (value) => {
    let myPocket = GET_LOCAL_STORAGE("myPocket");
    const exist = myPocket.find(
      (e) => e.myPokeName === value && e.name === pokemon.name
    );
    if (exist !== undefined) {
      setErrorInput(true);
      setErrorText("The Name already exists");
    } else {
      setErrorInput(false);
      setErrorText("");
    }
  };

  /// Handling on change input, if empty or duplicate
  const handleChange = (event) => {
    if (event.target.value.length > 0) {
      setErrorInput(false);
    }
    nameExistValidate(event.target.value);
    setPokeName(event.target.value);
  };

  /// Handling before submit validation
  const onSave = () => {
    if (pokeName.length === 0 || errorText.length > 0) setErrorInput(true);
    else handleSubmit(pokeName);
    setPokeName("");
  };

  /// Close dialog
  const onClose = () => {
    setPokeName("");
    setErrorInput(false);
    setErrorText("");
    handleClose();
  };

  return (
    <Dialog
      open={visible}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      maxWidth="xs"
      fullWidth={true}
      style={{ textAlign: "center" }}
    >
      <DialogTitle>
        {type === "success" && "Congratulations!!!"}
        {type === "failed" && "Failed!!!"}
        {type === "saved" && `Your ${PASCAL_CASE(pokemon.name)} Saved!!!`}
      </DialogTitle>
      {type === "success" && (
        <DialogContent>
          <img
            alt="dialog-poke"
            src={pokeballColor}
            style={{ maxHeight: 100 }}
          />
          <Typography variant="body2" component="div">
            You got {PASCAL_CASE(pokemon.name)}
          </Typography>
          <TextField
            label="Enter pokemon name"
            variant="outlined"
            defaultValue={pokeName}
            onChange={handleChange}
            size="small"
            required
            error={errorInput}
            helperText={errorText}
            style={{ marginTop: 15 }}
          />
        </DialogContent>
      )}
      {type === "failed" && (
        <DialogContent>
          <img alt="dialog-poke" src={pokemon.image} />
          <Typography variant="body2" component="div">
            {PASCAL_CASE(pokemon.name)} ran away
          </Typography>
        </DialogContent>
      )}
      {type === "saved" && (
        <DialogContent sx={{ pt: "20px !important" }}>
          <img alt="dialog-poke" src={checked} style={{ maxHeight: 100 }} />
        </DialogContent>
      )}
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={onClose}>Close</Button>
        {type === "success" && (
          <Button type="submit" onClick={onSave}>
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CatchDialog;
