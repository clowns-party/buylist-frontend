import { useState } from "react";
import React from "react";
import styled from "styled-components";
import Container from "../../src/Elements/Container";
import {
  useAuth,
  useAuthGuard,
} from "../../src/features/auth/lib/hooks/useAuth";
import ProfileEdit from "../../src/features/profile/ui/edit";
import ProfileInfo from "../../src/features/profile/ui/info";
import MyBuylists from "../../src/features/buylist/ui/MyBuylists";
import { useGetMyBuylistsQuery } from "../../src/features/buylist/queries/getMyBuylists.query.generated";

const Profile = () => {
  useAuthGuard();
  const [showEdit, toggleEdit] = useState(false);
  const { user, loading, logout } = useAuth();
  const onEdit = () => {
    toggleEdit(!showEdit);
  };

  const { data: userBuylists, error } = useGetMyBuylistsQuery({
    skip: !user,
  });

  if (showEdit) {
    return (
      <Profile.Wrap>
        <ProfileEdit closeEdit={onEdit} user={user} />
      </Profile.Wrap>
    );
  }

  return (
    <Profile.Wrap>
      <ProfileInfo user={user} onEdit={onEdit} />
      <MyBuylists buylists={userBuylists?.myBuylists} />
    </Profile.Wrap>
  );
};

Profile.Details = styled.div`
  padding-top: 20px;
`;

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
