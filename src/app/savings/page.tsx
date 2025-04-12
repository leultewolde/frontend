"use client";

import React, {useState} from "react";
import {useCreateData, useDeleteData, useFetchData} from "@/utils/api";

interface Savings {
    id: string;
    goalName: string;
    targetAmount: number;
    savedAmount: number;
}

export default function SavingsPage() {
    const {data, isLoading, error} = useFetchData("/savings", "savings");
    const createSavings = useCreateData("/savings", "savings");
    const deleteSavings = useDeleteData("/savings", "savings");

    const [form, setForm] = useState({goalName: "", targetAmount: "", savedAmount: ""});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createSavings.mutate(form);
        setForm({goalName: "", targetAmount: "", savedAmount: ""});
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Savings Goals</h1>

            {error && <p className="text-red-500">Failed to load savings.</p>}
            {isLoading && <p className="text-gray-500">Loading...</p>}

            <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                <input
                    type="text"
                    placeholder="Goal Name"
                    value={form.goalName}
                    onChange={(e) => setForm({...form, goalName: e.target.value})}
                />
                <input
                    type="number"
                    placeholder="Target Amount"
                    value={form.targetAmount}
                    onChange={(e) => setForm({...form, targetAmount: e.target.value})}
                />
                <input
                    type="number"
                    placeholder="Saved Amount"
                    value={form.savedAmount}
                    onChange={(e) => setForm({...form, savedAmount: e.target.value})}
                />
                <button type="submit">Add Goal</button>
            </form>

            <ul className="space-y-2">
                {(data ? data.savings : []).map((goal: Savings) => (
                    <li key={goal.id} className="p-4 bg-white shadow-md rounded flex justify-between">
                        <span>{goal.goalName}: ${goal.savedAmount} / ${goal.targetAmount}</span>
                        <button
                            onClick={() => deleteSavings.mutate(goal.id)}
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