import React from 'react';

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

export const getSchoolYear = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const schoolYearList = [];
  for (let i = -10; i <= 30; i++) {
    schoolYearList.push({
      label: `${currentYear - i - 1} - ${currentYear - i}`,
      value: `${currentYear - i - 1} - ${currentYear - i}`
    });
  }
  return schoolYearList;
};

export const getGroupOfClass = (degreeNumber = '3') => {
  const groupOfClassList = [];
  let start;
  let end;
  if (degreeNumber === '1') {
    start = 1;
    end = 5;
  } else if (degreeNumber === '2') {
    start = 6;
    end = 9;
  } else if (degreeNumber === '3') {
    start = 10;
    end = 12;
  }
  for (let i = start; i <= end; i++) {
    groupOfClassList.push({
      label: `Khối ${i}`,
      value: `${i}`
    });
  }
  return groupOfClassList;
};
