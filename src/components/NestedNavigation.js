import React, { useState } from 'react'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const NestedNavigation = ({ icon, padding, title, children }) => {
  const [open, setOpen] = useState(false)
  const fontSize = 16
  return (
    <React.Fragment>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon style={{ minWidth: padding }}>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={<Typography variant='body2' style={{ color: 'lightgrey' }}>{title}</Typography>} />
        {open ? <ExpandLess style={{ color: 'lightgrey', fontSize }} /> : <ExpandMore style={{ color: 'lightgrey', fontSize }} />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List dense>
          {children}
        </List>
      </Collapse>
    </React.Fragment>
  )
}

export default NestedNavigation
