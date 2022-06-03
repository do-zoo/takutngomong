import Head from "next/head";
import type { FC, PropsWithChildren } from "react";
import React from "react";
import Header from "./Header";

interface Props {
  title: string;
}

interface AboutApp {
  appName: string;
}

const Layout: FC<PropsWithChildren<Props>> = (props) => {
  const { children, title } = props;

  const AppDetail: AboutApp = {
    appName: `${process.env.NEXT_PUBLIC_APP_NAME}`,
  };

  const { appName } = AppDetail;

  // console.log(`%c${appName}`, `color: #ff0000; font-size: 20px;`);

  // const { name, age, address, children } = props;
  // console.log(props);

  return (
    <>
      <Head>
        <title>{`${title + " | " + appName}`}</title>
        <meta name="description" content="Yakin masih gaberani ngomong?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
        <section className="content relative max-w-lg mx-auto">
          <Header title={appName} />
          {children}
        </section>
      </div>
    </>
  );
};

export default Layout;
