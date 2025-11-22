import { useState } from "react";
import { Table, Space, Image, Avatar, Button, Input, Select } from "antd";
import { MdBlock } from "react-icons/md";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { EyeOutlined } from "@ant-design/icons";
import ViewUser from "./ViewUser";
import { useAllUsers } from "../../api/usersApi";
import AddUser from "./AddUser";

const { Search } = Input;

function UserManagement() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const [userDetailsData, setUserDetailsData] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    setFilter((prev) => ({
      ...prev,
      search: value,
    }));
  };

  const columns = [
    {
      title: <span>Sl no.</span>,
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => (
        <span className="">
          #{index + 1 + (filter.page - 1) * filter.limit}
        </span>
      ),
    },
    {
      title: <span>User</span>,
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Avatar
            src={record?.profile}
            alt={record?.name}
            className="!w-[45px] !h-[45px] rounded-full mt-[-5px]"
          />
          <div className="mt-1">
            <h2>{record?.name}</h2>
            <p className="text-sm">{record?.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: <span>Current Plan</span>,
      dataIndex: "plan",
      key: "plan",
      render: (plan) => <span>{plan}</span>,
    },
    {
      title: <span>Status</span>,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Button
          className={
            status === "Active"
              ? `!bg-[#e0ffe4] !border-none`
              : `!bg-[#ffe0e0] !border-none`
          }
        >
          {status}
        </Button>
      ),
    },
    {
      title: <span>Registration Date</span>,
      dataIndex: "registration_date",
      key: "registration_date",
      render: (registration_date) => <span>{registration_date}</span>,
    },
    {
      title: <span>Next Payment Date</span>,
      dataIndex: "next_payment_date",
      key: "next_payment_date",
      render: (next_payment_date) => <span>{next_payment_date}</span>,
    },

    {
      title: <span>View Details</span>,
      key: "action",
      render: (_, record) => (
        <Button
          className="!bg-[#e0ffe4]"
          onClick={() => handleUserDetails(record)}
        >
          <EyeOutlined /> View Details
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <Search
            size="large"
            placeholder="Search by name or email"
            onSearch={onSearch}
            style={{ width: 400 }}
          />

          <Select
            size="large"
            placeholder="Select a plan"
            optionFilterProp="label"
            onChange={onChange}
            options={[
              {
                value: "Monthly",
                label: "Monthly",
              },
              {
                value: "Quarterly",
                label: "Quarterly",
              },
              {
                value: "Yearly",
                label: "Yearly",
              },
            ]}
          />
        </div>
        <div>
          <AddUser refetch={refetch} />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={allUsers}
        rowKey="id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: allUsers.length,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
        loading={isLoading}
      />

      <ViewUser
        userDetailsData={userDetailsData}
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
        refetch={refetch}
      />
    </div>
  );
}

export default UserManagement;
