import { useState } from 'react';

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const goTo = (page: number) => setCurrentPage(page);

  return { goTo, currentPage };
};

export default usePagination;
