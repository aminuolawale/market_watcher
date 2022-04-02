import { CryptoListStyle } from "../styles/Section.styles";
import { toMillion } from "../utils/functions";

const Listing = ({ coin }) => {
  return (
    <CryptoListStyle>
      <div>
        <img
          src={`https://cryptologos.cc/logos/${
            coin.slug
          }-${coin.symbol.toLowerCase()}-logo.svg`}
          alt=""
          width="28"
          height="28"
        />
        <p>
          {coin.name} <span>{coin.symbol}</span>
        </p>
      </div>
      <p>${coin.quote.USD.price.toFixed(2)}</p>
      <p
        style={{
          color: coin.quote.USD.percent_change_24h >= 0 ? "#00D42F" : "red",
        }}
      >
        {coin.quote.USD.percent_change_24h.toFixed(2)}%
      </p>
      <span>${toMillion(coin.quote.USD.price * coin.circulating_supply)}</span>
    </CryptoListStyle>
  );
};

export default Listing;
