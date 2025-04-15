import { Transaction } from '../types/transaction';

export const fetchTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', date: '2025-04-01', description: 'Payment A', amount: 150 },
        { id: '2', date: '2025-04-02', description: 'Refund B', amount: -50 },
        { id: '3', date: '2025-04-03', description: 'Payment C', amount: 100 },
        { id: '4', date: '2025-04-04', description: 'Payment D', amount: 210 },
        { id: '5', date: '2025-04-05', description: 'Payment E', amount: 300 },
        { id: '6', date: '2025-04-06', description: 'Payment F', amount: 250 },
        { id: '7', date: '2025-04-08', description: 'Payment G', amount: 270 },
        { id: '8', date: '2025-04-10', description: 'Refund H', amount: -200 },
        { id: '9', date: '2025-04-11', description: 'Payment I', amount: 123 },
        { id: '10', date: '2025-04-12', description: 'Payment J', amount: 80 },
        { id: '11', date: '2025-04-13', description: 'Refund K', amount: -12 },
        { id: '12', date: '2025-04-14', description: 'Payment L', amount: 90 },
      ]);
    }, 400);
  });
};
