import React, { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAIL } from "../Services/Queries/pokemon";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PokeDetail from "../Components/PokeDetail";
import { Loading } from "../Components/Loading";
import PageNotFound from "../Components/PageNotFound";

const Detail: FC = () => {
  const { name, myPokeName } = useParams();
  const navigate = useNavigate();

  /// Get Pokemon Detail
  const {
    loading,
    error,
    data: { pokemon = [] } = {},
  } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: name },
  });

  /// State pokemon detail
  const [detail, setDetail] = useState(pokemon);

  useEffect(() => {
    if (!loading) setDetail(pokemon);
  }, [loading, pokemon]);

  /// Loading and error validation
  if (loading) {
    return <Loading type="full-page" />;
  } else if (error) {
    alert(error.message);
  }

  /// Navigation Config for detail pokemon, (owned and unouwned)
  const handleBackNavigation = () => {
    if (myPokeName) navigate("/my-pocket");
    else navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="text"
            startIcon={<ArrowBackIosIcon />}
            onClick={handleBackNavigation}
          >
            Back
          </Button>
        </Grid>
      </Grid>
      {!detail.name ? (
        <PageNotFound />
      ) : (
        <PokeDetail
          name={detail.name}
          sprites={detail.sprites}
          height={detail.height}
          weight={detail.weight}
          stats={detail.stats}
          abilities={detail.abilities}
          types={detail.types}
          moves={detail.moves}
        />
      )}
    </Container>
  );
};

export default Detail;
