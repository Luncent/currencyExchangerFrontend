import { useState } from "react";
import Button from "../Button";

export default function AddCurrencyForm({ addCurrencyClick }) {
  var [name, setName] = useState("US Dollar");
  var [code, setCode] = useState("USD");
  var [sign, setSign] = useState("$");

  return (
    <div className="col col-6">
      <h4>Add New Currency</h4>
      <div id="add-currency">
        <div className="form-group mt-3">
          <label htmlFor="add-currency-code">Code</label>
          <input
            onChange={(e) => setCode(e.target.value)}
            type="text"
            name="code"
            placeholder={code}
            className="form-control form-control-sm currency-code"
            id="add-currency-code"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="add-currency-name">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder={name}
            className="form-control form-control-sm"
            id="add-currency-name"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="add-currency-sign">Sign</label>
          <input
            onChange={(e) => setSign(e.target.value)}
            type="text"
            name="sign"
            placeholder={sign}
            className="form-control form-control-sm"
            id="add-currency-sign"
          />
        </div>
        <Button
          onClick={()=>{addCurrencyClick(name, code, sign);}}
          className="btn btn-primary btn-sm mt-4"
        >
          Add Currency
        </Button>
      </div>
    </div>
  );
}
