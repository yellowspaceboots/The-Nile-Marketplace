import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router-dom'

const ListItemLink = (props) => {
  const { to, children } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} {...itemProps} innerRef={ref} />
      )),
    [to]
  )

  return (
    <li>
      <ListItem button component={renderLink} {...props}>
        {children}
      </ListItem>
    </li>
  )
}

export default ListItemLink
