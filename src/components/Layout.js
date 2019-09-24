import React, { useState } from 'react'
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
import { makeStyles, useTheme, fade } from '@material-ui/core/styles'
import WLogo from './WLogo'
import AppRouter from './AppRouter'
import ListItemLink from './ListItemLink'
import { Link } from 'react-router-dom'
import WidgetsIcon from '@material-ui/icons/Widgets'
import SettingsIcon from '@material-ui/icons/Settings'
// import initialState from './requests'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import HomeIcon from '@material-ui/icons/Home'
import NestedNavigation from './NestedNavigation'
import { accountsClient } from '../client'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { useApolloClient } from '@apollo/react-hooks'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import Badge from '@material-ui/core/Badge'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import Avatar from '@material-ui/core/Avatar'
import AlarmIcon from '@material-ui/icons/Alarm'
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import moment from 'moment'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10,
    marginLeft: 0
  },
  blueAvatar: {
    margin: 10,
    marginLeft: 0,
    color: '#fff',
    backgroundColor: theme.palette.primary.main
  },
  yellowAvatar: {
    margin: 10,
    marginLeft: 0,
    color: '#fff',
    backgroundColor: theme.palette.secondary.main
  },
  greenAvatar: {
    margin: 10,
    marginLeft: 0,
    color: '#fff',
    backgroundColor: 'green'
  },
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
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    marginRight: 10,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}))

const Layout = ({ history, ...props }) => {
  const myClient = useApolloClient()
  const { container } = props
  const classes = useStyles()
  const theme = useTheme()
  // const openRequestCount = initialState.filter(request => request.status === 'Open' || request.status === 'Pending').length
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const notificationClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const notificationClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  function handleDrawerToggle () {
    setMobileOpen(!mobileOpen)
  }
  const onLogout = async () => {
    await accountsClient.logout()
    history.push('/login')
    myClient.resetStore()
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
            </ListItemLink>
            <ListItemLink to='/commercial-projects/calendar'>
              <ListItemText style={{ paddingLeft: navPadding }} inset disableTypography primary={<Typography variant='body2' style={{ color: 'lightgrey' }}>Calendar</Typography>} />
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
            <ListItemLink to='/settings/users'>
              <ListItemText style={{ paddingLeft: navPadding }} inset disableTypography primary={<Typography variant='body2' style={{ color: 'lightgrey' }}>User Management</Typography>} />
            </ListItemLink>
          </NestedNavigation>
        </List>
        <Divider style={{ color: 'white' }} />
        <List>
          <ListItem button onClick={() => onLogout()}>
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
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 6, flexGrow: 1 }}>
            <Typography variant='h6' style={{ fontWeight: 700 }}>Wholesale Electric</Typography>
            <Typography variant='overline' style={{ marginTop: -14 }}>Supply Company of Houston</Typography>
          </div>
          <Hidden xsDown implementation='css'>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Hidden>
          <Hidden smUp implementation='css'>
            <IconButton
              color='inherit'
              aria-label='search'
              edge='start'
            >
              <SearchIcon />
            </IconButton>
          </Hidden>
          <IconButton
            color='inherit'
            aria-label='Notifications'
            edge='end'
            onClick={notificationClick}
          >
            <Badge color='secondary' overlap='circle' variant='dot'>
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
          <Menu
            id='fade-menu'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={notificationClose}
            TransitionComponent={Fade}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <Typography variant='body1' style={{ padding: 20, fontWeight: 700, width: 400 }}>Notifications</Typography>
            <Divider />
            <MenuItem onClick={notificationClose}>
              <ListItemIcon>
                <Avatar className={classes.yellowAvatar}>
                  <AlarmIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant='body2'>Project Bidding Soon</Typography>}
                secondary={<Typography color='textSecondary' variant='body2'>{moment(new Date()).fromNow()}</Typography>}
              />
            </MenuItem>
            <MenuItem onClick={notificationClose}>
              <ListItemIcon>
                <Avatar className={classes.blueAvatar}>
                  <AssignmentLateIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant='body2'>New Project Added</Typography>}
                secondary={<Typography color='textSecondary' variant='body2'>{moment(new Date()).fromNow()}</Typography>}
              />
            </MenuItem>
            <MenuItem onClick={notificationClose}>
              <ListItemIcon>
                <Avatar className={classes.greenAvatar}>
                  <AnnouncementIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant='body2'>New Message for Project</Typography>}
                secondary={<Typography color='textSecondary' variant='body2'>{moment(new Date()).fromNow()}</Typography>}
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={notificationClose}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <NotificationsNoneIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant='body2'>See All Notifications</Typography>}
              />
            </MenuItem>
          </Menu>
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

export default Layout
