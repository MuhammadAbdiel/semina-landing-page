import React from "react";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";

export default function PageUsers({ data }) {
  const handleUserDetail = (id, name) => {
    Router.push(`users/${id}/${name}`);
  };

  return (
    <div>
      <Head>
        <title>Semina - Users</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <h1 className="title">Halaman Users</h1>
      <Image src="/2.png" alt="user" width={"100"} height={"100"} />

      <ul>
        {data.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserDetail(user.id, user.name)}
          >
            <li>Name : {user.name}</li>
            <li>Email : {user.email}</li>
            <li>==============</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}
