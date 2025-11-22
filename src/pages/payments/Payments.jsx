import { useState } from "react";
import { Avatar, Button, DatePicker, Table } from "antd";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { useAllPayments } from "../../api/paymentApi";
const { RangePicker } = DatePicker;

function Payments() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
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
      title: <span>SL No.</span>,
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => (
        <span className="">
          #{index + 1 + (filter.page - 1) * filter.limit}
        </span>
      ),
    },
    {
      title: <span>Payment Date</span>,
      dataIndex: "payment_date",
      key: "payment_date",
      render: (payment_date) => <span className="">{payment_date}</span>,
    },
    {
      title: <span>User</span>,
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Avatar
            src={record?.user_profile}
            alt={record?.user_name}
            className="!w-[40px] !h-[40px] rounded-full mt-[-5px]"
          />

          <div className="mt-1">
            <h2>{record?.user_name}</h2>
            <p className="text-sm">{record?.user_email}</p>
          </div>
        </div>
      ),
    },
    {
      title: <span>Plan</span>,
      dataIndex: "plan",
      key: "plan",
      render: (plan) => <span className="">{plan}</span>,
    },
    {
      title: <span>Amount</span>,
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <span className="">${amount}</span>,
    },
    {
      title: <span>Status</span>,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Button
          className={
            status === "Active" || status === "Paid"
              ? `!bg-[#e0ffe4] !border-none`
              : `!bg-[#ffe0e0] !border-none`
          }
        >
          {status}
        </Button>
      ),
    },
    {
      title: <span>Payment Method</span>,
      dataIndex: "payment_method",
      key: "payment_method",
      render: (payment_method) => <span className="">{payment_method}</span>,
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
        <div></div>
        <RangePicker size="large" />
      </div>

      <Table
        columns={columns}
        dataSource={allPayments}
        rowKey="date"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: allPayments.length,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </div>
  );
}

export default Payments;
