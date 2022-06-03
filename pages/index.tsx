import type { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";
import Layout from "../components/elements/Layout";

const Home: NextPage = () => {
  const [user, setUser] = useState<string>();
  // const { pathname } = Router;
  // console.log(Router);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: user }),
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      // console.log(data);

      Router.push(`${Router.pathname}${data._id}`);
      // data.name &&
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout title="Selamat datang">
      <div className="flex flex-col items-center justify-center w-full bg-white mt-4 rounded-lg">
        <div className="info p-4 w-full">
          <div className="info-cont text-left bg-my-tosca text-text-color-dark p-2 rounded-md">
            <ul className="list-disc list-outside pl-8 capitalize">
              <li>
                Dapatkan umpan balik anonim dari Teman &#38; Rekan Kerja Anda.
              </li>
              <li>
                Tingkatkan Persahabatan Anda dengan menemukan Kekuatan dan area
                untuk Peningkatan Anda.
              </li>
              <li>
                Apabila ada kritik atau saran, jadikan itu sebagai muhasabah
                diri masing-masing.
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
              setUser(e.target.value);
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
