import { createContext, useContext } from "react";

export const RealmContext = createContext();

export const useRealm = () => useContext(RealmContext);
