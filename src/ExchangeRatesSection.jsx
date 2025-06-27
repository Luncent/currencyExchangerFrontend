import { useEffect, useState } from "react";
import Button from "./Button";

import Modal from "./Modal";
import ModalForRateChangeContent from "./ModalForRateChangeContent";

export default function ExchangeRatesSection({ exchangeRates,updateExchangeRate }) {
  const [selectedCode, setSelectedCode] = useState(null);

  console.log("render exchangeRates");
  
  const hideModal = ()=>{
    setSelectedCode(null);
  }

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
            {exchangeRates && exchangeRates.map((rate) => (
              <tr key={rate.id}>
                <td>{`${rate.baseCurrency.code}${rate.targetCurrency.code}`}</td>
                <td>{rate.rate}</td>
                <td>
                  <Button
                    className="btn btn-secondary btn-sm exchange-rate-edit"
                    data_bs_toggle="modal"
                    data_bs_target="#edit-exchange-rate-modal"
                    onClick={() => {
                      setSelectedCode(
                        `${rate.baseCurrency.code}${rate.targetCurrency.code}`
                      );
                      console.log(
                        "selecting rate with code:" +
                          `${rate.baseCurrency.code}${rate.targetCurrency.code}`
                      );
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selectedCode && (
        <Modal isOpen={selectedCode} closeModal={hideModal} updateExchangeRate={updateExchangeRate}>
          <ModalForRateChangeContent selectedCode={selectedCode}></ModalForRateChangeContent>
        </Modal>
      )}
    </>
  );
}
