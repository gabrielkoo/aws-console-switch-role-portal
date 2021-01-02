import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const TopBar: React.FC = () => (
  <AppBar position="absolute">
    <Toolbar>
      <Typography component="h1">
          AWS Console Switch Role Portal
      </Typography>
    </Toolbar>
  </AppBar>
);

export default TopBar;
