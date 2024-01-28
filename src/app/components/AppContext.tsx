import { createContext } from 'react';
import { IUser } from '../models/models';

export const AppContext = createContext<IUser[]>([]);
