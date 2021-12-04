import React, { FC } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import pokeball from "../Assets/Images/pokeball.png";

const useStyles = makeStyles({
  main: {
    display: "table",
    width: "100%",
    // height: "95vh",
    textAlign: "center",
  },
  loading: {
    display: "table-cell !important",
    verticalAlign: "middle",
    color: "#FC997C",
    "& img": {
      width: "60px",
    },
  },
});

interface Props {
  type?: string;
}

export const Loading: FC<Props> = ({ type }) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Grid
        className={classes.loading}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={type === undefined ? { height: "1vh" } : { height: "95vh" }}
      >
        <img src={pokeball} alt="pokeball"></img>
        <Typography variant="subtitle2">Loading...</Typography>
      </Grid>
    </div>
  );
};
