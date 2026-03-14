import { useState } from "react";
import {
  Table,
  Avatar,
  Button,
  Input,
  Select,
  Tag,
  Space,
  Modal,
  message,
  Switch,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import ViewUser from "./ViewUser";
import AddUser from "./AddUser";
import { useAllUsers } from "../../api/usersApi";
import { API } from "../../api/api";

const { Search } = Input;

function UserManagement() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 20,
    search: "",
  });

  const [userDetailsData, setUserDetailsData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [activeModalData, setActiveModalData] = useState(null);
  const [isActiveModalOpen, setIsActiveModalOpen] = useState(false);
  const [activeLoading, setActiveLoading] = useState(false);

  const [deleteModalData, setDeleteModalData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { allUsers, isLoading, isError, error, refetch } = useAllUsers(filter);

  const handleUserDetails = (userData) => {
    setUserDetailsData(userData);
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setUserDetailsData(null);
    setIsViewModalOpen(false);
  };

  const handleTableChange = (pagination) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const onSearch = (value) => {
    setFilter((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const handlePlanFilter = (value) => {
    setFilter((prev) => ({ ...prev, plan: value, page: 1 }));
  };

  const handleStatusFilter = (value) => {
    setFilter((prev) => ({ ...prev, status: value, page: 1 }));
  };

  // Active/Deactive Modal
  const handleOpenActiveModal = (record) => {
    setActiveModalData(record);
    setIsActiveModalOpen(true);
  };

  const handleActiveModalClose = () => {
    setActiveModalData(null);
    setIsActiveModalOpen(false);
  };

  const handleToggleActive = async () => {
    if (!activeModalData) return;
    setActiveLoading(true);
    try {
      const response = await API.put(`/accounts/users/${activeModalData.id}/`, {
        is_active: !activeModalData.is_active,
      });

      console.log(response, "response");

      message.success(
        `User ${!activeModalData.is_active ? "activated" : "deactivated"} successfully`,
      );
      refetch();
      handleActiveModalClose();
    } catch (error) {
      console.error(error, "error");
      message.error(error?.response?.data?.error || "Something went wrong");
    } finally {
      setActiveLoading(false);
    }
  };

  // Delete Modal
  const handleOpenDeleteModal = (record) => {
    setDeleteModalData(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalData(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteUser = async () => {
    if (!deleteModalData) return;
    setDeleteLoading(true);
    try {
      const response = await API.delete(
        `/accounts/users/${deleteModalData.id}/`,
      );

      console.log(response, "response");

      message.success("User deleted successfully");
      refetch();
      handleDeleteModalClose();
    } catch (error) {
      console.error(error, "error");
      message.error(error?.response?.data?.error || "Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  const getSubscriptionStatus = (record) => {
    if (!record.subscription) return "FREE";
    const endDate = new Date(record.subscription.current_period_end);
    const today = new Date();
    if (endDate < today) return "EXPIRED";
    return record.subscription.status;
  };

  const columns = [
    {
      title: "SL",
      render: (_, __, index) => (
        <span>#{index + 1 + (filter.page - 1) * filter.limit}</span>
      ),
    },

    {
      title: "User",
      render: (_, record) => (
        <Space>
          <Avatar size={45} src={record.profile_picture} />
          <div>
            <div className="flex gap-2 items-center">
              <strong>{record.name || "Guest User"}</strong>
              {record.is_guest && <Tag color="orange">Guest</Tag>}
            </div>
            <div className="text-xs text-gray-500">
              {record.email || "No Email"}
            </div>
          </div>
        </Space>
      ),
    },

    {
      title: "Plan",
      render: (_, record) => (
        <Tag color="blue">{record.subscription?.plan_name || "Free"}</Tag>
      ),
    },

    {
      title: "Status",
      render: (_, record) => {
        const status = getSubscriptionStatus(record);
        let color = "default";
        if (status === "ACTIVE") color = "green";
        if (status === "EXPIRED") color = "red";
        if (status === "FREE") color = "gold";
        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: "Is Active",
      render: (_, record) => (
        <Tag color={record.is_active ? "green" : "red"}>
          {record.is_active ? "Active" : "Inactive"}
        </Tag>
      ),
    },

    {
      title: "Registration",
      render: (_, record) => (
        <span>
          {record.date_joined
            ? new Date(record.date_joined).toLocaleDateString()
            : "-"}
        </span>
      ),
    },

    {
      title: "Next Payment",
      render: (_, record) => {
        if (!record.subscription) return "-";
        const endDate = new Date(record.subscription.current_period_end);
        const today = new Date();
        const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
        return (
          <div>
            {endDate.toLocaleDateString()}
            {diffDays <= 3 && diffDays > 0 && (
              <Tag color="warning" className="ml-2">
                Expiring Soon
              </Tag>
            )}
            {diffDays <= 0 && (
              <Tag color="red" className="ml-2">
                Expired
              </Tag>
            )}
          </div>
        );
      },
    },

    {
      title: "Action",
      render: (_, record) => (
        <Space>
          {/* <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleUserDetails(record)}
          >
            View
          </Button> */}

          <Button
            type="default"
            icon={<PoweroffOutlined />}
            onClick={() => handleOpenActiveModal(record)}
            style={{
              borderColor: record.is_active ? "#faad14" : "#52c41a",
              color: record.is_active ? "#faad14" : "#52c41a",
            }}
          >
            {record.is_active ? "Deactivate" : "Activate"}
          </Button>

          {/* <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleOpenDeleteModal(record)}
          >
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError error={error} refetch={refetch} />;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Space size={16}>
          <Search
            placeholder="Search name or email"
            allowClear
            size="large"
            onSearch={onSearch}
            style={{ width: 350 }}
          />
        </Space>

        {/* <AddUser refetch={refetch} /> */}
      </div>

      <Table
        columns={columns}
        dataSource={allUsers?.results}
        rowKey="id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: allUsers?.count,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />

      {/* <ViewUser
        userDetailsData={userDetailsData}
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
        refetch={refetch}
      /> */}

      {/* Active / Deactive Modal */}
      <Modal
        title={
          <Space>
            <PoweroffOutlined
              style={{
                color: activeModalData?.is_active ? "#faad14" : "#52c41a",
              }}
            />
            <span>
              {activeModalData?.is_active ? "Deactivate" : "Activate"} User
            </span>
          </Space>
        }
        open={isActiveModalOpen}
        onCancel={handleActiveModalClose}
        footer={[
          <Button key="cancel" onClick={handleActiveModalClose}>
            Cancel
          </Button>,
          <Button
            key="confirm"
            type="primary"
            danger={activeModalData?.is_active}
            style={
              !activeModalData?.is_active
                ? { backgroundColor: "#52c41a", borderColor: "#52c41a" }
                : {}
            }
            loading={activeLoading}
            onClick={handleToggleActive}
          >
            {activeModalData?.is_active ? "Yes, Deactivate" : "Yes, Activate"}
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to{" "}
          <strong>
            {activeModalData?.is_active ? "deactivate" : "activate"}
          </strong>{" "}
          the user{" "}
          <strong>
            {activeModalData?.name || activeModalData?.email || "this user"}
          </strong>
          ?
        </p>

        {activeModalData?.is_active && (
          <p className="text-gray-500 text-sm mt-1">
            Deactivating will prevent this user from logging in.
          </p>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        title={
          <Space>
            <DeleteOutlined style={{ color: "#ff4d4f" }} />
            <span>Delete User</span>
          </Space>
        }
        open={isDeleteModalOpen}
        onCancel={handleDeleteModalClose}
        footer={[
          <Button key="cancel" onClick={handleDeleteModalClose}>
            Cancel
          </Button>,
          <Button
            key="confirm"
            type="primary"
            danger
            loading={deleteLoading}
            onClick={handleDeleteUser}
          >
            Yes, Delete
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to permanently delete the user{" "}
          <strong>
            {deleteModalData?.name || deleteModalData?.email || "this user"}
          </strong>
          ?
        </p>
        <p className="text-gray-500 text-sm mt-1">
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}

export default UserManagement;
