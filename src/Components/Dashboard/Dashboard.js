import React, { PureComponent } from 'react';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import Controls from '../Controls';
import Balance from '../Balance';
import TransactionHistory from '../TransactionHistory';
import styles from './Dashboard.module.css';

class Dashboard extends PureComponent {
  state = { transactions: [], balance: 0 };

  componentDidMount() {
    try {
      this.setState(JSON.parse(localStorage.getItem('data')));
    } catch (error) {
      toast.error('Ошибка чтения данных из localstorage', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  componentDidUpdate() {
    try {
      localStorage.setItem('data', JSON.stringify(this.state));
    } catch (error) {
      toast.error('Ошибка записи  данных в localstorage', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  handleIncome = () => {
    return this.state.transactions.reduce(
      (res, item) => {
        const income = item.type === 'Deposit' && item.amount;
        const expenses = item.type === 'Withdraw' && item.amount;
        return {
          income: income + res.income,
          expenses: expenses + res.expenses,
        };
      },
      { income: 0, expenses: 0 },
    );
  };

  handeleOperation = (mode, amount) => {
    const transaction = {
      id: shortid.generate(),
      type: mode,
      amount: Number(amount),
      date: new Date().toLocaleString(),
    };

    this.setState(state => {
      return {
        transactions: [...state.transactions, transaction],
        balance:
          transaction.type === 'Deposit'
            ? state.balance + transaction.amount
            : state.balance - transaction.amount,
      };
    });
  };

  render() {
    const { balance, transactions } = this.state;
    return (
      <div className={styles.dashboard}>
        <Controls
          onDeposit={this.handeleOperation}
          onWithdraw={this.handeleOperation}
          balance={balance}
        />
        {transactions.length > 0 && (
          <Balance stats={this.handleIncome()} balance={balance} />
        )}

        {transactions.length > 0 && <TransactionHistory items={transactions} />}
      </div>
    );
  }
}
export default Dashboard;
