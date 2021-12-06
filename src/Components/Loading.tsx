import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import makeStyles from "@mui/styles/makeStyles";

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

  /// Configuration loading page
  const setHeight = (type: string) => {
    switch (type) {
      case "full-page":
        return "95vh";
      default:
        return "1vh";
    }
  };

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
