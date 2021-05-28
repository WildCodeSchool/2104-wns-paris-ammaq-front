import React from "react";
import "./header.css";
import { useQuery } from "@apollo/client";
import { SchoolQuery } from "../../graphql/queries/school";

const Header = (): JSX.Element => {
  const { data } = useQuery(SchoolQuery, {
    variables: { id: "60b0bace23608717c5d1d3ea" },
  });
  console.log(data?.school);
  return (
    <div className="h-52 flex flex-col ">
      <div className="rounded-full bg-white school-logo mx-auto shadow-profile bg-circle p-3">
        <div className="p-2 bg-community rounded-full">
          <img
            className="bg-white rounded-full p-1"
            src={data?.school.logo}
            alt="logo de "
          />
        </div>
      </div>
      <div className="text-white font-bold text-center text-lg">
        <h3>{data?.school.name}</h3>
      </div>
    </div>
  );
};

export default Header;
