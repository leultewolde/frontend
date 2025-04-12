"use client";

import React, {useState} from "react";
import {useCreateData, useDeleteData, useFetchData} from "@/utils/api";

interface Income {
    id: string;
    source: string;
    amount: number;
    receivedAt: string;
}

export default function IncomePage() {
    const {data, isLoading, error} = useFetchData("/income", "incomes");
    const createIncome = useCreateData("/income", "incomes");
    const deleteIncome = useDeleteData("/income", "incomes");

    const [form, setForm] = useState({source: "", amount: "", receivedAt: ""});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createIncome.mutate(form);
        setForm({source: "", amount: "", receivedAt: ""});
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Incomes</h1>

            {error && <p className="text-red-500">Failed to load incomes.</p>}
            {isLoading && <p className="text-gray-500">Loading...</p>}

            <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                <input
                    type="text"
                    placeholder="Source"
                    value={form.source}
                    onChange={(e) => setForm({...form, source: e.target.value})}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) => setForm({...form, amount: e.target.value})}
                />
                <input
                    type="date"
                    value={form.receivedAt}
                    onChange={(e) => setForm({...form, receivedAt: e.target.value})}
                />
                <button type="submit">Add Income</button>
            </form>

            <ul className="space-y-2">
                {(data ? data.expenses : []).map((entry: Income) => (
                    <li key={entry.id} className="p-4 bg-white shadow-md rounded flex justify-between">
                        <span>{entry.source}: ${entry.amount}</span>
                        <button
                            onClick={() => deleteIncome.mutate(entry.id)}
                            className="text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}