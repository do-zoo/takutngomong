import { FC, PropsWithChildren, useState } from "react";

interface Props {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
}

const PopupModal: FC<PropsWithChildren<Props>> = (props) => {
  const { isOpen, onClose, isLoading, children } = props;
  const [show, setShow] = useState<boolean>(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div
        className={`${
          !isOpen ? "hidden" : ""
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-70 duration-300`}
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <button
              type="button"
              className={`${
                isLoading && "hidden"
              } absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center`}
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {/* content */}
            <div className="p-6 text-center text-[#0C142E]">
              {/* <svg
                className="mx-auto mb-4 w-14 h-14 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                Are you sure you want to delete this product?
              </h3>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I&apos; m sure
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
              >
                No, cancel
              </button> */}
              {isLoading ? <LoadingModal /> : children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupModal;

function LoadingModal() {
  return (
    <div className="loader-inner ball-clip-rotate">
      <div className="ball-clip-rotate-inner mx-auto text-main-bg h-16 flex justify-center items-center">
        <div className="dot-spin relative w-2 h-2 rounded-full bg-transparent mx-auto shadow-[0_-18px_0_0_#FFB017,12.72984px_-12.72984px_0_0_#FFB017,_18px_0_0_0_#FFB017,12.72984px_12.72984px_0_0_rgba(152,128,255,0),_0_18px_0_0_rgba(152,128,255,0),-12.72984px_12.72984px_0_0_rgba(152,128,255,0),-18px_0_0_0_rgba(152,128,255,0),-12.72984px_-12.72984px_0_0_rgba(152,128,255,0)] animate-spin-dot"></div>
      </div>
      <div className="text-loading mt-3">
        <h1>Please Wait...</h1>
      </div>
    </div>
  );
}
