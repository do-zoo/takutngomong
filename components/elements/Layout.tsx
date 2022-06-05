import Head from "next/head";
import { FC, PropsWithChildren, useMemo } from "react";
import React from "react";
import Header from "./Header";

interface Props {
  title: string;
}

const Layout: FC<PropsWithChildren<Props>> = (props) => {
  const { children, title } = props;

  // console.log(`%c${appName}`, `color: #ff0000; font-size: 20px;`);

  // const { name, age, address, children } = props;
  // console.log(props);

  return (
    <>
      <MyHead title={title} />
      <div className="relative bg-main-bg min-h-screen min-w-full">
        <div
          className="bg-fix fixed top-0 left-0 w-full h-screen"
          style={{
            backgroundImage: `url(/img/bg-img.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
        />
        <section className="content relative max-w-lg mx-auto min-h-screen flex flex-col justify-between">
          <div className="header inline">
            <Header />
          </div>
          <main className="min-h-[calc(100vh-56px)]">{children}</main>
          <footer>
            <div className="footer-cont bg-white text-text-color-dark p-2 rounded-md text-center mt-5">
              <p className="text-sm text-main-bg">
                <span className="font-bold">TAKUT NGOMONG</span>
                <br />
                <span className="text-sm">
                  <a
                    href="/"
                    className="text-text-color-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </span>
              </p>
            </div>
          </footer>
        </section>
      </div>
    </>
  );
};

export default React.memo(Layout);

interface AboutApp {
  appName: string;
}

const MyHead: FC<Props> = ({ title }) => {
  const aboutApp = useMemo<AboutApp>(() => {
    return {
      appName: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    };
  }, []);

  return (
    <Head>
      <title>{`${title} | ${aboutApp.appName}`}</title>
      <meta name="description" content="Yakin masih gaberani ngomong?" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
