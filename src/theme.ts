import { Theme } from '@emotion/react';

const color = {
  black: '#212529',
  dark: '#191a20',
  stone: '#444444',
  'light-dark': '#E8F0FE',
  primary: '#2C3E76',
  secondary: '#969fbb',
  white: '#ffffff',
  light: '#f5f5f5',
  gray: '#ced4da',
  'secondary-gray': '#b6b6b6',
  disabled: '#e9ecef',
  red: '#ff0000',
  blue: '#1180ff',
};

const theme: Theme = {
  colors: {
    black: color.black,
    dark: color.dark,
    stone: color.stone,
    'light-dark': color['light-dark'],
    primary: color.primary,
    secondary: color.secondary,
    white: color.white,
    light: color.light,
    gray: color.gray,
    'secondary-gray': color['secondary-gray'],
    disabled: color.disabled,
    red: color.red,
    blue: color.blue,
  },
};

export default theme;
