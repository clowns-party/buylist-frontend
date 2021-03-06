import { Dialog, Transition } from "@headlessui/react";
import { FC } from "react";
import { Fragment } from "react";

export type ModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  variant?: keyof typeof Variants;
};

const Modal: FC<ModalProps> = ({
  closeModal,
  isOpen,
  children,
  variant = "default",
}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className={Variants[variant]}> {children}</div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const Variants = {
  default:
    "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl",
  transparent:
    "inline-block overflow-hidden text-left align-middle transition-all transform",
};

export default Modal;
