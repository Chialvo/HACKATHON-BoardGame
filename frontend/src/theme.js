// src/theme.js

export const colors = {
  primary:    "#74abdf",  // celeste principal
  secondary:  "#ecab1c",  // amarillo
  accent:     "#75AADB",  // celeste secundario
  dark:       "#3a7ab5",  // sombra / hover del primario
  bg:         "#e8f1fb",  // fondo de la app
  bgCard:     "#ffffff",
  border:     "#d0e4f5",
};

export const shadows = {
  primary:   `0 4px 0 #4c82b4`,
  secondary: `0 4px 0 #a07210`,
  text:      `3px 3px 0px #ecab1c, 6px 6px 0px rgba(0,0,0,0.08)`,
  textSmall: `2px 2px 0 #ecab1c`,
};

export const fonts = {
  fwc: { fontFamily: "FWC26, sans-serif" },
};

export const antTheme = {
  token: {
    colorPrimary:      "#74abdf",
    colorWarning:      "#ecab1c",
    colorInfo:         "#75AADB",
    colorBgContainer:  "#ffffff",
    borderRadius:      10,
    fontFamily:        "FWC26, sans-serif",
  },
};