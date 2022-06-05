import type { NextPage } from "next";
import Router from "next/router";
import { FC, useState } from "react";
import Layout from "../components/elements/Layout";
import PopupModal from "../components/molecules/popupModal";

const Home: NextPage = () => {
  const [input, setInput] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  // const [data, setData] = useState<any>();
  const handleClick = async () => {
    setIsLoading(true);
    setIsModalOpen(true);
    if (!input || input.length < 3) {
      return;
    }
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: input }),
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      setIsLoading(false);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout title="Selamat datang">
      <PopupModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        onClose={() => setIsModalOpen(false)}
      >
        {data && <PopupChild data={data} />}
      </PopupModal>
      <div className="flex flex-col items-center justify-center w-full bg-white mt-4 rounded-lg">
        <div className="info p-4 w-full">
          <div className="info-cont text-left bg-my-tosca text-text-color-dark p-2 rounded-md">
            <ul className="list-disc list-outside pl-8">
              <li>
                Dapatkan umpan balik anonim dari Teman &#38; Rekan Kerja Anda.
              </li>
              <li>
                Tingkatkan Persahabatan Anda dengan menemukan Kekuatan dan area
                untuk Peningkatan Anda.
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full px-4 flex flex-col mb-4">
          <input
            type="text"
            placeholder="Masukan namamu disini..."
            className="input input-bordered input-warning w-full mb-2"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              handleClick();
            }}
          >
            <span>Bergabung</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

interface PropsModal {
  data: any;
}

const PopupChild: FC<PropsModal> = (props) => {
  const { data } = props;
  console.log(data);

  const [isCopySuccess, setIsCopySuccess] = useState<boolean>(false);
  return (
    <>
      <div className="title text-2xl font-semibold mb-2">
        <h1>Hore... 👏</h1>
      </div>
      <div className="text-container">
        <h3 className="mb-5 text-lg font-normal ">
          Halaman anda telah di buat
        </h3>
      </div>
      <div className="info mb-5">
        <div className="info-cont bg-[#E7E7F4] text-[#1F1F28] px-3 py-3 rounded-md text-left relative">
          <input
            className="w-full pr-24"
            type="text"
            disabled
            value={`${window.location.origin}/${data._id}`}
          />
          {/* create button copy text */}
          <button
            className="absolute right-0 top-0 bg-[#C4C4D0] text-[#41485E] font-semibold hover:bg-[#9696AC]  px-3 py-3 rounded-r-md flex items-center justify-between gap-2 duration-150"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/${data._id}`
              );
              setIsCopySuccess(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
              <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
            </svg>
            Copy
          </button>
        </div>
        {isCopySuccess && (
          <div className="copied mt-2">
            <span className="text-sm ">Copied</span>
          </div>
        )}
      </div>
      <div className="button-modal flex justify-center mt-10">
        <a
          href={`whatsapp://send?text=Kirim%20pesan%20rahasia%20kepada%20saya%20di%20%20https%3A%2F%2Ftakutngomong.vercel.app%2F${data._id}`}
          className="bg-[#17953A] text-[#E7E7F4] font-semibold hover:bg-[#108531] px-5 py-3 rounded-md flex items-center justify-between gap-2 duration-150 mx-auto"
          // onclick share link
          target="_blank"
          rel="noreferrer"
        >
          <span className="uppercase">Share</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <title>Logo Whatsapp</title>
            <path
              d="M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z"
              fillRule="evenodd"
            />
          </svg>
        </a>
        <button
          className="bg-[#230DDF] text-[#E7E7F4] font-semibold hover:bg-[#1C1085] px-5 py-3 rounded-md flex items-center justify-between gap-2 duration-150 mx-auto"
          // onclick share link
          onClick={() => {
            Router.push(`/${data._id}`);
          }}
        >
          <span className="uppercase">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
};
