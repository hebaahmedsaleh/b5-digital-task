import { createContext } from 'react';

export const PaginationContext = createContext<{
  page: number;
  goToPage: (item: number) => void;
}>({
  page: 1,
  goToPage: (item) => null,
});
