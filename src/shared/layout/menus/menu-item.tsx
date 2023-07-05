import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';

export interface IMenuItem {
  icon: string;
  to: string;
  id?: string;
  'data-cy'?: string;
}

const MenuItem: React.FC<IMenuItem> = (props) => {
  const { to, icon, id, children } = props;

  return (
    <DropdownItem tag={Link} to={to} id={id} data-cy={props['data-cy']}>
      <span title={icon}>{children}</span>
    </DropdownItem>
  );
};

export default MenuItem;
