import { Button, Empty, Space, Table, Tag } from "antd";
import React from "react";
import { Statuses } from "../../../types/types.generated";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  GetMyBuylistsQuery,
  useGetMyBuylistsQuery,
} from "../getMyBuylists.query.generated";

type Buylist = GetMyBuylistsQuery["myBuylists"][0];

const MyBuylists = () => {
  const { user } = useAuth();
  const { data, loading, error } = useGetMyBuylistsQuery({
    skip: !user,
  });

  const buylists = data?.myBuylists;
  if (!loading && !buylists?.length) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        style={{ paddingTop: 20 }}
        imageStyle={{
          height: 60,
        }}
        description={
          <span>
            You no have <a href="#API">buylists</a>
          </span>
        }
      >
        <Button type="primary">Create Now</Button>
      </Empty>
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status: Statuses) => (
        <>
          <Tag key={status}>{status.toUpperCase()}</Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Buylist) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button danger type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: "Share",
      key: "Share",
      render: (text: string, record: Buylist) => (
        <Space size="middle">
          <a type="primary">Invite</a>
        </Space>
      ),
    },
  ];

  const dataTable = buylists;
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataTable}
        loading={loading}
        title={() => <h2>Your buylists</h2>}
        footer={() => <Button>Create Now</Button>}
      />
    </div>
  );
};

export default MyBuylists;
