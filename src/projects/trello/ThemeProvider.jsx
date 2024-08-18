import { createContext, useState } from "react";
export const ThemeContext = createContext(null);
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  function toggleTheme() {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }
  const themeObj = {
    theme: theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeObj}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
