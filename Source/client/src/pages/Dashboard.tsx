import { useCallback, useState } from 'react';
import Button from '../components/ui/Button';

const Dashboard = () => {
  // test
  const [count, setCount] = useState(0);

  const addCount = useCallback(() => {
    setCount(pre => ++pre);
  }, []);
  return (
    <div>
      <h3>Count: {count}</h3>
      <Button onClick={addCount} />
    </div>
  );
};

export default Dashboard;
