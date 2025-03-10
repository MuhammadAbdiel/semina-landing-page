import moment from "moment";
import Head from "next/head";
import Footer from "../../components/Footer";
import FormCheckout from "../../components/FormCheckout";
import Navbar from "../../components/Navbar";
import { getData } from "../../utils/fetchData";
import { formatDate } from "../../utils/formatDate";
import { useEffect } from "react";

export default function Dashboard({ data }) {
  return (
    <>
      <Head>
        <title>Semina - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-navy">
        <Navbar />
      </section>

      <section className="bg-navy">
        <div className="checkout container">
          <div className="text-center checkout-title">Invest In Yourself</div>
          {data.map((data) => (
            <div
              className="event-details container d-flex flex-wrap justify-content-lg-center align-items-center gap-5"
              key={data._id}
            >
              <div className="d-flex flex-column gap-3">
                <h5>{data.historyEvent.title}</h5>

                <div className="d-flex align-items-center gap-3">
                  <img src="/icons/ic-marker-white.svg" alt="" />
                  <span>{data.historyEvent.venueName}</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img src="/icons/ic-time-white.svg" alt="" />
                  <span>
                    {moment(data.historyEvent.date).format("HH.MM A")}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img src="/icons/ic-calendar-white.svg" alt="" />
                  <span>{formatDate(data.historyEvent.date)}</span>
                </div>
              </div>
              <div className="total-price">
                {data.totalPay === 0 ? "free" : `Rp. ${data.totalPay}`}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const req = await getData(`/api/v1/orders`, {}, context.req.cookies.token);

  const res = req.data;

  return {
    props: { data: res },
  };
}
