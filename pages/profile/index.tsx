import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Empty, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import styled from "styled-components";
import Container from "../../src/components/Container";
import { useAuth, useAuthGuard } from "../../src/features/auth/hooks/useAuth";
import EditProfile from "../../src/features/profile/modals/EditProfile";

const Profile = () => {
  useAuthGuard();
  const { user, loading, logout } = useAuth();
  const name = user ? `${user?.firstName} ${user?.lastName}` : "";

  return (
    <Profile.Wrap>
      <Card style={{ width: "100%", marginTop: 16 }}>
        <Profile.CardWrap>
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={
                <Avatar shape="square" size={64} icon={<UserOutlined />} />
              }
              title={name}
              description="This is the description"
            />
          </Skeleton>
          <Profile.Actions>
            <EditProfile />
            <Button onClick={logout} danger type="primary">
              Logout
            </Button>
          </Profile.Actions>
        </Profile.CardWrap>
      </Card>
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
    </Profile.Wrap>
  );
};

Profile.Actions = styled.div`
  display: flex;
  flex-direction: column;
  button {
    &:first-child {
      margin-bottom: 5px;
    }
  }
`;

Profile.Wrap = styled(Container.Root)`
  padding-top: 20px;
`;

Profile.CardWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Profile;
