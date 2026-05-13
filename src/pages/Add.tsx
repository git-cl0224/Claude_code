import React from 'react';
import { useLedgers, useTransactions } from '../hooks/useData';
import { TransactionForm } from '../components/TransactionForm';

export function AddPage() {
  const { currentLedgerId } = useLedgers();
  const { addTransaction } = useTransactions(currentLedgerId);

  return (
    <div className="p-4 max-w-2xl mx-auto pb-24 md:pb-8">
      <TransactionForm onSubmit={addTransaction} ledgerId={currentLedgerId} />
    </div>
  );
}
