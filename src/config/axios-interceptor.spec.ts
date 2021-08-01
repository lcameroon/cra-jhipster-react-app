/**
 * @jest-environment jsdom
 */
import axios from 'axios';
import sinon from 'sinon';

import setupAxiosInterceptors from './axios-interceptor';

describe('Axios Interceptor', () => {
  describe('setupAxiosInterceptors', () => {
    const client = axios;
    const onUnauthenticated = sinon.spy();
    setupAxiosInterceptors(onUnauthenticated);

    xit('onRequestSuccess is called on fulfilled request', () => {
      expect((client.interceptors.request as any).handlers[0].fulfilled({ data: 'foo', url: '/test' })).toMatchObject({
        data: 'foo',
      });
    });
    xit('onResponseSuccess is called on fulfilled response', () => {
      expect((client.interceptors.response as any).handlers[0].fulfilled({ data: 'foo' })).toEqual({ data: 'foo' });
    });
    xit('onResponseError is called on rejected response', () => {
      (client.interceptors.response as any).handlers[0].rejected({
        response: {
          statusText: 'NotFound',
          status: 403,
          data: { message: 'Page not found' },
        },
      });
      expect(onUnauthenticated).toBeDefined();
    });
  });
});
