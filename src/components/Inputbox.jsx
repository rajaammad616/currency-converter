import React from 'react';
import './Inputbox.css';

function Inputbox({
   label,
   amount,
   onAmountChange,
   amountDisable = false,
   amountInputId,
   selectCurrency,
   onCurrencyChange,
   currencyDisable = false,
   currencyOptions = [],
}) {
   return (
      <div className="currency-input-container">
         <div className="input-group">
            <label htmlFor={amountInputId} className="input-label">
               {label}
            </label>
            <div className="input-wrapper">
               <input
                  id={amountInputId}
                  className="amount-input"
                  type="number"
                  placeholder="Amount"
                  disabled={amountDisable}
                  value={amount}
                  onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
               />
               <select
                  className="currency-select"
                  value={selectCurrency}
                  onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                  disabled={currencyDisable}
               >
                  {currencyOptions && currencyOptions.length > 0 ? (
                     currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                           {currency.toUpperCase()}
                        </option>
                     ))
                  ) : (
                     <option value="">Loading currencies...</option>
                  )}
               </select>
            </div>
         </div>
      </div>
   );
}

export default Inputbox;
