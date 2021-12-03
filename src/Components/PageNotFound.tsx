import React, { FC } from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  main: {
    display: "table",
    width: "100%",
    height: "90vh",
    textAlign: "center",
    color: "#888",
  },
  pageNotFound: {
    display: "table-cell",
    verticalAlign: "middle",
  },
});

const PageNotFound: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Typography
        className={classes.pageNotFound}
        variant="h4"
        component="div"
        gutterBottom
      >
        Page Not Found
      </Typography>
    </div>
  );
};

export default PageNotFound;
