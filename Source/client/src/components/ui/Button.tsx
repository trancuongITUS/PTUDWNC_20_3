import Button from '@mui/material/Button';

interface IButton {
  onClick?: () => void;
}

const ButtonUsage = ({ onClick }: IButton) => {
  return (
    <Button onClick={onClick} className="bg-black text-white text-3xl font-bold">
      Button
    </Button>
  );
};

export default ButtonUsage;
