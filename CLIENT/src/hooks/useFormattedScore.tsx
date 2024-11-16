import { useMemo } from 'react';

export const useFormattedScore = (score: number): string => {
    return useMemo(() => {
        // Convert score based on size
        if (score >= 1_000_000) {
            // Show in millions
            return (score / 1_000_000).toFixed(1) + 'M'; // 1.0M, 5.4M, etc.
        } else if (score >= 1_000) {
            // Show in thousands
            return (score / 1_000).toFixed(1) + 'k'; // 1.0k, 350.2k, etc.
        } else {
            // Regular number (less than 1,000)
            return score.toLocaleString(); // Shows 999, 999, 1000, etc.
        }
    }, [score]);
};
