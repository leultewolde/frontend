"use client";

import React, {useState} from "react";
import {useCreateData, useDeleteData, useFetchData} from "@/utils/api";

interface Budget {
    id: string;
    name: string;
    totalAmount: number;
}

export default function BudgetPage() {
    const {data, isLoading, error} = useFetchData("/budget", "budgets");
    const createBudget = useCreateData("/budget", "budgets");
    const deleteBudget = useDeleteData("/budget", "budgets");

    const [form, setForm] = useState({name: "", totalAmount: ""});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createBudget.mutate(form);
        setForm({name: "", totalAmount: ""});
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Budgets</h1>

            {error && <p className="text-red-500">Failed to load budgets.</p>}
            {isLoading && <p className="text-gray-500">Loading...</p>}

            <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                />
                <input
                    type="number"
                    placeholder="Total Amount"
                    value={form.totalAmount}
                    onChange={(e) => setForm({...form, totalAmount: e.target.value})}
                />
                <button type="submit">Add Budget</button>
            </form>
            <ul className="space-y-2">
                {(data ? data.budgets : []).map((budget: Budget) => (
                    <li key={budget.id} className="p-4 bg-white shadow-md rounded flex justify-between">
                        <span>{budget.name}: &nbsp;&nbsp; ${budget.totalAmount.toFixed(3)}</span>
                        <button
                            onClick={() => deleteBudget.mutate(budget.id)}
                            className="text-red-500">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
