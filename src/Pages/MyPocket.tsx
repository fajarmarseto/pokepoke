import React, { FC, useContext } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { MyPokeCard } from "../Components/MyPokeCard";
import { AppContext } from "../Services/Store";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
  emptyPocket: {
    marginTop: "50px !important",
    lineHeight: "2 !important",
    textAlign: "center",
    fontStyle: "italic",
    color: "#2E4C6D",
  },
});

const MyPocket: FC = () => {
  const classes = useStyles();

  /// Store My Pokemon List
  const {
    state: { myPocket },
  } = useContext(AppContext);

  return (
    <Container maxWidth="xl" sx={{ pt: 10 }}>
      {myPocket.length === 0 && (
        <Typography
          className={classes.emptyPocket}
          variant="h5"
          component="div"
        >
          Your Pocket is empty
          <br /> Explore more Pokemon
        </Typography>
      )}
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
