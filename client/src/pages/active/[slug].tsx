import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { IParams } from "../../utils/globalTypes";
import { postAPI } from "../../utils/fetchData";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../components/alert/Alert";

const Active = () => {
  const { slug }: IParams = useParams();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (slug) {
      postAPI("active", { active_token: slug })
        .then((res) => {
          setSuccess(res.data.msg);
        })
        .catch((error) => {
          setError(error.response.data.msg);
        });
    }
  }, [slug]);

  return (
    <div>
      {error && showErrorMessage(error)}
      {success && showSuccessMessage(success)}
    </div>
  );
};

export default Active;
