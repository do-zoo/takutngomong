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
          href={`whatsapp://send?text=Kirim%20pesan%20rahasia%20kepada%20saya%20di%20%20https%3A%2F%2Ftakutngomong.vercel.app%2F`}
          className="bg-[#17953A] text-[#E7E7F4] font-semibold hover:bg-[#108531] px-5 py-3 rounded-md flex items-center justify-between gap-2 duration-150 mx-auto"
          // onclick share link
          target="_blank"
          rel="noreferrer"
        >
          <span className="uppercase">Share</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 rotate-90"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
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
