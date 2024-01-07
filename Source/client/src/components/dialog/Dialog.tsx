import { X } from 'react-feather';
import { ReactNode } from 'react';

interface IDialog {
  open: boolean;
  onClose: () => void;
  content: ReactNode;
  footer: ReactNode;
  title?: string;
}

export default function Dialog({ open, onClose, title, content, footer }: IDialog) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors z-9999 ml-72.5
        ${open ? 'visible bg-black/20' : 'invisible'}
      `}
    >
      {/* modal */}
      <div
        onClick={e => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow p-1 transition-all
          ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
        `}
      >
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-3 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
            >
              <X />
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">{content}</div>
          {/*footer*/}
          <div className="flex items-center justify-center p-4 border-t border-solid border-blueGray-200 rounded-b">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
