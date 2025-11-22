import { useState } from "react";
import { Modal, Typography, Button, Space, Select, Radio } from "antd";
import { CloseOutlined, StopOutlined } from "@ant-design/icons";

const { Text } = Typography;

function ViewUser({ userDetailsData, isOpen, onClose, refetch }) {
  const [selectedPlan, setSelectedPlan] = useState("Free");
  const [lifetimeAccess, setLifetimeAccess] = useState("Yes");
  const [resetMethod, setResetMethod] = useState("temporary");

  // Demo data যদি userDetailsData না থাকে
  const userData = userDetailsData || {
    id: 1,
    name: "Massimo Max",
    email: "massimo@gmail.com",
    profile:
      "https://www.bollywoodhungama.com/wp-content/uploads/2018/01/Priyanka-Chopras-Quantico-season-3-will-premiere-in-April-2018.jpg",
    plan: "Free",
    status: "Active",
    registration_date: "22 November 2022",
    next_payment_date: "22 November 2022",
    device_type: "iOS",
    payment_history: [
      "22 November 2022",
      "22 November 2022",
      "22 November 2022",
    ],
    applied_lifetime_code: "(if any)",
  };

  const handleCancelSubscription = () => {
    console.log("Cancel subscription");
  };

  const handleCancel = () => {
    onClose();
  };

  const handleClose = () => {
    console.log("Close modal with data:", {
      plan: selectedPlan,
      lifetimeAccess,
      resetMethod,
    });
    onClose();
  };

  return (
    <Modal
      title={
        <div
          style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}
        >
          User Detail Page
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      closeIcon={<CloseOutlined style={{ fontSize: "16px" }} />}
    >
      <div style={{ padding: "20px 0" }}>
        {/* User Details */}
        <Space direction="vertical" style={{ width: "100%" }} size={20}>
          {/* Name */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong style={{ fontSize: "15px" }}>
              Name
            </Text>
            <Text style={{ fontSize: "15px" }}>{userData.name}</Text>
          </div>

          {/* Email */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong style={{ fontSize: "15px" }}>
              Email
            </Text>
            <Text style={{ fontSize: "15px" }}>{userData.email}</Text>
          </div>

          {/* Device type */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong style={{ fontSize: "15px" }}>
              Device type
            </Text>
            <Text style={{ fontSize: "15px" }}>{userData.device_type}</Text>
          </div>

          {/* Current plan */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong style={{ fontSize: "15px" }}>
              Current plan
            </Text>
            <Text style={{ fontSize: "15px" }}>{userData.plan}</Text>
          </div>

          {/* Plan activation date */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong style={{ fontSize: "15px" }}>
              Plan activation date
            </Text>
            <Text style={{ fontSize: "15px" }}>
              {userData.registration_date}
            </Text>
          </div>

          {/* Next billing date */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong style={{ fontSize: "15px" }}>
              Next billing date
            </Text>
            <Text style={{ fontSize: "15px" }}>
              {userData.next_payment_date}
            </Text>
          </div>

          {/* Device type (duplicate) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong style={{ fontSize: "15px" }}>
              Device type
            </Text>
            <Text style={{ fontSize: "15px" }}>{userData.device_type}</Text>
          </div>

          {/* Payment history */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text strong style={{ fontSize: "15px" }}>
              Payment history
            </Text>
            <div style={{ textAlign: "right" }}>
              {userData.payment_history.map((date, index) => (
                <div key={index} style={{ marginBottom: "4px" }}>
                  <Text style={{ fontSize: "15px" }}>• {date}</Text>
                </div>
              ))}
            </div>
          </div>

          {/* Applied lifetime code */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong style={{ fontSize: "15px" }}>
              Applied lifetime code
            </Text>
            <Text style={{ fontSize: "15px", color: "#888" }}>
              {userData.applied_lifetime_code}
            </Text>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #e8e8e8", margin: "20px 0" }} />

          {/* Change Plan */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong style={{ fontSize: "15px" }}>
              Change Plan
            </Text>
            <Select
              value={selectedPlan}
              onChange={setSelectedPlan}
              style={{ width: 320 }}
              options={[
                { value: "Free", label: "Free" },
                { value: "Basic", label: "Basic" },
                { value: "Premium", label: "Premium" },
              ]}
            />
          </div>

          {/* Give Lifetime Access */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong style={{ fontSize: "15px" }}>
              Give Lifetime Access
            </Text>
            <Select
              value={lifetimeAccess}
              onChange={setLifetimeAccess}
              style={{ width: 320 }}
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
            />
          </div>

          {/* Cancel Subscription Button */}
          <Button
            block
            icon={<StopOutlined />}
            onClick={handleCancelSubscription}
            style={{
              backgroundColor: "#ffe5e5",
              color: "#000",
              border: "none",
              height: "45px",
              fontSize: "15px",
              fontWeight: "500",
              marginTop: "10px",
            }}
          >
            Cancel Subscription
          </Button>

          {/* Emergency Reset Password */}
          <div style={{ marginTop: "20px" }}>
            <Text
              strong
              style={{
                fontSize: "15px",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Emergency Reset Password
            </Text>
            <Radio.Group
              value={resetMethod}
              onChange={(e) => setResetMethod(e.target.value)}
            >
              <Space direction="horizontal" size={40}>
                <Radio value="link" style={{ fontSize: "15px" }}>
                  Generate Reset Link
                </Radio>
                <Radio value="temporary" style={{ fontSize: "15px" }}>
                  Set Temporary Password
                </Radio>
              </Space>
            </Radio.Group>
          </div>

          {/* Footer Buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "30px" }}>
            <Button
              block
              onClick={handleCancel}
              style={{
                height: "45px",
                fontSize: "15px",
                fontWeight: "500",
                color: "#1dd1a1",
                borderColor: "#1dd1a1",
              }}
            >
              Cancel
            </Button>
            <Button
              block
              type="primary"
              onClick={handleClose}
              style={{
                height: "45px",
                fontSize: "15px",
                fontWeight: "500",
                background: "linear-gradient(to right, #10d4a5, #1dd1a1)",
                border: "none",
              }}
            >
              Close
            </Button>
          </div>
        </Space>
      </div>
    </Modal>
  );
}

export default ViewUser;
