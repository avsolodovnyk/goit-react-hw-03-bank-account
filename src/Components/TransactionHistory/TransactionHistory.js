import React from 'react';
import T from 'prop-types';
import styles from './TransactionHistory.module.css';

export default function TransactionHistory({ items }) {
  return (
    <table className={styles.history}>
      <thead>
        <tr>
          <th>Transaction</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.type}</td>
            <td>{item.amount}$</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
TransactionHistory.propTypes = {
  items: T.arrayOf(
    T.exact({
      id: T.string.isRequired,
      type: T.string.isRequired,
      amount: T.number.isRequired,
      date: T.string.isRequired,
    }).isRequired,
  ).isRequired,
};
