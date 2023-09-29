import React, { createContext } from 'react';
import { cloneElement } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, title }) {
  const { openName, close } = useContext(ModalContext);
  //  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div className="relative mx-auto my-6 w-auto max-w-sm">
        {/*content*/}
        <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
            <h3 className="text-3xl font-semibold">Delete confirmation</h3>
            <button
              className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black  opacity-50 outline-none focus:outline-none"
              onClick={close}
            >
              <HiXMark />
            </button>
          </div>
          <div className="relative flex-auto p-6">
            <div>{cloneElement(children, { onCloseModal: close })}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
