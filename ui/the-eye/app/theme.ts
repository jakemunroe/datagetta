'use client'

import createTheme from "@mui/material/styles/createTheme";

export const Theme = createTheme({

    palette: {
        primary: {
            main: '#0b2341',
            light: '#233954',
            contrastText: '#fff',
        },

        secondary: {
            main: '#e86100',
            light: '#ea711a',
            dark: '#cc4e0b',
            contrastText: '#fff',
        },

        text: {
            primary: 'rgba(11, 35, 65, 1)',
            secondary: 'rgba(11, 35, 65, 0.6)',
            disabled: 'rgba(11, 35, 65, 0.38)',
        },
    },

});