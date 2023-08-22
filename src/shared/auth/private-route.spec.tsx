/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { AUTHORITIES } from '../../config/constants';
import { hasAnyAuthority } from './hasAnyAuthority';

const PrivateRouteComponent = (props: any) => <></>;
const TestComp = () => <div>Test</div>;

describe('private-route component', () => {
  const mockStore = configureStore([thunk]);
  const wrapper = (Elem: JSX.Element, auth) => {
    const store = mockStore({ auth });
    return render(<Provider store={store}>{Elem}</Provider>);
  };

  // All tests will go here
  it.skip('Should throw error when no component is provided', () => {
    const originalError = console.error;
    console.error = jest.fn();
    expect(() =>
      wrapper(<PrivateRouteComponent component={null} path="/" />, {
        isAuthenticated: true,
        sessionHasBeenFetched: true,
        account: {
          authorities: [],
        },
      }),
    ).toThrow(Error);
    console.error = originalError;
  });

  it.skip('Should render an error message when the user has no authorities', () => {
    const history = createMemoryHistory();
    const { container } = wrapper(
      <Router history={history}>
        <PrivateRouteComponent component={TestComp} path="/" />
      </Router>,
      {
        isAuthenticated: true,
        sessionHasBeenFetched: true,
        account: {
          authorities: [],
        },
      },
    );
    expect(container.innerHTML).toEqual(
      '<div class="insufficient-authority"><div class="alert alert-danger"><span>You are not authorized to access this page.</span></div></div>',
    );
  });

  it.skip('Should render a route for the component provided when authenticated', () => {
    const history = createMemoryHistory();
    const { container } = wrapper(
      <Router history={history}>
        <PrivateRouteComponent component={TestComp} path="/" />
      </Router>,
      {
        isAuthenticated: true,
        sessionHasBeenFetched: true,
        account: {
          authorities: ['ADMIN'],
        },
      },
    );
    expect(container.innerHTML).toEqual('<div>Test</div>');
  });

  it.skip('Should render a redirect to login when not authenticated', () => {
    const history = createMemoryHistory();
    const { container } = wrapper(
      <Router history={history}>
        <PrivateRouteComponent exact component={TestComp} path="/" />
      </Router>,
      {
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        account: {
          authorities: ['ADMIN'],
        },
      },
    );
    expect(container.innerHTML).not.toEqual('<div>Test</div>');
  });
});

describe('hasAnyAuthority', () => {
  // All tests will go here
  it.skip('Should return false when authorities is invalid', () => {
    expect(hasAnyAuthority(undefined as any, undefined as any)).toEqual(false);
    expect(hasAnyAuthority(null as any, [])).toEqual(false);
    expect(hasAnyAuthority([], [])).toEqual(false);
    expect(hasAnyAuthority([], [AUTHORITIES.USER])).toEqual(false);
  });

  it.skip('Should return true when authorities is valid and hasAnyAuthorities is empty', () => {
    expect(hasAnyAuthority([AUTHORITIES.USER], [])).toEqual(true);
  });

  it.skip('Should return true when authorities is valid and hasAnyAuthorities contains an authority', () => {
    expect(hasAnyAuthority([AUTHORITIES.USER], [AUTHORITIES.USER])).toEqual(true);
    expect(hasAnyAuthority([AUTHORITIES.USER, AUTHORITIES.ADMIN], [AUTHORITIES.USER])).toEqual(true);
    expect(hasAnyAuthority([AUTHORITIES.USER, AUTHORITIES.ADMIN], [AUTHORITIES.USER, AUTHORITIES.ADMIN])).toEqual(true);
    expect(hasAnyAuthority([AUTHORITIES.USER, AUTHORITIES.ADMIN], [AUTHORITIES.USER, 'ROLEADMIN'])).toEqual(true);
    expect(hasAnyAuthority([AUTHORITIES.USER, AUTHORITIES.ADMIN], [AUTHORITIES.ADMIN])).toEqual(true);
  });

  it.skip('Should return false when authorities is valid and hasAnyAuthorities does not contain an authority', () => {
    expect(hasAnyAuthority([AUTHORITIES.USER], [AUTHORITIES.ADMIN])).toEqual(false);
    expect(hasAnyAuthority([AUTHORITIES.USER, AUTHORITIES.ADMIN], ['ROLE_USERSS'])).toEqual(false);
    expect(hasAnyAuthority([AUTHORITIES.USER, AUTHORITIES.ADMIN], ['ROLEUSER', 'ROLEADMIN'])).toEqual(false);
  });
});
