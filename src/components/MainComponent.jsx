import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { TVChartContainer } from "./common/TVChartContainer";
import Table from "./Table";
import { formatNumber, removeW } from "../utils/funcs";
import { svg2img } from "../utils/randomAvatar";
import "./style.css";

const TokenDetail = ({ token }) => {
  const riseRate = token.tradeVolumeETH * 1
    ? (((token.volume24HrsETH * 1) / (token.tradeVolumeETH * 1)) * 100).toFixed(2)
    : "0";

  const fields = [
    { label: "Price", value: "$" + token.derivedUSD },
    { label: "24h Volume", value: formatNumber(token.volume24HrsETH * 1) + " ETH" },
    { label: "Market Cap", value: "$" + formatNumber(token.tradeVolumeUSD * 1) },
    { label: "Liquidity", value: "$" + formatNumber(token.totalLiquidityUSD * 1) },
    { label: "Volume", value: "$" + formatNumber(token.tradeVolume * 1) },
    { label: "Vol. ETH", value: formatNumber(token.tradeVolumeETH * 1) },
    { label: "Tx Count", value: token.txCount },
  ];

  return (
    <div className="font-header" style={{ padding: "0 16px" }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid #333",
        width: "100%",
      }}>
        <img
          src={
            token.logo
              ? `https://assets.thetatoken.org/tokens/${token.logo}`
              : svg2img(token)
          }
          style={{
            width: "36px",
            height: "36px",
            marginBottom: "8px",
            borderRadius: token.logo ? "0" : "50%",
          }}
          alt={token.symbol}
        />
        <span style={{ color: "white", fontSize: "1.1rem" }}>
          {removeW(token.symbol)}
        </span>
        <span className="font-regular" style={{ color: "#888", fontSize: "0.75rem" }}>
          {token.name}
        </span>
        <span className="font-regular" style={{ color: "#449782", fontSize: "0.8rem", marginTop: "4px" }}>
          +{riseRate}%
        </span>
      </div>

      <div style={{ padding: "8px 0", width: "100%" }}>
        {fields.map((field, index) => (
          <div
            key={index}
            className="font-regular"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 0",
              fontSize: "0.8rem",
              borderBottom: index < fields.length - 1 ? "1px solid #222" : "none",
            }}
          >
            <span style={{ color: "#888" }}>{field.label}</span>
            <span style={{ color: "white" }}>{field.value}</span>
          </div>
        ))}
      </div>

      <div style={{
        borderTop: "1px solid #333",
        padding: "10px 0",
        width: "100%",
        textAlign: "center",
      }}>
        <span className="font-regular" style={{ color: "#888", fontSize: "0.7rem" }}>
          Contract
        </span>
        <div
          className="font-regular"
          style={{
            color: "#00a3cc",
            wordBreak: "break-all",
            fontSize: "0.65rem",
            marginTop: "4px",
            lineHeight: 1.4,
          }}
        >
          {token.id}
        </div>
      </div>
    </div>
  );
};

const MainComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md")); // Check if screen is larger than medium
  const selectedToken = useSelector((state) => state.tokenReducer.selectedToken);

  useEffect(() => {
    if (selectedToken) {
      setIsMenuOpen(true);
    }
  }, [selectedToken]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: "#191919",
        paddingRight: isMenuOpen ? "0" : "3vw",
      }}
    >
      {/* Main content */}
      <Grid
        item
        xs={isMenuOpen ? 9 : 12}
        sx={{ transition: "width 0.5s", position: "relative" }}
      >
        <TVChartContainer height={isMenuOpen ? 70 : 70} />
        <Table height={isMenuOpen ? 70 : 90} />
        {/* Collapse button */}
        {isLargeScreen && (
          <button className="menubutton" onClick={toggleMenu}>
            <div style={{ marginTop: "-35%" }}>{isMenuOpen ? "›" : "‹"}</div>
          </button>
        )}
      </Grid>

      {/* Menu or additional content */}
      {isMenuOpen && (
        <Grid
          item
          xs={3}
          className="font-header"
          sx={{
            paddingTop: "70px",
            borderLeft: "1px solid #333",
            overflowY: "auto",
            maxHeight: "100vh",
          }}
        >
          {selectedToken ? (
            <TokenDetail token={selectedToken} />
          ) : (
            <div
              className="font-regular"
              style={{
                color: "#555",
                textAlign: "center",
                marginTop: "60px",
                fontSize: "0.85rem",
              }}
            >
              Select a token to view details
            </div>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default MainComponent;
