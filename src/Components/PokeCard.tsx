import React, { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PASCAL_CASE } from "../Helpers";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppContext } from "../Services/Store";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    color: "#000 !important",
    backgroundColor: "#DADDFC !important",
    border: "4px solid #DADDFC",
    borderRadius: "18px !important",
    "&:hover": {
      transform: "scale(1.02)",
      borderColor: "#FC997C",
    },
  },
  cardMedia: {
    minHeight: 100,
    maxHeight: 300,
    backgroundColor: "white",
    borderRadius: "0px 0px 14px 14px",
  },
  cardContent: {
    padding: "5px 10px !important",
    "& div": {
      color: "#2E4C6D",
      marginBottom: 0,
    },
  },
  cardActions: {
    color: "#2E4C6D",
    padding: "5px 10px !important",
    float: "right",
  },
});

interface Props {
  pokemon: {
    id: number;
    name: string;
    image: string;
    artwork: string;
    dreamworld: string;
  };
}

export const PokeCard: FC<Props> = ({ pokemon }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  /// Store my pokemon
  const {
    state: { myPocket },
  } = useContext(AppContext);

  /// Find qty owned my pokemon
  const owned = (pokemonName) => {
    return myPocket.filter((e) => e.name === pokemonName).length;
  };

  return (
    <Card
      className={classes.card}
      onClick={() => navigate(`/detail/${pokemon.name}`)}
    >
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          component="img"
          alt="card-img"
          image={pokemon.image}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="div">
            {PASCAL_CASE(pokemon.name)}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Typography variant="body2">Owned: {owned(pokemon.name)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
