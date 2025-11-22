import { Button, message, Modal, Space, Table } from "antd";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import PlanEdit from "./PlanEdit";
import AddPlan from "./AddPlan";
import { useAllPlans } from "../../api/planApi";

function Plans() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const { allPlans, isLoading, isError, error, refetch } = useAllPlans(filter);

  const handleTableChange = (pagination) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  // delete confirm modal
  const showDeleteConfirm = (planId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this plan?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          // await API.post(`/admin-dashboard/delete-user/`, {
          //   user_id: planId,
          // });
          message.success("Plan deleted successfully!");
          refetch();
        } catch (err) {
          message.error(err.response?.data?.error || "Failed to delete plan");
        }
      },
    });
  };

  const columns = [
    {
      title: <span>Sl no.</span>,
      dataIndex: "serial_number",
      key: "serial_number",
      render: (text, record, index) => (
        <span className="">
          #{index + 1 + (filter.page - 1) * filter.limit}
        </span>
      ),
    },
    {
      title: <span>Plan Name</span>,
      dataIndex: "plan_name",
      key: "plan_name",
      render: (plan_name) => <span className="">{plan_name}</span>,
    },
    {
      title: <span>Price</span>,
      dataIndex: "price",
      key: "price",
      render: (price) => <span className="">${price}</span>,
    },
    {
      title: <span>Currency</span>,
      dataIndex: "currency",
      key: "currency",
      render: (currency) => <span className="">{currency}</span>,
    },
    {
      title: <span>Number of Active Users</span>,
      dataIndex: "num_of_active_users",
      key: "num_of_active_users",
      render: (num_of_active_users) => (
        <span className="">{num_of_active_users}</span>
      ),
    },
    {
      title: <span>Status</span>,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Button
          className={
            status === "Visible"
              ? `!bg-[#e0ffe4] !border-none`
              : `!bg-[#ffe0e0] !border-none`
          }
        >
          {status}
        </Button>
      ),
    },
    {
      title: <span>Action</span>,
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <PlanEdit record={record} refetch={refetch} />

            <DeleteOutlined
              className={`text-[23px] bg-[#E30000] p-1 rounded-sm text-white hover:text-red-300 cursor-pointer`}
              onClick={() => showDeleteConfirm(record.id)}
            />
          </Space>
        );
      },
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
      <AddPlan refetch={refetch} />

      <Table
        columns={columns}
        dataSource={allPlans}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: allPlans.length,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default Plans;
