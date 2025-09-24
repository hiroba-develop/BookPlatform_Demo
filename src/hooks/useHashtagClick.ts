import { useNavigate } from 'react-router-dom';

export const useHashtagClick = () => {
  const navigate = useNavigate();

  const handleHashtagClick = (tag: string) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  return { handleHashtagClick };
};
