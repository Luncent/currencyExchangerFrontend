import { useEffect, useState } from "react";
import ErrorContextFunctions from "./ErrorContextFunctions";
import { useError } from "./ErrorContextFunctions";
import endpoints from "./ApiSettings";
import CurrenciesSection from "./CurrenciesSection/CurrenciesSection";
import ExchangeRatesSection from "./ExchangeRatesSection";
import AddRateAndConverionSection from "./AddRateAndConvertionSection";
import axios from "axios";
import qs from "qs";

export default function Page() {
  const {
    CURRENCIES_ENDPOINT,
    EXCHANGE_RATES_ENDPOINT,
    EXCHANGE_RATE_ENDPOINT,
    EXCHANGE_ENDPOINT
  } = endpoints;
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);

  const { setError } = useError();

  useEffect(() => {
    const fetchCurrencies = () => {
      axios
        .get(CURRENCIES_ENDPOINT)
        .then((result) => {
          setCurrencies(result.data);
        })
        .catch((error) => {
          const errorMsg = error.response
            ? error.response.data.message
            : error.code;
          setError(errorMsg);
          console.log("fetch error", errorMsg);
        });
    };
    const fetchExchangeRates = () => {
      axios
        .get(EXCHANGE_RATES_ENDPOINT)
        .then((result) => {
          setExchangeRates(result.data);
        })
        .catch((error) => {
          const errorMsg = error.response
            ? error.response.data.message
            : error.code;
          setError(errorMsg);
          console.log("fetch error", errorMsg);
        });
    };

    fetchExchangeRates();
    fetchCurrencies();
  }, []);

  const addExchangeRate = (baseCurrencyCode, targetCurrencyCode, rate) => {
    var requestData = qs.stringify({
      baseCurrencyCode,
      targetCurrencyCode,
      rate,
    });

    const executeRequest = (requestData)=>{
      axios
      .post(EXCHANGE_RATES_ENDPOINT, requestData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((result) => {
        console.log("add result", result);
        setExchangeRates((prev) => [...prev, result.data]);
      })
      .catch((error) => {
        const errorMsg = error.response
          ? error.response.data.message
          : error.code;
        setError(errorMsg);
        console.log("add error", errorMsg);
      });
    };

    executeRequest(requestData);
  };

  function addCurrency(name, code, sign) {
    const postCurrency = (requestData) => {
      axios
        .post(CURRENCIES_ENDPOINT, requestData, {
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
          const errorMsg = error.response
            ? error.response.data.message
            : error.code;
          setError(errorMsg);
          console.log("add error", errorMsg);
        });
    };

    var requestData = qs.stringify({
      name,
      code,
      sign,
    });

    postCurrency(requestData);
  }
  const updateExchangeRate = (code, rate) => {
    const updateState = (newRate) => {
      setExchangeRates((prev) => {
        console.log("before:", prev);
        return prev.map((existingRate) => {
          return existingRate.id === newRate.id
            ? { ...existingRate, rate: newRate.rate } // Обновляем элемент
            : existingRate; // Возвращаем неизменённый элемент
        });
      });
    };

    const patchrequest = (code, requestData) => {
      axios
        .patch(EXCHANGE_RATE_ENDPOINT + `/${code}?rate=${requestData}`)
        .then((result) => {
          updateState(result.data);
        })
        .catch((error) => {
          const errorMsg = error.response
            ? error.response.data.message
            : error.code;
          setError(errorMsg);
          console.log("patch rate error:", errorMsg);
        });
    };

    patchrequest(code, rate);
  };

  return (
    <>
      <h1 className="mb-4">Currency Exchange Service</h1>
      <CurrenciesSection currencies={currencies} addCurrency={addCurrency} />
      <ExchangeRatesSection
        exchangeRates={exchangeRates}
        updateExchangeRate={updateExchangeRate}
      />
      <AddRateAndConverionSection
        currencies={currencies}
        addExchangeRate={addExchangeRate}
      ></AddRateAndConverionSection>
    </>
  );
}
