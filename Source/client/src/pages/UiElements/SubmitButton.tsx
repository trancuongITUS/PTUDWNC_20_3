interface ISubmitButton {
  label?: string;
  isPending?: boolean;
}

const SubmitButton = ({ label, isPending }: ISubmitButton) => {
  return (
    <div className="mb-5">
      <input
        type="submit"
        value={isPending === true ? '...' : label || 'Submit'}
        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
      />
    </div>
  );
};

export default SubmitButton;
