import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Divider />
      <Link to="/login">login</Link>
    </div>
  );
};

export default Header;
