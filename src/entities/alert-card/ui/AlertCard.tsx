import { Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import { redirect } from "next/dist/server/api-utils";
import { Fragment } from "react";
import { CheckMark } from "shared/icons/CheckMark";
import { Loader } from "shared/ui/Loader/Loader";

const AlertCard = ({
  isOpen,
  closeModal,
  loading,
  redirect,
}: {
  isOpen: boolean;
  closeModal: () => void;
  loading: boolean;
  redirect: () => void;
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              ></Dialog.Title>
              <div className="flex flex-col items-center justify-center mt-2">
                <p className="text-lg text-gray-500 mb-10">
                  {loading
                    ? "Сreating your Buylist..."
                    : "Buylist successfully created"}
                </p>
                {loading ? (
                  <Loader color="#4f46e5" className="h-24" />
                ) : (
                  <CheckMark />
                )}
              </div>

              <div className="mt-10">
                <div className="flex items-center justify-between gap-4 w-full mt-8">
                  {!loading && (
                    <>
                      <button
                        onClick={() => redirect()}
                        type="button"
                        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      >
                        Open
                      </button>
                      <button
                        onClick={() => closeModal()}
                        type="button"
                        className="py-2 px-4 bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AlertCard;
