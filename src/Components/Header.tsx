import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, List, ListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import explore from "../Assets/Icons/explore.png";
import exploreColor from "../Assets/Icons/explore-color.png";
import pocket from "../Assets/Icons/pocket.png";
import pocketColor from "../Assets/Icons/pocket-color.png";
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
    "& ul li .pocket": {
      backgroundSize: "cover",
      backgroundImage: `url(${pocket})`,
    },
    "& ul li .explore": {
      backgroundSize: "cover",
      backgroundImage: `url(${explore})`,
    },
    "&:hover": {
      transform: "scale(1.06)",
      "& ul li div": {
        color: "#FC997C",
      },
      "& ul li .pocket": {
        backgroundImage: `url(${pocketColor})`,
      },
      "& ul li .explore": {
        backgroundImage: `url(${exploreColor})`,
      },
    },
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
    padding: "0 !important",
    width: "25px",
    height: "25px",
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
              <div className={`${classes.icons} explore`}></div>
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

        <Link to="/my-pocket" className={classes.link}>
          <List dense={true}>
            <ListItem className={classes.listItem}>
              <div className={`${classes.icons} pocket`}></div>
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
