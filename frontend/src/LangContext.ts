import React from "react";

type LangContextType = {
  lang: string;
  setLang: (lang: string) => any
}

const LangContext = React.createContext<LangContextType>({
  lang: "en",
  setLang: () => {}
})

export default LangContext