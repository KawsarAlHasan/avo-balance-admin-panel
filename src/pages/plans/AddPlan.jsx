import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { FaPlus } from "react-icons/fa";

const { Option } = Select;

const AddPlan = ({ refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      // await API.post("/plan-dashboard/create-plans/", values);
      message.success("Plan created successfully!");
      refetch?.();
      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      message.error(
        err.response?.data?.email
          ? err.response?.data?.email[0]
          : "Failed to create plan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        size="large"
        type="primary"
        className="mb-2 my-main-button"
        onClick={showModal}
      >
        <FaPlus />
        New Plan Create
      </Button>

      <Modal
        title="Create New Plan"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <Form.Item
            label="Plan Name"
            name="name"
            rules={[{ required: true, message: "Please enter plan name" }]}
          >
            <Input placeholder="Enter plan name" />
          </Form.Item>

          {/* price  */}
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter plan price" }]}
          >
            <Input placeholder="Enter plan price" />
          </Form.Item>

          <Form.Item
            label="Currency"
            name="currency"
            rules={[{ required: true, message: "Please select currency" }]}
          >
            <Select placeholder="Select currency">
              <Option value="USD">USD</Option>
              <Option value="EUR">EUR</Option>
              <Option value="GBP">GBP</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select status">
              <Option value="Visible">Visible</Option>
              <Option value="Hidden">Hidden</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="my-main-button"
              htmlType="submit"
              loading={loading}
              block
            >
              Create Plan
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPlan;
