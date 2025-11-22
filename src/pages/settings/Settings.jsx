import React, { useState } from "react";
import { Input, Button, message, Select } from "antd";

function Settings() {
  const [apiKey, setApiKey] = useState("your_api_key");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      message.warning("Please enter an API key");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      message.success("API key saved successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="">
      <div className="bg-white w-full p-6 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Update Your Api Key</h2>

        <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-4">
          <Input.Password
            placeholder="Enter your api key here"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            size="large"
            className="flex-1"
            onPressEnter={handleSave}
          />

          <Button
            type="primary"
            size="large"
            onClick={handleSave}
            loading={loading}
            className="bg-emerald-500 hover:bg-emerald-600 border-none px-8"
          >
            Save
          </Button>
        </div>
      </div>

      <div className="bg-white w-full p-6 rounded-2xl shadow-sm mt-6">
        <h2 className="text-2xl font-semibold mb-6">System timezone</h2>

        <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-4">
          <Select
            size="large"
            className="flex-1"
            placeholder="Select timezone"
            defaultValue="UTC"
          >
            <Select.Option value="UTC">UTC (GMT+00:00) </Select.Option>
            <Select.Option value="EST">EST (GMT-05:00) </Select.Option>
            <Select.Option value="CST">CST (GMT-06:00) </Select.Option>
            <Select.Option value="MST">MST (GMT-07:00) </Select.Option>
            <Select.Option value="PST">PST (GMT-08:00) </Select.Option>
          </Select>
        </div>
      </div>

      <div className="bg-white w-full p-6 rounded-2xl shadow-sm mt-6">
        <h2 className="text-2xl font-semibold mb-6">Main Currency</h2>

        <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-4">
          <Select
            size="large"
            className="flex-1"
            placeholder="Select currency"
            defaultValue="USD"
          >
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="EUR">EUR</Select.Option>
            <Select.Option value="GBP">GBP</Select.Option>
            <Select.Option value="INR">INR</Select.Option>
            <Select.Option value="JPY">JPY</Select.Option>
          </Select>
        </div>
      </div>

      <div className="bg-white w-full p-6 rounded-2xl shadow-sm mt-6">
        <h2 className="text-2xl font-semibold mb-6">App version</h2>

        <p className="text-[20px]">
          View the current backend version and app version information for Avo
          Balance. This section helps you stay updated with the latest releases,
          improvements, and system updates. <br />
          Here you can find the latest system updates, new features, and version
          changes for your Avo Balance experience.
        </p>
      </div>
    </div>
  );
}

export default Settings;
