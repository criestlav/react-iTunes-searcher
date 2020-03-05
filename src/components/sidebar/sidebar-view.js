import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Home from "@material-ui/icons/Home";
import MusicNote from "@material-ui/icons/MusicNote";
import Album from "@material-ui/icons/Album";
import Movie from "@material-ui/icons/Movie";
import { RoutesLinks } from "../../routes";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  paper: {
    color: "white",
    background:
      "linear-gradient(to right, rgba(208, 208, 83, 1) 0%, rgba(163, 163, 0, 1) 100%)"
  }
});

function Sidebar({ collapse, handleCollapse }) {
  const classes = useStyles();
  const toggleDrawer = () => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    handleCollapse();
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        {[
          { label: "Home", link: `${RoutesLinks.HOME_LINK}`, icon: <Home /> },
          {
            label: "Songs",
            link: `${RoutesLinks.SONGS_LINK}`,
            icon: <MusicNote />
          },
          {
            label: "Albums",
            link: `${RoutesLinks.ALBUMS_LINK}`,
            icon: <Album />
          },
          {
            label: "Movies",
            link: `${RoutesLinks.MOVIES_LINK}`,
            icon: <Movie />
          }
        ].map((item, index) => (
          <ListItem
            selected={window.location.pathname === item.link}
            button
            key={item.label}
            component={React.forwardRef((props, red) => (
              <Link to={item.link} {...props} />
            ))}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer
      open={collapse}
      onClose={handleCollapse}
      classes={{ paperAnchorLeft: classes.paper }}
    >
      {sideList()}
    </Drawer>
  );
}

export default Sidebar;
