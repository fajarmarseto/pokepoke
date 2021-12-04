import React, { FC } from "react";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
  },
});

interface Props {
  type: string;
}

export const Loading: FC<Props> = ({ type }) => {
  const classes = useStyles();

  function setHeight(type: string) {
    switch (type) {
      case "full-page":
        return "95vh";
      default:
        return "1vh";
    }
  }
  return (
    <div className={classes.main}>
      <Grid
        className={classes.loading}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ height: setHeight(type) }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="subtitle2">Loading...</Typography>
      </Grid>
    </div>
  );
};
