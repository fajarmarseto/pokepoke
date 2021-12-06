import React, { FC, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_LIST } from "../Services/Queries/pokemon";
import { PokeCard } from "../Components/PokeCard";
import { Loading } from "../Components/Loading";

const useStyles = makeStyles({
  more: {
    padding: "50px 0",
    textAlign: "center",
    color: "#FC997C",
    "& img": {
      width: "60px",
    },
  },
});

const Home: FC = () => {
  const classes = useStyles();

  /// Limit for more pokemon
  const [limit, setLimit] = useState<number>(20);

  /// Get Pokemon List
  const {
    loading,
    error,
    data: { pokemons: { results = [] } = {} } = {},
  } = useQuery(GET_POKEMON_LIST, {
    variables: { limit: limit, offset: 0 },
  });

  /// State for pokemon list
  const [pokemons, setPokemons] = useState(results);

  useEffect(() => {
    if (!loading) setPokemons(results);
  }, [loading, results]);

  if (error) {
    alert(error.message);
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 10 }}>
      <Grid container spacing={3} style={{ justifyContent: "center" }}>
        {pokemons.map((item) => (
          <Grid item key={item.id} xs={6} sm={4} md={3} lg={2} xl={2}>
            <PokeCard pokemon={item} />
          </Grid>
        ))}
        <Grid
          item
          className={classes.more}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          {!loading ? (
            <Button variant="outlined" onClick={() => setLimit(limit + 20)}>
              SEE MORE
            </Button>
          ) : (
            <Loading type={pokemons.length === 0 ? "full-page" : "default"} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
