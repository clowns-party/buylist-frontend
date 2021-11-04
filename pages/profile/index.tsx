import React, { useState } from "react";
import styled from "styled-components";
import {
  useAuth,
  useAuthGuard,
} from "../../src/features/auth/lib/hooks/useAuth";
import { useGetMyBuylistsQuery } from "../../src/features/buylist/queries/getMyBuylists.query.generated";
import { MyBuylists } from "features/buylist/ui";
import { ProfileEdit, ProfileInfo } from "features/profile/ui";
import { Container } from "shared/ui";
import { useUpdateUserMutation } from "features/profile/hooks";

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
