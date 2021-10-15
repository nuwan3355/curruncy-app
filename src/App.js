import React from "react";
import axios from "axios";
import { CircularProgress, makeStyles } from "@material-ui/core";
import Coin from "./Coin";
import { Search } from "@material-ui/icons";

const useStyle = makeStyles(() => ({
  coinApp: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "65px",
    color: "#fff",
  },
  coinSearch: {
    marginBottom: "65px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  coinText: {
    marginBottom: "32px",
    textAlign: "center",
  },
  input: {
    paddingLeft: "16px",
    width: "300px",
    height: "50px",
    borderRadius: "4px",
    border: "none",
    backgroundImage:
      "linear-gradient(-225deg,#9595b8 10%, #64ceb7 18%, #4801ff 100%)",
    color: "black",
    fontSize: "30px",
  },
  icon: {
    fontSize: "40px",
  },
  inputBox: {
    backgroundImage:
      "linear-gradient(-225deg,#9595b8 10%, #64ceb7 18%, #4801ff 100%)",
    borderRadius: "4px",
  },
}));

function App() {
  const classes = useStyle();

  const [coins, setCoins] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => setCoins(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className={classes.coinApp}>
      <div className={classes.coinSearch}>
        <h1 className={classes.coinText}>Search a currency</h1>
        <form className={classes.inputBox}>
          <input
            type="text"
            placeholder="Search"
            className={classes.input}
            onChange={handleChange}
          />
          <Search className={classes.icon} />
        </form>
      </div>
      {filteredCoins.length <= 0 ? (
        <CircularProgress disableShrink />
      ) : (
        filteredCoins.map((val, key) => {
          return (
            <Coin
              key={key}
              cname={val.name}
              image={val.image}
              symbol={val.symbol}
              marketcap={val.market_cap}
              price={val.current_price}
              priceChange={val.price_change_percentage_24h}
              volume={val.total_volume}
            />
          );
        })
      )}
    </div>
  );
}

export default App;
