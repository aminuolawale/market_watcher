import Head from "next/head";
import { Button } from "../styles/Button.styles";
import {
  CryptoListStyle,
  HomeShowcase,
  MiniShowcase,
  StatStyle,
} from "../styles/Section.styles";
import { Container, SubcribeBox } from "../styles/Container.styles";
import HomeStats from "../components/HomeStats";
import axios from "axios";
import Listing from "../components/Listing";
import Footer from "../components/Footer";

export default function Home({ coins }) {
  return (
    <div>
      <Head>
        <title>Market Watcher</title>
        <meta
          name="description"
          content="Cryptocurrency price and news updates"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeShowcase>
        <Container width="1300px">
          <h1>Get instant Crypto price alerts</h1>
          <p>
            Set customizable alerts on important metrics within the Crypto
            ecosystem.
          </p>
          <Button bg="#F0BE3E">Register</Button>
          <StatStyle>
            <HomeStats stat="1000+" detail="Registered users" />
            <HomeStats stat="600+" detail="Cryptocurencies listed" />
            <HomeStats stat="50,000+" detail="Alerts generated" />
          </StatStyle>
        </Container>
      </HomeShowcase>
      <Container width="1300px">
        <h1>Listings</h1>
        <CryptoListStyle>
          <p style={{ color: "grey" }}>Name</p>
          <p style={{ color: "grey" }}>Price</p>
          <p style={{ color: "grey" }}>24h Change</p>
          <span style={{ color: "grey" }}>Market Cap</span>
        </CryptoListStyle>
        {coins.map((coin) => (
          <Listing key={coin.id} coin={coin} />
        ))}
      </Container>
      <MiniShowcase height="50px">
        <Container width="1000px">
          <SubcribeBox>
            <p>Subscribe to get the latest news</p>
            <input type="text" />
            <Button bg="#F0BE3E">Subscribe</Button>
          </SubcribeBox>
        </Container>
      </MiniShowcase>
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get("http://localhost:3000/api/home");
  const coins = await res.data;

  return {
    props: {
      coins,
    },
  };
};
