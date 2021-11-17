import { ProfileEdit, ProfileInfo } from "features/profile/ui";
import React, { useState } from "react";
import { Container } from "shared/ui";
import styled from "styled-components";
import { MyBuylists } from "widgets/buylists-my/ui";
import {
  useAuth,
  useAuthGuard
} from "../../src/features/auth/lib/hooks/useAuth";

const Profile = () => {
  useAuthGuard();
  const [showEdit, toggleEdit] = useState(false);
  const { user, loading, logout } = useAuth();
  const onEdit = () => {
    toggleEdit(!showEdit);
  };

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
      <MyBuylists />
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
