import React, { FC, useContext } from "react";
import { Container, Grid } from "@mui/material";
import { MyPokeCard } from "../Components/MyPokeCard";
import { AppContext } from "../Services/Store";

const MyPocket: FC = () => {
  const {
    state: { myPocket },
  } = useContext(AppContext);

  return (
    <Container maxWidth="xl" sx={{ pt: 10 }}>
      <Grid container spacing={3} style={{ justifyContent: "center" }}>
        {myPocket.map((item, index) => (
          <Grid item key={index} xs={6} sm={4} md={3} lg={2} xl={2}>
            <MyPokeCard pokemon={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyPocket;
