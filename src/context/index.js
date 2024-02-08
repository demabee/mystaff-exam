import { createContext, useContext } from 'react';

export const NavContext = createContext();

export const useCustomNavigation = () => useContext(NavContext);
