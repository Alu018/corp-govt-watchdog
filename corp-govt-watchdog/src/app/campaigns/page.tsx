"use client"; // Required for handling state in Next.js App Router
import { useState } from "react";

export default function CampaignsPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
        country: "",
        feedback: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="max-w-lg px-2 ml-8 text-black rounded-lg">
            <div className="p-8">
                <h1 className="text-2xl font-bold">Campaign Management</h1>
                <div>You can manually adjust your alert settings here, or type a  question to me below</div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Campaign Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md text-black"
                        required
                    />
                </div>

                {/* Email Input */}
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md text-black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Regions Covered</label>
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md text-black"
                        min="1"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Contact Information</label>
                    <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md text-black"
                        min="1"
                        required
                    />
                </div>

                {/* ALERT TYPE Dropdown */}
                <div>
                    <label className="block text-sm font-medium">Alert Type</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md text-black"
                        required
                    >
                        <option value="">Select Alert Type</option>
                        <option value="us">Email</option>
                        <option value="uk">SMS</option>
                        <option value="ca">Discord</option>
                        <option value="au">Slack</option>
                    </select>
                </div>

                {/* Frequency radio buttons */}
                <div>
                    <label className="block text-sm font-medium">Frequency</label>
                    <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="frequency"
                                value="daily"
                                onChange={handleChange}
                                className="accent-blue-500"
                                required
                            />
                            Hourly
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="frequency"
                                value="daily"
                                onChange={handleChange}
                                className="accent-blue-500"
                                required
                            />
                            Daily
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="frequency"
                                value="weekly"
                                onChange={handleChange}
                                className="accent-blue-500"
                            />
                            Weekly
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="frequency"
                                value="monthly"
                                onChange={handleChange}
                                className="accent-blue-500"
                            />
                            Monthly
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="frequency"
                                value="rarely"
                                onChange={handleChange}
                                className="accent-blue-500"
                            />
                            Custom
                        </label>
                    </div>
                </div>

                {/* Save changes button */}
                <button
                    type="submit"
                    className="w-full p-2 text-white bg-cyan-500 hover:bg-cyan-700 rounded-md font-bold"
                >
                    Save changes
                </button>
            </form>
        </div>
    );
}
