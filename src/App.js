import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import BookLists from "./components/BookLists";
import AddBook from "./components/AddBook";
import themeConfig from "./theme";
import Layout from "./components/Layout";

const client = new ApolloClient({
  uri: "/graphql"
});

const useDarkMode = () => {
  const [theme, setTheme] = useState(themeConfig);

  const {
    palette: { type }
  } = theme;

  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === "light" ? "dark" : "light"
      }
    };
    setTheme(updatedTheme);
  };

  return [theme, toggleDarkMode];
};

function App() {
  const [theme, toggleDarkMode] = useDarkMode();
  const themeConfig = createMuiTheme(theme);

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={themeConfig}>
        <CssBaseline />
        <Layout onToggle={toggleDarkMode}>
          <div>
            <BookLists />
            <AddBook />
          </div>
        </Layout>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
