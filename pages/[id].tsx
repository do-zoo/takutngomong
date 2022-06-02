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
  const id = router.query.id;
  return (
    <Layout title={`${title}`}>
      <div>
        <h1>Personal Page {id}</h1>
      </div>
    </Layout>
  );
};

export default PersonalPage;
