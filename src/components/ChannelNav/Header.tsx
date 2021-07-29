import React from "react";
import { useState } from "react";

import "./header.css";
import { PlusCircle } from "react-feather";
import { useQuery } from "@apollo/client";
import { SchoolQuery } from "../../graphql/queries/school";

import CreateChan from "./CreateChan";

const Header = (): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);

  const switchModal = () => {
    setOpenModal(!openModal);
  };

  const { data, loading, error } = useQuery(SchoolQuery, {
    variables: { id: "60b0bace23608717c5d1d3ea" },
  });

  return (
    <div className="h-52 flex flex-col ">
      <div className="rounded-full bg-white school-logo mx-auto shadow-profile bg-circle p-3">
        <div className="p-2 bg-community rounded-full">
          {loading ? (
            <div className="bg-white rounded-full p-1 bg-onload img110px" />
          ) : (
            <img
              className="bg-white rounded-full p-1"
              src={data?.school.logo}
              alt="logo de "
            />
          )}
        </div>
      </div>
      <div className="text-white font-bold text-center text-lg">
        <h3>{data?.school.name}</h3>
      </div>
      <div>
        {!openModal && (
          <button
            type="button"
            className="ml-36 mt-2 rounded-full shadow-mainnav"
            onClick={() => switchModal()}
          >
            <PlusCircle className="text-community-green-light" />
          </button>
        )}
        {openModal && <CreateChan closeModal={switchModal} />}
      </div>
    </div>
  );
};

export default Header;
