import React from 'react';
import qs from 'querystring';

export const checkDisplayToTop = () => document.body.scrollTop > 80 || document.documentElement.scrollTop > 80;

export const paramObj: any = search => {
  const parsed = decodeURIComponent(search.replace(/[?]/g, ''));
  let params: any = {};
  parsed.split('&').map(param => {
    const key = param.split('=')[ 0 ] ? param.split('=')[ 0 ] : '';
    const value = param.split('=')[ 1 ] ? param.split('=')[ 1 ] : '';
    if (key) {
      params = {
        ...params,
        [ key ]: value
      };
    }
  });
  return params;
};
