import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
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
  const [messageInput, setMessageInput] = useState<string>("");
  // const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      fetch(`/api/user?id=${router.query.id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
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
    // setCommentOpen(!commentOpen);
  };

  const handleAddComment = async (
    id: string,
    comment: string,
    index: number
  ) => {
    if (!data?.data) return;
    const messageId = data?.data.find((d: any) => d._id === id);

    console.log(!messageId?.comment[index + 1]?._id);
    if (messageId && messageId.comment.length >= 0) {
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
          setData((prev: any) => {
            prev?.data?.map((d: any, index: number) => {
              if (d._id === messageId._id) {
                prev?.data.splice(index, 1, data);
              }
            });
            return { ...prev };
          });
        });
      console.log(data);
    }

    // setCommentOpen(true);
  };

  console.log(data);

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
        setData((prev: any) => {
          const newData = [...prev?.data, data];
          return { ...prev, data: newData };
        });
        setMessageInput("");
      });
  };

  return (
    <Layout title={data?.name || "Personal Page"}>
      <div>
        <div className="flex flex-col items-center justify-center w-full bg-white mt-4 rounded-lg gap-6 p-4">
          <div className="info w-full">
            <div className="info-cont bg-my-tosca text-text-color-dark p-2 rounded-md text-center">
              <h1 className="mb-2">Kirimkan pesan tidak dikenal kepada</h1>
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
        {data?.data.length > 0 ? (
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
                    <CommentComponent
                      onGetComment={() => handleGetComment(msg?._id)}
                      commentLength={msg?.comment?.length}
                    >
                      <div className="reply-message pl-6">
                        {msg?.comment?.map((item: any, index: number) => (
                          <div className="mt-3" key={index}>
                            <p className="mb-1">
                              <span>{item?.text}</span>
                            </p>
                            <p className="time text-xs text-clr-info">
                              {item?.createdAt &&
                                DateDMYToStr(new Date(item?.createdAt))}
                            </p>
                          </div>
                        ))}
                        <CommentForm
                          onSubmit={(comment: string) =>
                            handleAddComment(msg._id, comment, index)
                          }
                        ></CommentForm>
                      </div>
                    </CommentComponent>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="message-cont bg-my-tosca text-text-color-dark p-4 py-12 rounded-md text-center mt-4 flex flex-col gap-3">
            <p>Ops... Belum ada pesan untuk anda 🙃</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PersonalPage;

interface CommentProps {
  id?: string;
  onSubmit?: (commentInput: string) => void;
  onGetComment?: (id: string) => void;
}

const CommentForm: FC<CommentProps> = (props) => {
  const [commentInput, setCommentInput] = useState<string>("");
  const { id, onSubmit } = props;
  return (
    <div className="reply-form mt-3">
      <textarea
        placeholder="Balas Pesan ini..."
        className="input w-full p-2 bg-light-violet focus:outline-none border-slate-400 focus:border-slate-700 pr-4 h-20 scrollbar scrollbar-blk resize-none text-base"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
      />
      <button
        className="btn btn-primary text-sm h-auto min-h-full w-full rounded-md py-3 text-white"
        onClick={() => {
          onSubmit?.(commentInput);
          setCommentInput("");
        }}
      >
        <span>Balas</span>
      </button>
    </div>
  );
};

interface CommentCompProps {
  id?: string;
  commentLength: number;
  onGetComment?: () => void;
}

const CommentComponent: FC<PropsWithChildren<CommentCompProps>> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { onGetComment, commentLength, children } = props;

  return (
    <>
      {isOpen && children}
      <div className="show-more-opt mt-3 flex items-center justify-center">
        <button
          className="w-full text-clr-primary flex justify-center items-center gap-1 hover:text-clr-primary-light duration-200"
          onClick={() => {
            onGetComment?.();
            setIsOpen(!isOpen);
          }}
        >
          <span>{isOpen ? "Tutup balasan" : "Balas Pesan"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            style={isOpen ? { transform: "rotate(180deg)" } : {}}
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
      {/* {commentLength > 0 && (
      )} */}
    </>
  );
};
