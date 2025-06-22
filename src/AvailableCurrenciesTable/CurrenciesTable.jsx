export default function CurrenciesTable({ currencies }) {
  return (
    <div className="col col-6">
      <h4>Available Currencies</h4>
      <table className="table currencies-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Sign</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map(currency => 
            <tr key={currency.code}>
              <td>{currency.code}</td>
              <td>{currency.name}</td>
              <td>{currency.sign}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
