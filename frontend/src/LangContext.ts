import React from "react";

type LangContextType = {
  lang: string;
  setLang: (lang: string) => any;
  locale: Locale
}

const LangContext = React.createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  locale: {}
})

export default LangContext