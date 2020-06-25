import React, { useState, Fragment , useRef } from 'react';
import clsx from 'clsx';
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import StorageIcon from '@material-ui/icons/Storage';
import AssessmentIcon from '@material-ui/icons/Assessment';

import Home from "../views/Home";
import {GridView} from "../views/Grid";
import {InputForm}  from "../views/InputForm";
//import Grid from "../views/Sample"

const drawerWidth = 240;
const history = createBrowserHistory({  });

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  }
});



const MyToolbar = withStyles(styles)(
  ({ classes, title, onMenuClick }) => (
    <Fragment>
      <AppBar className={classes.aboveDrawer}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.flex}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
);

const MyDrawer = withStyles(styles)(
 
  ({ classes, variant, open, onClose, onItemClick , updateRowData , newRecordsList }) => (
    <Router  history={history} >
    <Drawer variant={variant} open={open} onClose={onClose}
                classes={{
                  paper: classes.drawerPaper
                }}
    >
      <div
        className={clsx({
          [classes.toolbarMargin]: variant === 'temporary'
        })}
      />
      <List>
        <ListItem button component={Link} to="/" onClick={onItemClick('Store Transactions')}>
        <ListItemIcon>{ <StorageIcon /> }</ListItemIcon>
          <ListItemText primary={"Store Transactions"} />
         
        </ListItem>

        
        <ListItem button component={Link} to="/records" onClick={onItemClick('Add records')}>
        <ListItemIcon>{ <AssessmentIcon /> }</ListItemIcon>
        
          <ListItemText>Add Records</ListItemText>
        </ListItem>
       {/*  <ListItem button component={Link} to="/add" onClick={onItemClick('Add Record')}>
        <ListItemIcon>{ <AssessmentIcon /> }</ListItemIcon>
        
          <ListItemText>Add Record</ListItemText>
        </ListItem> */}
        <ListItem button component={Link} to="/reports" onClick={onItemClick('Reports')}>
        <ListItemIcon>{ <AssessmentIcon /> }</ListItemIcon>
        
          <ListItemText>Reports</ListItemText>
        </ListItem>

       
      </List>
    </Drawer>
  
    <main className={classes.content}>
        <Route exact path="/" render={(props) => <GridView newRecordsList = {newRecordsList} />} />
        <Route path="/records"  render={(props) => <InputForm updateRowData = {updateRowData} />} />
        <Route path="/reports" component={Home} />
       
        
    </main>
    </Router>
  )
);

function AppBarInteraction({ classes, variant }) {

  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState('Store Transactions');
  const [newRecordsList, setNewRecordsList] = useState([])
 
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const updateRowData = newRowNode => {

    console.log(newRowNode);
    var list = newRecordsList
    list.push(newRowNode)
    
    //setNewRecordsList(newRecordsList => [...newRecordsList, newRowNode])
    setNewRecordsList(list)

    console.log(list)
    //console.log(newRecordsList)
    
    
  }

  const onItemClick = title => () => {
    setTitle(title);
    setDrawer(variant === 'temporary' ? false : drawer);
    setDrawer(!drawer);
  };



  return (
    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
        updateRowData = {updateRowData}
        newRecordsList = {newRecordsList}
      />
    </div>
  );
}

export default withStyles(styles)(AppBarInteraction);