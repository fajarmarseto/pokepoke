import React, { FC, useEffect, useState } from "react";
import { Container, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
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

  const [limit, setLimit] = useState<number>(20);
  const {
    loading,
    error,
    data: { pokemons: { results = [] } = {} } = {},
  } = useQuery(GET_POKEMON_LIST, {
    variables: { limit: limit, offset: 0 },
  });
  const [pokemons, setPokemons] = useState(results);

  useEffect(() => {
    if (!loading) setPokemons(results);
  }, [loading, pokemons]);

  function moreLimit() {
    setLimit(limit + 20);
  }

  if (error) {
    alert(error.message);
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} alignItems="center">
        {pokemons.map((item) => (
          <Grid item key={item.id} xs={6} sm={6} md={4} lg={2} xl={2}>
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
            <Button variant="outlined" onClick={moreLimit}>
              SEE MORE
            </Button>
          ) : (
            <Loading />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
