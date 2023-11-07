import { useCallback, useState } from 'react';
import Button from '../components/ui/Button';

const Home = () => {
  // test
  const [count, setCount] = useState(0);

  const addCount = useCallback(() => {
    setCount(pre => ++pre);
  }, []);
  return (
    <>
      <h3>Count: {count}</h3>
      <Button onClick={addCount} />
    </>
  );
};

export default Home;
