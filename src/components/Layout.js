import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Backspace from '@material-ui/icons/Backspace'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import WLogo from './WLogo'
import AppRouter from './AppRouter'
import ListItemLink from './ListItemLink'
import { Link } from 'react-router-dom'
import WidgetsIcon from '@material-ui/icons/Widgets'
import SettingsIcon from '@material-ui/icons/Settings'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import initialState from './requests'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import HomeIcon from '@material-ui/icons/Home'
import NestedNavigation from './NestedNavigation'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const Layout = (props) => {
  const { container } = props
  const classes = useStyles()
  const theme = useTheme()
  const openRequestCount = initialState.filter(request => request.status === 'Open' || request.status === 'Pending').length
  const [mobileOpen, setMobileOpen] = useState(false)
  function handleDrawerToggle () {
    setMobileOpen(!mobileOpen)
  }
  const navPadding = 44
  const drawer = (
    <React.Fragment>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: theme.palette.primary }}>
        <List style={{ padding: 15, marginTop: 75, flex: 1 }} subheader={<Typography variant='overline' style={{ color: 'lightgrey', fontWeight: 600, marginLeft: 18, marginBottom: 10 }}>Navigation</Typography>}>
          <ListItemLink to='/'>
            <ListItemIcon style={{ minWidth: navPadding }}>{<HomeIcon style={{ color: 'lightgrey' }} />}</ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' style={{ color: 'lightgrey' }}>Overview</Typography>} />
          </ListItemLink>
          <NestedNavigation padding={navPadding} icon={<WidgetsIcon style={{ color: 'lightgrey' }} />} title='Commercial Projects'>
            <ListItemLink to='/commercial-projects/request-log'>
              <ListItemText style={{ paddingLeft: navPadding }} inset disableTypography primary={<Typography variant='body2' style={{ color: 'lightgrey' }}>Request Log</Typography>} />
              <ListItemSecondaryAction style={{ zIndex: -1, backgroundColor: '#ffbb41', borderRadius: '50%', height: 20, minWidth: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='caption' style={{ margin: 4 }}>{openRequestCount}</Typography>
              </ListItemSecondaryAction>
            </ListItemLink>
            <ListItemLink to='/commercial-projects/material-status'>
              <ListItemText style={{ paddingLeft: navPadding }} inset disableTypography primary={<Typography variant='body2' style={{ color: 'lightgrey' }}>Material Status</Typography>} />
            </ListItemLink>
          </NestedNavigation>
          <NestedNavigation padding={navPadding} icon={<AttachMoneyIcon style={{ color: 'lightgrey' }} />} title='Accounting'>
            <ListItemLink to='/accounting/end-of-month'>
              <ListItemText style={{ paddingLeft: navPadding }} inset disableTypography primary={<Typography variant='body2' style={{ color: 'lightgrey' }}>End of Month</Typography>} />
            </ListItemLink>
          </NestedNavigation>
          <NestedNavigation padding={navPadding} icon={<SettingsIcon style={{ color: 'lightgrey' }} />} title='Settings'>
            <ListItemLink to='/settings/profile'>
              <ListItemText style={{ paddingLeft: navPadding }} inset disableTypography primary={<Typography variant='body2' style={{ color: 'lightgrey' }}>Profile</Typography>} />
            </ListItemLink>
            <ListItemLink to='/settings/account'>
              <ListItemText style={{ paddingLeft: navPadding }} inset disableTypography primary={<Typography variant='body2' style={{ color: 'lightgrey' }}>Account Settings</Typography>} />
            </ListItemLink>
          </NestedNavigation>
        </List>
        <Divider style={{ color: 'white' }} />
        <List>
          <ListItem button onClick={() => {
            props.login(false)
          }}>
            <ListItemIcon>{<Backspace style={{ color: 'lightgrey' }} />}</ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' style={{ color: 'lightgrey' }}>Log Out</Typography>} />
          </ListItem>
        </List>
      </div>
    </React.Fragment>
  )
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' elevation={0} className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/'>
            <WLogo size={34} color='#1e3f76' borderColor='white' borderSize={4} containerStyle={{ margin: 15, marginLeft: 0 }} />
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 5 }}>
            <Typography variant='h6' style={{ fontWeight: 700 }}>Wholesale Electric</Typography>
            <Typography variant='overline' style={{ marginTop: -12 }}>Tools</Typography>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            style={{ overflowX: 'hidden' }}
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            PaperProps={{
              style: {
                backgroundColor: '#1e3f76'
              }
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
            PaperProps={{
              style: {
                backgroundColor: '#1e3f76'
              }
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AppRouter />
      </main>
    </div>
  )
}

Layout.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object
}

export default Layout
