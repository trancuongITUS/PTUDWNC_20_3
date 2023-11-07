import Button from '@mui/material/Button';

interface IButton {
  onClick?: () => void;
}

const ButtonUsage = ({ onClick }: IButton) => {
  return (
    <Button onClick={onClick} variant="contained">
      Button
    </Button>
  );
};

export default ButtonUsage;
