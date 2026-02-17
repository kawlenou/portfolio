import { useContent } from '../contexts/ContentContext';

const usePortfolioContent = () => {
  const { content } = useContent();
  return content;
};

export default usePortfolioContent;
