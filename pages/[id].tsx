import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../components/elements/Layout";

type Data = any;

function DateDMYToStr(date: Date) {
  const month = date.toLocaleString("en-us", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

const PersonalPage: NextPage = () => {
  const [data, setData] = useState<Data>();
  const [commentInput, setCommentInput] = useState<string>("");
  const [messageInput, setMessageInput] = useState<string>("");
  const [rplyMsgOpen, setRplyMsgOpen] = useState<boolean>(false);

  console.log(commentInput?.length);

  const router = useRouter();
  useEffect(() => {
    if (router.query.id) {
      fetch(`/api/user?id=${router.query.id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query.id]);

  const handleGetComment = async (id: string) => {
    if (!data?.data) return;
    const messageId = data?.data.find((d: any) => d._id === id);
    if (
      messageId &&
      messageId.comment.length > 0 &&
      !messageId.comment[0]._id
    ) {
      await fetch(`/api/comment?id=${messageId._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData((prev: any) => {
            const newData = prev?.data?.map((d: any) => {
              if (d._id === messageId._id) {
                d.comment = data.comment;
              }
              return d;
            });

            return { ...prev, data: newData };
          });
        });
    }
    setRplyMsgOpen(!rplyMsgOpen);
  };

  const handleAddComment = async (id: string, comment: string) => {
    if (!data?.data) return;
    const messageId = data?.data.find((d: any) => d._id === id);
    if (
      messageId &&
      messageId.comment.length > 0 &&
      !messageId.comment[0]._id
    ) {
      await fetch(`/api/comment?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: comment,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data._id === id) {
            handleGetComment(id);
          }
          setCommentInput("");
        });
    }
    setRplyMsgOpen(true);
  };

  const handleAddMessage = async (message: string) => {
    if (!data?.data) return;
    await fetch(`/api/message?id=${data._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setData((prev: any) => {
        //   const newData = [...prev?.data, data];
        //   return { ...prev, data: newData };
        // });
      });
  };
  console.log(data);

  return (
    <Layout title={data?.name || "Personal Page"}>
      <div>
        <div className="flex flex-col items-center justify-center w-full bg-white mt-4 rounded-lg gap-6 p-4">
          <div className="info w-full">
            <div className="info-cont bg-my-tosca text-text-color-dark p-2 rounded-md text-center">
              <h1 className="mb-2">Kirimkan pesan tidak dikaenal kepada</h1>
              <h1 className="font-bold text-4xl mb-2">{data?.name}</h1>
              <p className="text-sm text-main-bg">
                *semua kutipan dibawah bersifat anonim
              </p>
            </div>
          </div>
          <div className="text-input w-full">
            <textarea
              className="bg-slate-800 w-full rounded-md mb-2 p-2 min-h-[120px] resize-none scrollbar text-lg text-text-color"
              placeholder="Masukan pesan disini..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button
              className="btn btn-primary w-full"
              onClick={() => {
                handleAddMessage(messageInput);
              }}
            >
              <span>Kirim</span>
            </button>
          </div>
        </div>
        <div className="message-cont bg-my-tosca text-text-color-dark p-4 rounded-md text-center mt-4 flex flex-col gap-3">
          <div className="title-sec">
            <h2 className="text-lg font-bold">
              Pesan-pesan untuk <span>{data?.name}</span>{" "}
            </h2>
          </div>
          <div className="message-wrapper px-3">
            <div className="message-item text-left text-sm">
              {data?.data?.map((msg: any, index: number) => (
                <div
                  className={`text-message py-5  ${
                    index > 0 ? "border-t-2 border-main-bg" : "pt-3"
                  }`}
                  key={index}
                >
                  <div className={`main-message`}>
                    <p className="mb-1">
                      <span>{msg.message}</span>
                    </p>
                    <p className="time text-xs text-clr-info">
                      {DateDMYToStr(new Date(msg.createdAt))}
                    </p>
                  </div>
                  {rplyMsgOpen && (
                    <div className="reply-message pl-6">
                      {/* {`${msg.comment[0]} reply`} */}
                      {msg?.comment?.map((rply: any) => (
                        <div className="mt-3" key={rply?._id}>
                          <p className="mb-1">
                            <span>{rply.text}</span>
                          </p>
                          <p className="time text-xs text-clr-info">
                            10 Sep 2021
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {msg.comment.length > 0 && (
                    <div className="show-more-opt mt-3 flex items-center justify-center">
                      <button
                        className="w-full text-clr-primary flex justify-center items-center gap-1 hover:text-clr-primary-light duration-200"
                        onClick={() => handleGetComment(msg._id)}
                      >
                        <span>
                          {rplyMsgOpen ? "Tutup balasan" : "Lihat balasan"}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          style={
                            rplyMsgOpen ? { transform: "rotate(180deg)" } : {}
                          }
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
                  )}
                  <div className="reply-form mt-3">
                    <textarea
                      placeholder="Balas Pesan ini..."
                      className="input w-full p-2 bg-light-violet focus:outline-none border-slate-400 focus:border-slate-700 pr-4 h-20 scrollbar scrollbar-blk resize-none text-base"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary text-sm h-auto min-h-full w-full rounded-md py-3 text-white"
                    onClick={() => handleAddComment(msg._id, commentInput)}
                  >
                    <span>Balas</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalPage;
