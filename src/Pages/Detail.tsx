import React, { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Grid, Button } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAIL } from "../Services/Queries/pokemon";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PokeDetail from "../Components/PokeDetail";
import { Loading } from "../Components/Loading";

const Detail: FC = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const {
    loading,
    error,
    data: { pokemon = [] } = {},
  } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: name },
  });
  const [detail, setDetail] = useState(pokemon);

  useEffect(() => {
    if (!loading) setDetail(pokemon);
  }, [loading, pokemon]);

  if (loading) {
    return <Loading type="full-page" />;
  } else if (error) {
    alert(error.message);
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="text"
            startIcon={<ArrowBackIosIcon />}
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </Grid>
      </Grid>
      <PokeDetail
        id={detail.id}
        name={detail.name}
        sprites={detail.sprites}
        height={detail.height}
        weight={detail.weight}
        stats={detail.stats}
        abilities={detail.abilities}
        types={detail.types}
        moves={detail.moves}
      />
    </Container>
  );
};

export default Detail;
