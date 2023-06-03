

export default function OrderTable({ isColumnZero, orders, products }) {
  return (
    <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Weight</th>
                {[
                  4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11,
                  11.5,
                ].map((s) => !isColumnZero("" + s) && <th key={s}>{s}</th>)}
                <th>Total Wt.</th>
                <th>Total Pcs.</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{products[`${order.product}`][1]}</td>
                  <td>{products[`${order.product}`][0]}</td>
                  {[
                    4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5,
                    11, 11.5,
                  ].map(
                    (s) => !isColumnZero("" + s) && <td key={s}>{order[s]}</td>
                  )}
                  <td>{order.weight}</td>
                  <td>{order.pieces}</td>
                </tr>
              ))}
            </tbody>
          </table>
  )
}
