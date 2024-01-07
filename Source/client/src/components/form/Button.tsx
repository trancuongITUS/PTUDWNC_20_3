import classNames from 'classnames';

export interface ISubmitButton {
  label?: string;
  isPending?: boolean;
  transparent?: boolean;
  onClick?: () => void;
  disable?: boolean;
}

const Button = ({ label, isPending, transparent, onClick, disable }: ISubmitButton) => {
  return (
    <div>
      <button
        type="button"
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
        {isPending ? '...' : label}
      </button>
    </div>
  );
};

export default Button;
