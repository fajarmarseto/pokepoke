import React, { FC } from "react";
import { useParams } from "react-router-dom";
import {
  Slide,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import pokeballOpen from "../Assets/Images/pokeball-open.png";
import { PASCAL_CASE } from "../Helpers";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  pokeball: {
    maxHeight: "100px",
    padding: "30px",
  },
});

interface Props {
  visible: boolean;
  pokemon: {
    name: string;
    image: string;
  };
  handleClose: () => void;
}

/// Transition dialog modal
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReleaseDialog: FC<Props> = ({ visible, pokemon, handleClose }) => {
  const classes = useStyles();
  const { myPokeName } = useParams();

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
      <DialogContent>
        <Typography variant="body2" component="div">
          <b>{myPokeName}</b> ({pokemon.name && PASCAL_CASE(pokemon.name)}) has
          been removed from your pocket
        </Typography>
        <img
          className={classes.pokeball}
          alt="dialog-poke"
          src={pokeballOpen}
        />
        <img alt="dialog-poke" src={pokemon.image} />
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReleaseDialog;
