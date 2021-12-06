import React, { FC, useReducer, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PASCAL_CASE, GET_LOCAL_STORAGE, SET_LOCAL_STORAGE } from "../Helpers";
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
import CatchDialog from "./CatchDialog";
import pokeball from "../Assets/Images/pokeball.png";
import pokeballColor from "../Assets/Images/pokeball-colored.png";
import pokeballOpen from "../Assets/Images/pokeball-open.png";
import { AppContext } from "../Services/Store";

const useStyles = makeStyles({
  catch: {
    cursor: "pointer",
    border: "2px black",
    "&:hover": {
      transform: "scale(1.2)",
      color: "#1976d2",
      "& .pokeLabel": {
        fontWeight: 600,
      },
    },
    "& .pokeball": {
      width: "50px",
      height: "50px",
      backgroundSize: "cover",
      "&:hover": {
        transform: "scale(1.2)",
        color: "#1976d2",
      },
    },
  },
  pokeballCatch: {
    backgroundImage: `url(${pokeball})`,
    "&:hover": {
      backgroundImage: `url(${pokeballColor})`,
    },
  },
  pokeballRelease: {
    margin: "auto",
    backgroundImage: `url(${pokeballColor})`,
    "&:hover": {
      width: "40px",
      backgroundImage: `url(${pokeballOpen})`,
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
}

const reducer = (state, action) => {
  switch (action.type) {
    case "showDialogSuccess":
      return { dialogVisible: true, type: "success" };
    case "showDialogFailed":
      return { dialogVisible: true, type: "failed" };
    case "showDialogSaved":
      return { dialogVisible: true, type: "saved" };
    case "closeDialog":
      return { dialogVisible: false, type: "" };
    default:
      return state;
  }
};

const PokeDetail: FC<Props> = ({
  name,
  sprites,
  height,
  weight,
  stats,
  abilities,
  types,
  moves,
}) => {
  const classes = useStyles();
  const { myPokeName } = useParams();
  const navigate = useNavigate();
  const { setState } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, {
    dialogVisible: false,
    type: "",
  });

  const statColor = (value: number) => {
    if (value > 90) return "primary";
    else if (90 >= value && value > 60) return "info";
    else if (60 >= value && value > 35) return "warning";
    else return "error";
  };

  const catchPokemon = () => {
    if (Math.random() >= 0.5) {
      dispatch({ type: "showDialogSuccess" });
    } else {
      dispatch({ type: "showDialogFailed" });
    }
  };

  const closeDialog = () => {
    dispatch({ type: "closeDialog" });
    if (state.type === "saved") navigate("/");
  };

  const handleSubmit = (myPokeName) => {
    closeDialog();
    let myPocket = GET_LOCAL_STORAGE("myPocket");
    myPocket.push({
      myPokeName,
      name,
      sprites,
      height,
      weight,
      stats,
      abilities,
      types,
      moves,
    });
    SET_LOCAL_STORAGE("myPocket", myPocket);
    setState({ myPocket: myPocket });
    dispatch({ type: "showDialogSaved" });
  };

  return (
    <Card sx={{ width: "100%", boxShadow: "unset" }}>
      {sprites && (
        <CardMedia
          className={classes.cardMedia}
          component="img"
          image={sprites.front_default}
          alt="pokemon-detail"
        />
      )}
      <Divider>
        <div className={classes.catch} onClick={() => catchPokemon()}>
          {myPokeName ? (
            <div className={`pokeball ${classes.pokeballRelease}`}></div>
          ) : (
            <div className={`pokeball ${classes.pokeballCatch}`}></div>
          )}

          <Typography variant="body2" component="div" className="pokeLabel">
            {myPokeName ? "Release!!!" : "Catch!!!"}
          </Typography>
        </div>
      </Divider>

      <CardContent>
        {myPokeName && (
          <Typography gutterBottom variant="h4" component="div">
            {PASCAL_CASE(myPokeName)}
          </Typography>
        )}
        <Typography
          gutterBottom
          variant={myPokeName ? "h6" : "h5"}
          component="div"
        >
          {name && PASCAL_CASE(name)}
          {types &&
            types.map((e) => (
              <Chip
                className={classes.types}
                key={e.type.name}
                label={e.type.name}
                size="small"
                style={{ backgroundColor: GET_TYPE_COLOR(e.type.name) }}
              />
            ))}
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography gutterBottom variant="subtitle2" component="div">
              Weight
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {weight} kg
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              Height
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {height} m
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              Abilities
            </Typography>
            {abilities &&
              abilities.map((e) => (
                <Chip
                  key={e.ability.name}
                  label={e.ability.name}
                  variant="outlined"
                  size="small"
                  style={{ margin: "0 3px 5px 3px" }}
                />
              ))}
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
            {stats &&
              stats.map((e) => (
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
              ))}
          </Grid>
          <Divider />
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography gutterBottom variant="h6" component="div">
              Moves
            </Typography>
          </Grid>
        </Grid>
        <Divider style={{ marginBottom: "10px" }} />
        {moves &&
          moves.map((e) => (
            <Chip
              key={e.move.name}
              label={e.move.name}
              size="small"
              style={{ margin: "3px" }}
            />
          ))}
      </CardContent>
      <CatchDialog
        visible={state.dialogVisible}
        type={state.type}
        pokemon={{ name: name, image: sprites && sprites.back_default }}
        handleClose={closeDialog}
        handleSubmit={handleSubmit}
      />
    </Card>
  );
};

export default PokeDetail;
