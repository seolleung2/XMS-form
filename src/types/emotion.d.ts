import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      black: string;
      dark: string;
      stone: string;
      'light-dark': string;
      primary: string;
      secondary: string;
      white: string;
      light: string;
      gray: string;
      'secondary-gray': string;
      disabled: string;
      red: string;
      blue: string;
    };
  }
}
