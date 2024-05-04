import React, { useState } from "react";
import LangContext from "./LangContext.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);
const locales = ["en", "es"];

function App() {
  const [lang, _setLang] = useState("en");

  function setLang(lang: string) {
    // Load json translation file
    let modules = import.meta.glob("./translations/*.json");
    for (const path in modules) {
      modules[path]().then((mod) => {
        console.log(path, mod);
      });
    }
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <RouterProvider router={router} />
    </LangContext.Provider>
  );
}

export default App;
