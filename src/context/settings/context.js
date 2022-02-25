import React, { useState } from 'react';

export const SettingsContext = React.createContext();

export default function Settings(props) {
  let [hide, setHide] = useState(false);
  let [display, setDisplay] = useState(3);
  let [sort, useSort] = useState('')

  
  return (
    <SettingsContext.Provider value={{hide, display, sort}}>
      {props.children}
    </SettingsContext.Provider>
  )
}