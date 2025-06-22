import CurrenciesTable from "../AvailableCurrenciesTable/CurrenciesTable";
import AddCurrencyForm from '../AddCurrencyForm/AddCurrencyForm';
import { useState } from "react";

export default function CurrenciesSection() {
  var [currencies, setCurrencies] = useState([
    {
      id: 1,
      name: "Australian dollar",
      code: "AUD",
      sign: "A$",
    },
    {
      id: 2,
      name: "Afgani",
      code: "AFN",
      sign: "Af",
    },
    {
      id: 3,
      name: "United States dollar",
      code: "USD",
      sign: "$",
    },
    {
      id: 4,
      name: "Euro",
      code: "EUR",
      sign: "€",
    },
  ]);

  function addCurrency(name, code, sign) {
    console.log("adding");
    setCurrencies([
      ...currencies,
      {
        name: name,
        code: code,
        sign: sign,
      },
    ]);
  }
  return (
    <section className="mt-xxl-5">
      <div className="row">
        <CurrenciesTable currencies={currencies} />
        <AddCurrencyForm addCurrencyClick={addCurrency}/>
      </div>
    </section>
  );
}
