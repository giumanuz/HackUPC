import React, {useEffect, useState} from "react";
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

function App() {
  const [lang, _setLang] = useState("en");
  const [localization, setLocalization] = useState<Locale>({})

  const setLang = (lang: string) => {
    let modules = import.meta.glob("./translations/*.json");
    for (const path in modules) {
      modules[path]().then((mod) => {
        if (path.endsWith(lang + ".json")) {
          setLocalization(mod as Locale)
          _setLang(lang)
        }
      });
    }
  }

  useEffect(() => setLang("en"), []);


  return (
    <LangContext.Provider value={{ lang, setLang, locale: localization }}>
      <RouterProvider router={router} />
    </LangContext.Provider>
  );
}

export default App;
