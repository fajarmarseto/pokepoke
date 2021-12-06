import React, { FC } from "react";
import { PASCAL_CASE } from "../Helpers";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";

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
    name: string;
    myPokeName: string;
    sprites: {
      front_default: string;
    };
  };
}

export const MyPokeCard: FC<Props> = ({ pokemon }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      onClick={() => navigate(`/detail/${pokemon.name}/${pokemon.myPokeName}`)}
    >
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          component="img"
          alt="card-img"
          image={pokemon.sprites.front_default}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="div">
            {PASCAL_CASE(pokemon.myPokeName)}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Typography variant="body2">{PASCAL_CASE(pokemon.name)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
