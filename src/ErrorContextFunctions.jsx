import { useState, createContext, useContext, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';

const ErrorContext = createContext();

export default function ErrorContextFunctions({ children }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const clearError = () => {
    setErrorMessage(null);
  };
  const setError = (message) => {
    setErrorMessage(message);
  };

  return (
    <ErrorContext.Provider value={{ clearError, setError }}>
      {children}
      {errorMessage && <ErrorModal message={errorMessage} clearError={clearError}></ErrorModal>}
    </ErrorContext.Provider>
  );
}

export function ErrorModal({ message, clearError }) {
  //const dialog = useRef();

  setTimeout(()=>{
    clearError();
  }, 10000);

  return createPortal(
    <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: 10}}>

      <div
        className={message ? "toast show" : "toast"} 
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Error</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={()=>clearError()}
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>

    </div>
    
    ,document.getElementById("errorModal")
  );
}

export const useError = ()=> useContext(ErrorContext);
