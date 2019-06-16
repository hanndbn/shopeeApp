import React from 'react';
import { DropdownItem } from 'reactstrap';
// import { NavDropdown } from '../header-components';
import { languages } from 'app/config/translation';

export const LocaleMenu = ({ currentLocale, onClick }) => Object.keys(languages).length > 1;
