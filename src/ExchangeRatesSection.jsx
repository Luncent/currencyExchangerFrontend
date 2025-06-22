import { useState } from "react";
import Button from "./Button";

export default function ExchangeRatesSection() {
  var [exchangeRates, setExchangeRates] = useState([
    {
      id: 1,
      baseCurrency: {
        id: 1,
        name: "Australian dollar",
        code: "AUD",
        sign: "A$",
      },
      targetCurrency: {
        id: 4,
        name: "Euro",
        code: "EUR",
        sign: "€",
      },
      rate: 2.59,
    },
    {
      id: 2,
      baseCurrency: {
        id: 3,
        name: "United States dollar",
        code: "USD",
        sign: "$",
      },
      targetCurrency: {
        id: 4,
        name: "Euro",
        code: "EUR",
        sign: "€",
      },
      rate: 0.99,
    },
  ]);

  return (
    <>
      <section className="mt-xxl-5">
        <h2>Exchange Rates</h2>
        <table className="table exchange-rates-table">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Exchange Rate</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {exchangeRates.map((rate) => (
              <tr key={rate.id}>
                <td>{`${rate.baseCurrency.code}${rate.targetCurrency.code}`}</td>
                <td>{rate.rate}</td>
                <td>
                  <Button
                    className="btn btn-secondary btn-sm exchange-rate-edit"
                    data_bs_toggle="modal"
                    data_bs_target="#edit-exchange-rate-modal"
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div
        className="modal fade"
        id="edit-exchange-rate-modal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Exchange Rate</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="exchange-rate-input">Exchange Rate:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exchange-rate-input"
                    defaultValue="1.00"
                  />
                </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
