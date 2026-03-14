import { message, Modal, Space, Table } from "antd";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { DeleteOutlined } from "@ant-design/icons";
import AddAdmin from "./AddAmin";
import AdminEdit from "./AdminEdit";
import { useAllAdmins } from "../../api/usersApi";
import { API } from "../../api/api";

function Administrators() {
  const { allAdmins, isLoading, isError, error, refetch } = useAllAdmins();

  // delete confirm modal
  const showDeleteConfirm = (adminId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this admin?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          await API.delete(`/accounts/admin/${adminId}/`);
          message.success("Admin deleted successfully!");
          refetch();
        } catch (err) {
          console.log(err, "err");
          message.error(err.response?.data?.error || "Failed to delete admin");
        }
      },
    });
  };

  const columns = [
    {
      title: <span>Sl no.</span>,
      dataIndex: "#",
      key: "#",
      render: (_, record, index) => <span className="">#{index + 1}</span>,
    },
    {
      title: <span>Name</span>,
      dataIndex: "name",
      key: "name",
      render: (name) => <span className="">{name}</span>,
    },
    {
      title: <span>Email</span>,
      dataIndex: "email",
      key: "email",
      render: (email) => <span className="">{email}</span>,
    },
    {
      title: <span>Phone</span>,
      dataIndex: "phone_number",
      key: "phone_number",
      render: (phone_number) => (
        <span className="">{phone_number || "N/A"}</span>
      ),
    },
    {
      title: <span>Has Access To</span>,
      dataIndex: "role",
      key: "role",
      render: (role) => <span className="">{role}</span>,
    },
    {
      title: <span>Action</span>,
      key: "action",
      render: (_, record) => {
        const isSuperAdmin = record.role === "superadmin";

        return (
          <Space size="middle">
            <AdminEdit adminProfile={record} refetch={refetch} />

            <DeleteOutlined
              className={`text-[23px] bg-[#E30000] p-1 rounded-sm text-white ${
                isSuperAdmin
                  ? "cursor-not-allowed opacity-50"
                  : "hover:text-red-300 cursor-pointer"
              }`}
              onClick={
                isSuperAdmin ? undefined : () => showDeleteConfirm(record.id)
              }
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
      <AddAdmin refetch={refetch} />

      <Table
        columns={columns}
        dataSource={allAdmins}
        rowKey="id"
        loading={isLoading}
        pagination={false}
      />
    </div>
  );
}

export default Administrators;
