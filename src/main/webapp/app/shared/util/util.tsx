import React from 'react';
import qs from 'querystring';

export const paramObj = search => {
  const parsed = decodeURIComponent(search.replace(/[?]/g, '')).replace(/\+/g, ' ');
  return qs.parse(parsed);
};

export const checkDisplayToTop = () => document.body.scrollTop > 80 || document.documentElement.scrollTop > 80;

