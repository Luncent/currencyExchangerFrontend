import CurrenciesTable from "../AvailableCurrenciesTable/CurrenciesTable";
import AddCurrencyForm from "../AddCurrencyForm/AddCurrencyForm";

export default function CurrenciesSection({currencies, addCurrency}) {
  return (  
    <section className="mt-xxl-5">
      <div className="row">
        <CurrenciesTable currencies={currencies} />
        <AddCurrencyForm addCurrencyClick={addCurrency} />
      </div>
    </section>
  );
}
