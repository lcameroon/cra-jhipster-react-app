import React from 'react';
import { Translate, translate } from 'react-jhipster';

import MenuItem from './menu-item';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = (props) => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="asterisk" to="/bank-account">
      <Translate contentKey="global.menu.entities.bankAccount" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/label">
      <Translate contentKey="global.menu.entities.label" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/operation">
      <Translate contentKey="global.menu.entities.operation" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
