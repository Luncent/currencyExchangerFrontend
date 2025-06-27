import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import endpoints from "./ApiSettings";
import { useError } from "./ErrorContextFunctions";

export default function AddRateAndConverionSection({
  currencies,
  addExchangeRate,
}) {
  const [baseCurrencyCode, setBaseCurrencyCode] = useState(
    currencies[0] ? currencies[0].code : "нет валют"
  );
  const [targetCurrencyCode, setTargetCurrencyCode] = useState(
    currencies[0] ? currencies[0].code : "нет валют"
  );
  const [rate, setRate] = useState(0.0);

  const [from, setFrom] = useState(
    currencies[0] ? currencies[0].code : "нет валют"
  );
  const [to, setTo] = useState(
    currencies[0] ? currencies[0].code : "нет валют"
  );
  const [amount, setAmount] = useState(
    1
  );
  const [converted, setConverted] = useState(null);

  const { EXCHANGE_ENDPOINT } = endpoints;
  const { setError } = useError();

  const getExchange = () => {
    const getReq = (from, to, amount) => {
      axios
        .get(EXCHANGE_ENDPOINT + `?from=${from}&to=${to}&amount=${amount}`)
        .then((result) => {
          console.log('success convertion', result.data.convertedAmount);
          setConverted(result.data.convertedAmount);
        })
        .catch((error) => {
          const errorMsg = error.response
            ? error.response.data.message
            : error.code;
          setError(errorMsg);
          console.log("add error", errorMsg);
        });
    };

    getReq(from,to,amount);
  };

  return (
    <section className="mt-xxl-5 pb-5">
      <div className="row">
        <div className="col col-6">
          <h2>Add New Exchange Rate</h2>
          <div className="form-group">
            <label htmlFor="new-rate-base-currency">Base currency</label>
            <select
              className="form-control"
              name="baseCurrencyCode"
              id="new-rate-base-currency"
              onChange={(e) => {
                setBaseCurrencyCode(e.target.value);
              }}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="new-rate-target-currency">Target currency</label>
            <select
              className="form-control"
              name="targetCurrencyCode"
              id="new-rate-target-currency"
              onChange={(e) => {
                setTargetCurrencyCode(e.target.value);
              }}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exchange-rate">Exchange Rate</label>
            <input
              type="text"
              placeholder="1.23"
              className="form-control"
              name="rate"
              id="exchange-rate"
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
          </div>
          <Button
            className="btn btn-primary mt-3"
            onClick={() =>
              addExchangeRate(baseCurrencyCode, targetCurrencyCode, rate)
            }
          >
            Add Exchange Rate
          </Button>
        </div>

        <div className="col col-6">
          <h2>Currency Conversion</h2>
          <div className="form-group">
            <label htmlFor="convert-base-currency">Base Currency</label>
            <select 
            className="form-control"
            id="convert-base-currency"
            onChange={(e)=>setFrom(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="convert-target-currency">Target Currency</label>
            <select
             className="form-control"
             id="convert-target-currency"
             onChange={(e)=>setTo(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group mt-3">
                <label htmlFor="convert-amount">Amount</label>
                <input
                  placeholder={amount}
                  type="text"
                  className="form-control"
                  id="convert-amount"
                  onChange={(e)=>setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group mt-3">
                <label htmlFor="convert-converted-amount">
                  Converted amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="convert-converted-amount"
                  value={converted}
                />
              </div>
            </div>
          </div>
          <Button
           className="btn btn-primary mt-3"
           onClick={()=>getExchange()}
           >Convert

          </Button>
        </div>
      </div>
    </section>
  );
}
