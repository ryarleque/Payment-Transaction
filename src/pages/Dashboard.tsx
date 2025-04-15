import { useEffect, useState, useMemo } from 'react';
import { fetchTransactions } from '../api/transactions';
import { Transaction } from '../types/transaction';
import { TransactionTable } from '../components/TransactionTable';
import { DateFilter } from '../components/DateFilter';
import styles from './Dashboard.module.scss';

const ITEMS_PER_PAGE = 5;

export const Dashboard = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: 'date' | 'amount') => {
        if (sortBy === field) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDir('asc');
        }
    };

    useEffect(() => {
        fetchTransactions().then(setTransactions).catch(() => {
            console.error('Failed to load transactions');
        });
    }, []);

    const filtered = useMemo(() => {
        return transactions.filter((t) => {
            const tDate = new Date(t.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            if (start && tDate < start) return false;
            if (end && tDate > end) return false;
            return true;
        });
    }, [transactions, startDate, endDate]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    const sorted = useMemo(() => {
        return [...filtered].sort((a, b) => {
            const aVal = sortBy === 'date' ? new Date(a.date).getTime() : a.amount;
            const bVal = sortBy === 'date' ? new Date(b.date).getTime() : b.amount;

            return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
        });
    }, [filtered, sortBy, sortDir]);

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return sorted.slice(start, start + ITEMS_PER_PAGE);
    }, [sorted, currentPage]);

    const totalAmount = useMemo(
        () => filtered.reduce((acc, t) => acc + t.amount, 0),
        [filtered]
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Payment Transactions</h1>

            <DateFilter
                startDate={startDate}
                endDate={endDate}
                onChange={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                    setCurrentPage(1);
                }}
            />

            <div className={styles.summary}>
                <div>Total Transactions: <span>{filtered.length}</span></div>
                <div>Total Amount: <span>${totalAmount.toFixed(2)}</span></div>
            </div>

            <TransactionTable
                transactions={paginated}
                onSort={handleSort}
                currentSort={{ field: sortBy, direction: sortDir }}
            />


            <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? styles.bgBlue : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
