import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { IParams, RootStore } from "../../utils/globalTypes";
import { UserBlogs, UserInfo, OtherInfo } from "../../components/profile";

const Profile: React.FC = () => {
  const { slug }: IParams = useParams();
  const { auth } = useSelector((state: RootStore) => state);

  return (
    <div className="my-3 row">
      <div className="mb-3 col-md-5">
        {auth.user?._id === slug ? <UserInfo /> : <OtherInfo />}
      </div>
      <div className="col-md-7">
        <UserBlogs />
      </div>
    </div>
  );
};

export default Profile;
