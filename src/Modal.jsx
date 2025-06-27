import axios from "axios";
import Button from "./Button";
import { useEffect, useState, useRef } from "react";
import endpoints from "./ApiSettings";
import { useError } from "./ErrorContextFunctions";
import qs from "qs";
import { createPortal } from "react-dom";
import React from "react";

export default function Modal({
  isOpen,
  children,
  closeModal,
  updateExchangeRate
}) {
  const dialog = useRef();

  useEffect(() => {
    if (isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpen]);

  /*const changeRate = (codes) => {
    const patchRate = (requestData, rateCodes) => {
      axios
        .patch(EXCHANGE_RATES_ENDPOINT + `/${rateCodes}`, requestData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((result) => {
          closeModal();
          updateExchangeRate(result.data);
        })
        .catch((error) => {
          const errorMsg = error.response
            ? error.response.data.message
            : error.code;
          setError(errorMsg);
          console.log("change rate", errorMsg);
        });
    };

    const requestData = qs.stringify({
      rate: rateInfo.rate,
    });

    patchRate(requestData, rateCodes);
  };*/

  console.log("rendering modal for rate change");

  return createPortal(
    <dialog ref={dialog} className="container border-0 rounded col-4">
      {React.cloneElement(children, { closeModal,updateExchangeRate})} {/* Передаем функцию закрытия */}
    </dialog>,
    document.getElementById("rateChangeModal")
  );
}
