import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import HrtCssVars from './ThemeCssVars'
import useSettings from 'hooks/useSettings'

// import cssVars from "css-vars-ponyfill";

const HrtTheme = ({ children }) => {
    const { settings } = useSettings()
    let activeTheme = { ...settings.themes[settings.activeTheme] }
    // console.log(activeTheme)
    // cssVars();
    // activeTheme.direction = settings.direction;
    return (
        <ThemeProvider theme={activeTheme}>
            <CssBaseline />
            <HrtCssVars> {children} </HrtCssVars>
        </ThemeProvider>
    )
}

export default HrtTheme
