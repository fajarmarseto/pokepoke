import React, { FC } from "react";
import { PASCAL_CASE } from "../Helpers";
import { GET_STATS, GET_TYPE_COLOR } from "../Services/Constants";
import {
  Divider,
  Grid,
  Card,
  Chip,
  CardMedia,
  CardContent,
  Typography,
  LinearProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import pokeball from "../Assets/Images/pokeball.png";

const useStyles = makeStyles({
  catch: {
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.2)",
      color: "red",
    },
  },
  cardMedia: {
    maxWidth: 250,
    maxHeight: 250,
    margin: "auto",
  },
  types: {
    color: "#fff !important",
    margin: "8px 0 8px 8px",
  },
});

interface Props {
  pokemon: {
    id: number;
    name: string;
    sprites: {
      front_default: string;
      back_default: string;
    };
    height: number;
    weight: number;
    stats: [
      {
        base_stat: number;
        stat: {
          name: string;
        };
      }
    ];
    abilities: [
      {
        ability: {
          name: string;
        };
      }
    ];
    types: [
      {
        type: {
          name: string;
        };
      }
    ];
    moves: [
      {
        move: {
          name: string;
        };
      }
    ];
  };
}

const PokeDetail: FC<Props> = ({ pokemon }) => {
  const classes = useStyles();

  function statColor(value: number) {
    if (value > 90) return "primary";
    else if (90 >= value && value > 60) return "info";
    else if (60 >= value && value > 35) return "warning";
    else return "error";
  }

  return (
    <Card sx={{ width: "100%", boxShadow: "unset" }}>
      {pokemon.sprites ? (
        <CardMedia
          className={classes.cardMedia}
          component="img"
          image={pokemon.sprites.front_default}
          alt="pokemon-detail"
        />
      ) : null}
      <Divider>
        <Grid className={classes.catch}>
          <img src={pokeball} alt="pokeball" height="50px"></img>
          <Typography variant="body2" component="div">
            Cacth!!!
          </Typography>
        </Grid>
      </Divider>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name && PASCAL_CASE(pokemon.name)}
          {pokemon.types
            ? pokemon.types.map((e) => (
                <Chip
                  className={classes.types}
                  key={e.type.name}
                  label={e.type.name}
                  size="small"
                  style={{ backgroundColor: GET_TYPE_COLOR(e.type.name) }}
                />
              ))
            : null}
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography gutterBottom variant="subtitle2" component="div">
              Weight
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {pokemon.weight} kg
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              Height
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {pokemon.height} m
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              Abilities
            </Typography>
            {pokemon.abilities
              ? pokemon.abilities.map((e) => (
                  <Chip
                    key={e.ability.name}
                    label={e.ability.name}
                    variant="outlined"
                    size="small"
                    style={{ margin: "0 3px 5px 3px" }}
                  />
                ))
              : null}
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            style={{ marginRight: "10px" }}
          ></Divider>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Typography gutterBottom variant="subtitle2" component="div">
              Stats
            </Typography>
            {pokemon.stats
              ? pokemon.stats.map((e) => (
                  <Grid container key={e.stat.name}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <Typography
                        gutterBottom
                        variant="caption"
                        component="div"
                        style={{ margin: "0px 0px" }}
                      >
                        {GET_STATS(e.stat.name)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                      <LinearProgress
                        variant="determinate"
                        color={statColor(e.base_stat)}
                        value={e.base_stat > 100 ? 100 : e.base_stat}
                        style={{ margin: "6px 0px" }}
                      />
                    </Grid>
                  </Grid>
                ))
              : null}
          </Grid>
          <Divider />
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography gutterBottom variant="h6" component="div">
              Moves
            </Typography>
          </Grid>
        </Grid>
        <Divider style={{ marginBottom: "10px" }} />
        {pokemon.moves
          ? pokemon.moves.map((e) => (
              <Chip
                key={e.move.name}
                label={e.move.name}
                size="small"
                style={{ margin: "3px" }}
              />
            ))
          : null}
      </CardContent>
    </Card>
  );
};

export default PokeDetail;
