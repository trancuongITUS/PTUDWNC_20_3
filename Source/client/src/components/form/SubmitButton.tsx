interface ISubmitButton {
  label?: string;
  isPending?: boolean;
  disable?: boolean;
  onClick?: () => void;
}

const SubmitButton = ({ label, isPending, onClick, disable }: ISubmitButton) => {
  return (
    <div>
      <button
        type={'button'}
        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        onClick={onClick}
        disabled={disable}
      >
        {isPending ? '...' : label}
      </button>
    </div>
  );
};

export default SubmitButton;
