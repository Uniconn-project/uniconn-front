import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    // executed only on first render
    if (theme === null) {
      setTheme(window.localStorage.getItem('theme') || 'dark')
      return
    }

    // executed always except on first render
    const cssVariables = document.documentElement.style

    if (theme === 'dark') {
      cssVariables.setProperty('--background-dark', '#16161a')
      cssVariables.setProperty('--background-light', '#242629')
      cssVariables.setProperty('--headline', '#fffffe')
      cssVariables.setProperty('--paragraph', '#94a1b2')
      cssVariables.setProperty('--transparent', 'rgba(255, 255, 255, 0.02)')
      cssVariables.setProperty('--yellow', '#ffd803')

      window.localStorage.setItem('theme', 'dark')
    } else if (theme === 'light') {
      cssVariables.setProperty('--background-dark', 'white')
      cssVariables.setProperty('--background-light', '#efefef')
      cssVariables.setProperty('--headline', 'black')
      cssVariables.setProperty('--paragraph', '#72757e')
      cssVariables.setProperty('--transparent', '#f6f6f6')
      cssVariables.setProperty('--yellow', '#a79012')

      window.localStorage.setItem('theme', 'light')
    }
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
