import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, List, ListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import explore from "../Assets/Icons/explore.png";
import pocket from "../Assets/Icons/pocket.png";
import { AppContext } from "../Services/Store";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  center: {
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
    margin: "0 20px",
  },
  listItem: {
    padding: "0 !important",
    "& div": {
      color: "#fff",
      paddingTop: 4,
      fontSize: 11,
      fontWeight: 500,
      textAlign: "center",
      lineHeight: 1.3,
    },
  },
  icons: {
    padding: 0,
    maxHeight: 30,
    margin: "auto",
  },
});

const Header: FC = () => {
  const classes = useStyles();
  const {
    state: { myPocket },
  } = useContext(AppContext);

  return (
    <AppBar>
      <Toolbar className={classes.center}>
        <Link to="/" className={classes.link}>
          <List dense={true}>
            <ListItem className={classes.listItem}>
              <img alt="dialog-poke" src={explore} className={classes.icons} />
            </ListItem>
            <ListItem className={classes.listItem}>
              <Typography variant="caption" noWrap component="div">
                Explore
                <br />
                Pokemon
              </Typography>
            </ListItem>
          </List>
        </Link>

        <Link to="/" className={classes.link}>
          <List dense={true}>
            <ListItem className={classes.listItem}>
              <img alt="dialog-poke" src={pocket} className={classes.icons} />
            </ListItem>
            <ListItem className={classes.listItem}>
              <Typography variant="caption" noWrap component="div">
                My Pokemon
                <br />
                Total Owned: {myPocket.length}
              </Typography>
            </ListItem>
          </List>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
