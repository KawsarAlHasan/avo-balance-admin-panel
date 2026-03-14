import { useState } from "react";
import { Avatar, Button, DatePicker, Table, Tag } from "antd";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { useAllPayments } from "../../api/paymentApi";

const { RangePicker } = DatePicker;

function Payments() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 50,
  });

  const { allPayments, isLoading, isError, error, refetch } =
    useAllPayments(filter);

  const handleTableChange = (pagination) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const columns = [
    {
      title: "SL No.",
      key: "serial",
      render: (_, __, index) => (
        <span>#{index + 1 + (filter.page - 1) * filter.limit}</span>
      ),
    },

    {
      title: "Payment Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (date) => new Date(date).toLocaleString(),
    },

    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Avatar className="!w-[40px] !h-[40px] mt-[-10px]">
            {record?.user_name?.charAt(0) || "U"}
          </Avatar>

          <div>
            <h2 className="font-medium">{record?.user_name || "Unknown"}</h2>
            <p className="text-sm text-gray-500">
              {record?.user_email || "No Email"}
            </p>
          </div>
        </div>
      ),
    },

    {
      title: "Plan",
      dataIndex: "plan_name",
      key: "plan_name",
    },

    {
      title: "Interval",
      dataIndex: "plan_interval",
      key: "plan_interval",
      render: (interval) => <Tag color="blue">{interval}</Tag>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Button
          className={
            status === "ACTIVE"
              ? "!bg-[#e6fffb] !border-none"
              : "!bg-[#fff1f0] !border-none"
          }
        >
          {status}
        </Button>
      ),
    },

    {
      title: "Current Period End",
      dataIndex: "current_period_end",
      key: "current_period_end",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  return (
    <div>
      {/* <div className="flex justify-between mb-4">
        <div></div>
        <RangePicker size="large" />
      </div> */}

      <Table
        columns={columns}
        dataSource={allPayments?.results || []}
        isLoading={isLoading}
        rowKey="id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: allPayments?.count || 0,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default Payments;
