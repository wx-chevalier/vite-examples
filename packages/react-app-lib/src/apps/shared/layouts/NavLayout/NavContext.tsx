import { IAuthorityType } from '@m-fe/react-commons';
import { createContext } from 'react';

export interface NavContextProps {
  authority?: IAuthorityType;
  onAuthorityChange?: (authority: IAuthorityType) => void;
  tabUtil?: {
    addTab: (id: string) => void;
    removeTab: (id: string) => void;
  };
  updateActive?: (activeItem: { [key: string]: string } | string) => void;
}

export const NavContext: React.Context<NavContextProps> = createContext({});
