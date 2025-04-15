import { Transaction } from '../../types/transaction';
import styles from './TransactionTable.module.scss';

interface Props {
    transactions: Transaction[];
    onSort?: (field: 'date' | 'amount') => void;
    currentSort?: { field: string; direction: string };
}

export const TransactionTable = ({ transactions, onSort, currentSort }: Props) => {
    const getArrow = (field: 'date' | 'amount') => {
        if (currentSort?.field !== field) return '';
        return currentSort.direction === 'asc' ? '↑' : '↓';
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th onClick={() => onSort?.('date')}>
                        Date {getArrow('date')}
                    </th>
                    <th>Description</th>
                    <th onClick={() => onSort?.('amount')}>
                        Amount ($) {getArrow('amount')}
                    </th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((t) => (
                    <tr key={t.id}>
                        <td>{t.id}</td>
                        <td>{new Date(t.date).toLocaleDateString()}</td>
                        <td>{t.description}</td>
                        <td>{t.amount.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
