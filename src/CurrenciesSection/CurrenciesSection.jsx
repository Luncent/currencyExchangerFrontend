import CurrenciesTable from "../AvailableCurrenciesTable/CurrenciesTable";
import AddCurrencyForm from "../AddCurrencyForm/AddCurrencyForm";
import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

const API = `http://localhost:8080/CurrencyExchanger-1.0/currencies`;

export default function CurrenciesSection() {
  var [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = () => {
      axios
        .get(API)
        .then((result) => {
          setCurrencies(result.data);
        })
        .catch((error) => {
          console.log("fetch error", error);
        });
    };

    fetchCurrencies();
  }, []);

  function addCurrency(name, code, sign) {
    const postCurrency = (requestData) => {
      axios
        .post(API, requestData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((result) => {
          console.log("adding responce", result.data);
          setCurrencies([
            ...currencies,
            {
              name: result.data.name,
              code: result.data.code,
              sign: result.data.sign,
            },
          ]);
        })
        .catch((error) => {
          console.log("add error", error);
        });
    };

    var requestData = qs.stringify({
      name,
      code,
      sign,
    });

    postCurrency(requestData);
  }

  return (
    <section className="mt-xxl-5">
      <div className="row">
        <CurrenciesTable currencies={currencies} />
        <AddCurrencyForm addCurrencyClick={addCurrency} />
      </div>
    </section>
  );
}
