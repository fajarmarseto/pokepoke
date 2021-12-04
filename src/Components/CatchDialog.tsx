import React, { FC, useState } from "react";
import { PASCAL_CASE } from "../Helpers";
import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import pokeballColor from "../Assets/Images/pokeball-colored.png";

type TypeDialog = "success" | "failed";

interface Props {
  visible: boolean;
  type: TypeDialog;
  pokemon: {
    name: string;
    image: string;
  };
  handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CatchDialog: FC<Props> = ({ visible, type, pokemon, handleClose }) => {
  const [pokeName, setPokeName] = useState("");

  const handleChange = (event) => {
    setPokeName(event.target.value);
  };

  const onSave = () => {
    console.log(pokeName);
  };

  return (
    <Dialog
      open={visible}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      maxWidth="xs"
      fullWidth={true}
      style={{ textAlign: "center" }}
    >
      <DialogTitle>
        {type === "success" && "Congratulations!!!"}
        {type === "failed" && "Failed!!!"}
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
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={handleClose}>Close</Button>
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
