import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';

import { config } from '../../../config/constants';

export const BrandIcon = (props) => (
  <div {...props} className="brand-icon">
    <img src="/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = (props) => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">{config.APP_NAME}</span>
    <span className="navbar-version">{config.VERSION}</span>
  </NavbarBrand>
);

export const Home = (props) => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <span>Home</span>
    </NavLink>
  </NavItem>
);
