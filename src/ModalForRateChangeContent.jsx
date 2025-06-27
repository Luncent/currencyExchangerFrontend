import { useEffect, useState } from "react";
import axios from "axios";
import API_HOST from "./ApiSettings";
import { useError } from "./ErrorContextFunctions";
import endpoints from "./ApiSettings";
import Button from "./Button";

export default function ModalForRateChangeContent({ selectedCode, closeModal, updateExchangeRate}) {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [newRate, setNewRate] = useState(0);

  const { setError } = useError();
  const { EXCHANGE_RATE_ENDPOINT } = endpoints;

  useEffect(() => {
    const getExchangeRateByCode = () => {
      axios
        .get(EXCHANGE_RATE_ENDPOINT + `/${selectedCode}`)
        .then((result) => {
          setExchangeRate(result.data);
        })
        .catch((error) => {
          const errorMsg = error.response
            ? error.response.data.message
            : error.code;
          setError(errorMsg);
          console.log("fetch concrete exchRate err:", errorMsg);
        });
    };

    getExchangeRateByCode();
  }, [selectedCode]);

  return (
    <>
    {exchangeRate &&
    <div className="modal-content">
      <div className="row mb-3">
        <div className="column d-flex justify-content-between">
          <h5 className="modal-title">{`Edit `+`${exchangeRate.baseCurrency.code}${exchangeRate.targetCurrency.code}`+` Exchange Rate`}</h5>
          <Button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={()=>closeModal()}
          ></Button>
        </div>
      </div>
      <div className="row mb-3">
        <form>
          <div className="form-group">
            <label htmlFor="exchange-rate-input">Exchange Rate:</label>
            <input
              type="text"
              className="form-control "
              id="exchange-rate-input"
              defaultValue={exchangeRate.rate}
              onChange={(e)=>setNewRate(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="row">
        <div className="column d-flex justify-content-end">
          <Button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={()=>closeModal()}
          >
            Close
          </Button>
          <Button
           type="button" className="btn btn-primary"
           onClick={()=>{
            updateExchangeRate(`${exchangeRate.baseCurrency.code}${exchangeRate.targetCurrency.code}`, newRate);
            closeModal();
          }}
           >
            Save changes
          </Button>
        </div>
      </div>
    </div>
    }
    </>
  );
}
