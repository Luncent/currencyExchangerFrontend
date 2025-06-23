import { useState } from 'react'
import CurrenciesSection from './CurrenciesSection/CurrenciesSection';
import ExchangeRatesSection from './ExchangeRatesSection';
import ErrorContextFunctions from './ErrorContextFunctions';

function App() {
  return (
    <ErrorContextFunctions>
       <h1 className="mb-4">Currency Exchange Service</h1>
       <CurrenciesSection />
       <ExchangeRatesSection />
    </ErrorContextFunctions>
  )
}

export default App
