import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { RoutesLinks } from "../../routes";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    backgroundColor: "white",
    color: "rgba(163, 163, 0, 1)"
  },
  anchor: {
    color: "rgba(163, 163, 0, 1)",
    textDecoration: "none"
  },
  logo: {
    height: 35
  },
  titleContainer: {
    flex: 1,
    textAlign: "center"
  }
}));

function Header({ handleCollapse }) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={handleCollapse}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          <Link to={RoutesLinks.HOME_LINK}>
            <img className={classes.logo} src={logo} alt={"logo"} />
          </Link>
          <div className={classes.titleContainer}>
            <Typography className={classes.title} variant="h6" noWrap>
              Itunes Searcher
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
