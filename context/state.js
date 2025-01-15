"use client"
import { createContext, useContext, useEffect, useState } from "react"
import parse from "html-react-parser"
const AppContext = createContext()

export function AppWrapper({ children }) {
  const [ctxLanguage, setCtxLanguage] = useState("sr_sr")
  const [data, setData] = useState({})
  useEffect(() => {
    setData(require(`../lang/${ctxLanguage}.json`))
  }, [ctxLanguage])

  return (
    <AppContext.Provider value={[ctxLanguage, setCtxLanguage, data]}>
      {children}
    </AppContext.Provider>
  )
}
export function useAppContext() {
 return useContext(AppContext)
} 

export default function Translated({ Key, parsed = false }) {
  //   use it like this
  //  <Translated Key='HEADER_test1'/>

  const [lang, setLang, data] = useAppContext()
  if (parsed) {
    return <>{data[Key] ? parse(data[Key]) : Key}</>
  } else {
    return <>{data[Key] ? data[Key] : Key}</>
  }
}

export const UseTranslate = () => {
  const [lang, setLang, data] = useAppContext()
  return (Key, parsed = false) => {
    if (parsed) {
      return data[Key] ? parse(data[Key]) : Key
    } else {
      return data[Key] ? data[Key] : Key
    }
  }
}
