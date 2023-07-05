import React from 'react';

import MenuItem from './menu-item';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = (props) => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="asterisk" to="/bank-account">
      Bank Account
    </MenuItem>
    <MenuItem icon="asterisk" to="/label">
      Labels
    </MenuItem>
  </NavDropdown>
);
