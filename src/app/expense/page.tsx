"use client";

import React, {useState} from "react";
import {useCreateData, useDeleteData, useFetchData} from "@/utils/api";

interface Expense {
    id: string;
    category: string;
    amount: number;
    spentAt: string;
}

export default function ExpensePage() {
    const {data, isLoading, error} = useFetchData("/expense", "expenses");
    const createExpense = useCreateData("/expense", "expenses");
    const deleteExpense = useDeleteData("/expense", "expenses");

    const [form, setForm] = useState({category: "", amount: "", spentAt: ""});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createExpense.mutate(form);
        setForm({category: "", amount: "", spentAt: ""});
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Expenses</h1>

            {error && <p className="text-red-500">Failed to load expenses.</p>}
            {isLoading && <p className="text-gray-500">Loading...</p>}

            <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                <input
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({...form, category: e.target.value})}
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) => setForm({...form, amount: e.target.value})}
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="date"
                    value={form.spentAt}
                    onChange={(e) => setForm({...form, spentAt: e.target.value})}
                    className="border p-2 rounded w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Expense
                </button>
            </form>

            <ul className="space-y-2">
                {(data ? data.expenses : []).map((expense: Expense) => (
                    <li key={expense.id} className="p-4 bg-white shadow-md rounded flex justify-between">
                        <span>{expense.category}: ${expense.amount}</span>
                        <button
                            onClick={() => deleteExpense.mutate(expense.id)}
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
