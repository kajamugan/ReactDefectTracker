import clsx from "clsx";
import {makeStyles,useTheme} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WarningIcon from '@material-ui/icons/Warning';
import EventNoteIcon from '@material-ui/icons/EventNote';
import React from 'react';
import Route from "../Route/route";
import Link from '@material-ui/core/Link'



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [projectOpen, setProjectOpen] = React.useState(false);
  const [defectOpen, setDefectOpen] = React.useState(false);
  
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleProjectClick = () => {
    if (defectOpen) {
      setDefectOpen(false);
    }
    setProjectOpen(!projectOpen);
  };

  const handleDefectClick = () => {
    if (projectOpen) {
      setProjectOpen(false);
    }
    setDefectOpen(!defectOpen);
  };

 
  return ( <div className = {classes.root}>
    <CssBaseline />
    <AppBar position = "fixed"
    className = {
      clsx(classes.appBar, {
        [classes.appBarShift]: drawerOpen
      })
    }>
    <Toolbar>
    <IconButton color = "inherit"
    aria-label = "open drawer"
    onClick = {handleDrawerOpen} edge = "start" className = {clsx(classes.menuButton, {[classes.hide]: drawerOpen}) }>
    <MenuIcon />
    </IconButton> 
    <Typography variant = "h6" noWrap> Defect Tracker </Typography> 
    </Toolbar> 
    </AppBar> 
    <Drawer variant = "permanent"
    className = {
      clsx(classes.drawer, {
        [classes.drawerOpen]: drawerOpen,
        [classes.drawerClose]: !drawerOpen
      })
    }
    classes = {
      {
        paper: clsx({
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen
        })
      }
    }
    open = {drawerOpen}>
    <div className = {
      classes.toolbar
    }>
    <IconButton onClick = {
      handleDrawerClose
    }> {theme.direction === "rtl" ? ( <ChevronRightIcon />) : ( <ChevronLeftIcon />)} 
    </IconButton> 
    </div> 
  <Divider />
  <List>
  <Link href='/project'>
  <ListItem button>
    <ListItemIcon>
    <EventNoteIcon />
    </ListItemIcon>
    <ListItemText primary = "Project" />  
    </ListItem> 
  </Link>
  <Divider />
  <Link href='/defect'>
  <ListItem button>
    <ListItemIcon>
    <WarningIcon />
    </ListItemIcon> 
    <ListItemText primary = "Defect" /> 
    </ListItem> 
  </Link>
  </List> 
  </Drawer>
     <main className = {classes.content}>
    <div className = {classes.toolbar}/> 
   <Route />
    </main> 
    </div>
  );
}
