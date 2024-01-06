import Loader from '../../common/Loader';
import classNames from 'classnames';

interface ISubmitButton {
  label?: string;
  isPending?: boolean;
  submit?: boolean;
  transparent?: boolean;
  onClick?: () => void;
  disable?: boolean;
}

const Button = ({ label, isPending, submit, transparent, onClick, disable }: ISubmitButton) => {
  return (
    <div>
      <button
        type={submit ? 'submit' : 'button'}
        className={classNames(
          'w-full items-center justify-center rounded-md border border-primary py-3 px-10 text-center font-medium  lg:px-8 xl:px-10',
          {
            ' text-white  bg-primary ': !transparent,
            ' text-primary ': transparent,
            'hover:bg-opacity-90': !disable,
            'opacity-30': disable,
          }
        )}
        onClick={onClick}
        disabled={disable}
      >
        {isPending ? <Loader /> : label}
      </button>
    </div>
  );
};

export default Button;
