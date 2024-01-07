import Button, { ISubmitButton } from '../form/Button';
import Dialog from './Dialog';

interface IConfirmButton extends ISubmitButton {
  isOpen: boolean;
  close: () => void;
  onSubmit: () => void;
  title: string;
  message: string;
}

const ConfirmButton = ({ isOpen, close, onSubmit, title, message, ...rest }: IConfirmButton) => {
  // content dialog
  const content = (
    <div className="text-center">
      <div className="mx-auto">
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );

  // footer dialog
  const footer = (
    <div className="flex justify-center gap-4">
      <Button label="Cancel" transparent onClick={close} />
      <Button label="Confirm" isPending={rest.isPending} onClick={onSubmit} />
    </div>
  );
  return (
    <>
      {/* button */}
      <Button {...rest} />

      {/* dialog */}
      <Dialog open={isOpen} onClose={close} title={title} content={content} footer={footer} />
    </>
  );
};

export default ConfirmButton;
