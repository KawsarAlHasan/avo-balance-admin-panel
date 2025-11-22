import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, message, Select } from "antd";
import { API } from "../../api/api";

const PlanEdit = ({ record, refetch }) => {
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

      const submitData = {
        plan_name: values.plan_name,
        price: values.price,
        currency: values.currency,
        num_of_active_users: record.num_of_active_users,
        status: record.status,
      };

      // const res = await API.patch("/admin-dashboard/admin-update/", submitData);

      // if (res.status === 200) {
      //   message.success("Admin updated successfully!");
      //   refetch();
      //   setIsModalOpen(false);
      // }
      setIsModalOpen(false);
    } catch (err) {
      message.error(err.response?.data?.error || "Failed to update Admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EditOutlined
        className={`text-[23px] my-main-button p-1 rounded-sm text-white hover:text-blue-300 cursor-pointer`}
        onClick={showModal}
      />

      <Modal
        title="Update Plan"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            id: record?.id,
            plan_name: record?.plan_name,
            price: record?.price,
            currency: record?.currency,
            num_of_active_users: record?.num_of_active_users,
            status: record?.status,
          }}
        >
          <Form.Item
            label="Plan Name"
            name="plan_name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PlanEdit;
