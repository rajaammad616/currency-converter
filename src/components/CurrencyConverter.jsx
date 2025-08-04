import React from 'react';
import Inputbox from './Inputbox';
import './CurrencyConverter.css';
import { useEffect, useState } from 'react';
import useCurrencyInfo from '../hooks/useCurrencyInfo';

function CurrencyConverter() {

  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('currency-converter-theme');
    return savedTheme || 'dark';
  });

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('currency-converter-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const swapCurrency = () => {
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    if (amount && currencyInfo[to]) {
      const result = amount * currencyInfo[to];
      setConvertedAmount(result);
    }
  }, [amount, from, to, currencyInfo]);

  return (
    <>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <div className="currency-container">
        <div className="welcome-header">
          <h1>Welcome to Currency Converter</h1>
          <p>Convert between different currencies with real-time exchange rates</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <Inputbox
              label="From"
              amount={amount}
              onAmountChange={setAmount}
              onCurrencyChange={setFrom}
              selectCurrency={from}
              currencyOptions={options}
              amountInputId="from-amount"
              amountDisable={false}
              currencyDisable={false}
            />
          </div>
          <button type="button" className="swap-button" onClick={swapCurrency}>SWAP</button>
          <div>
            <Inputbox
              label="To"
              amount={convertedAmount.toFixed(2)}
              onCurrencyChange={setTo}
              selectCurrency={to}
              currencyOptions={options}
              amountInputId="to-amount"
              amountDisable={true}
              currencyDisable={false}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default CurrencyConverter;
