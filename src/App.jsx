import { useState } from 'react'
import CurrenciesSection from './CurrenciesSection/CurrenciesSection';
import ExchangeRatesSection from './ExchangeRatesSection';

function App() {
  return (
    <>
       <h1 className="mb-4">Currency Exchange Service</h1>
       <CurrenciesSection />
       <ExchangeRatesSection />
    </>
  )
}

export default App
