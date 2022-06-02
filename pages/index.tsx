import type { NextPage } from "next";
// import Head from 'next/head'
// import Image from 'next/image'
import Layout from "../components/elements/Layout";
// import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
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
            </ul>
          </div>
        </div>
        <form action="" className="w-full px-4 flex flex-col mb-4">
          <input
            type="text"
            placeholder="Masukan namamu disini..."
            className="input input-bordered input-warning w-full mb-2"
          />
          <button className="btn btn-primary">
            <span>Bergabung</span>
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
