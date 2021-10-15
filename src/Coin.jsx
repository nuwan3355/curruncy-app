import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  head: {
    padding: "20px 50px",
    borderBottom: "2px solid white",
    marginTop: "20px",
    [theme.breakpoints.down("md")]: {
      padding: " 0px 25%",
      textAlign: "center",
    },
  },
  h1: {
    fontSize: "16px",
    marginLeft: "10px",
  },
  img: {
    height: "30px",
    width: "30px",
  },
  symbol: {
    textTransform: "uppercase",
  },
  imgDiv: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
    marketcap: {
      [theme.breakpoints.down("md")]: {
        color: "red",
      },
    },
  },
}));

export default function Coin({
  image,
  cname,
  symbol,
  price,
  volume,
  priceChange,
  marketcap,
}) {
  const classes = useStyle();
  return (
    <Grid container spacing={1} className={classes.head}>
      <Grid item xs={12} lg={2}>
        <div className={classes.imgDiv}>
          <img className={classes.img} src={image} alt="crypto" />
          <h1 className={classes.h1}>{cname}</h1>
        </div>
      </Grid>
      <Grid item xs={12} lg={2}>
        <p className={classes.symbol}>{symbol}</p>
      </Grid>

      <Grid item xs={12} lg={2}>
        <p>${price}</p>
      </Grid>

      <Grid item xs={12} lg={2}>
        <p>${volume.toLocaleString()}</p>
      </Grid>

      <Grid item xs={12} lg={2}>
        <p
          style={{
            color: priceChange < 0 ? "#f00606" : "#11d811",
          }}
        >
          {priceChange.toFixed(2)}%
        </p>
      </Grid>

      <Grid item xs={12} sm={2} md={2}>
        <p className={classes.marketcap}>
          Mkt Cap:
          <br /> ${marketcap.toLocaleString()}
        </p>
      </Grid>
    </Grid>
  );
}
