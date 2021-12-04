import React, { FC } from "react";
import { useParams } from "react-router-dom";

const Detail: FC = () => {
  const { name } = useParams();
  return <div>Detail: {name}</div>;
};

export default Detail;
