import styles from './DateFilter.module.scss';

interface DateFilterProps {
    startDate: string;
    endDate: string;
    onChange: (start: string, end: string) => void;
}

export const DateFilter = ({ startDate, endDate, onChange }: DateFilterProps) => {
    return (
        <div className={styles.filterContainer}>
            <div>
                <label className={styles.filterLabel}>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onChange(e.target.value, endDate)}
                    className={styles.filterInput}
                />
            </div>
            <div>
                <label className={styles.filterLabel}>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => onChange(startDate, e.target.value)}
                    className={styles.filterInput}
                />
            </div>
        </div>
    );
};
