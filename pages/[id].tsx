import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/elements/Layout";

const PersonalPage: NextPage = () => {
  const [title, setTitle] = React.useState<any>("");
  const router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      if (router.query.id) {
        console.log(router.query.id);
        setTitle(router.query.id);
      }
    }, 1000);
  }, [router]);
  return (
    <Layout title={`${title}`}>
      <div>
        <div className="flex flex-col items-center justify-center w-full bg-white mt-4 rounded-lg gap-6 p-4">
          <div className="info w-full">
            <div className="info-cont bg-my-tosca text-text-color-dark p-2 rounded-md text-center">
              <h1 className="mb-2">Kirimkan pesan tidak dikaenal kepada</h1>
              <h1 className="font-bold text-4xl mb-2">{"Name"}</h1>
              <p className="text-sm text-main-bg">
                *semua kutipan dibawah bersifat anonim
              </p>
            </div>
          </div>
          <div className="text-input w-full">
            <textarea
              className="input input-bordered input-warning w-full mb-2 p-2 min-h-[120px] resize-none scrollbar text-lg text-text-color"
              placeholder="Masukan pesan disini..."
            />
            <button className="btn btn-primary w-full">
              <span>Kirim</span>
            </button>
          </div>
        </div>
        <div className="message-cont bg-my-tosca text-text-color-dark p-4 rounded-md text-center mt-4 flex flex-col gap-3">
          <div className="title-sec">
            <h2 className="text-lg font-bold">
              Pesan-pesan untuk <span>{"name"}</span>{" "}
            </h2>
          </div>
          <div className="message-wrapper px-3">
            <div className="message-item text-left text-sm">
              <div className="text-message">
                <div className="main-message">
                  <p className="mb-1">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quia placeat dignissimos modi et nihil possimus ipsum sit
                    distinctio ducimus! Maxime, odio earum.
                  </p>
                  <p className="time text-xs text-clr-info">10 Sep 2021</p>
                </div>
                <div className="reply-message pl-6 mt-3">
                  <p className="mb-1">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                  <p className="time text-xs text-clr-info">10 Sep 2021</p>
                </div>
                <div className="show-more-opt mt-3 flex items-center justify-center">
                  <button className="w-full text-clr-primary flex justify-center items-center gap-1 hover:text-clr-primary-light duration-200">
                    <span>Lihat balasan</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="reply-form mt-3">
                  <textarea
                    placeholder="Balas Pesan ini..."
                    className="input w-full p-2 bg-light-violet focus:outline-none border-slate-400 focus:border-slate-700 pr-4 h-20 scrollbar scrollbar-blk resize-none text-base"
                  />
                </div>
                <button className="btn btn-primary text-sm h-auto min-h-full w-full rounded-md py-3 text-white">
                  <span>Balas</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalPage;
