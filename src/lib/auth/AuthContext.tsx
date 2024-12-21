import { createContext } from 'react';
import type { User, AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType | null>(null);