import React from "react";
import { useState } from "react";

import "./header.css";
import { PlusCircle } from "react-feather";
import { useQuery } from "@apollo/client";
import { SchoolQuery } from "../../graphql/queries/school";

import CreateModal from "./CreateModal";
import { useAuth } from "../../context/auth-provider";

const Header = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const { data, loading } = useQuery(SchoolQuery, {
    variables: { id: "60b0bace23608717c5d1d3ea" },
  });
  const { token } = useAuth();

  return (
    <div className="h-60 flex flex-col ">
      <div className="rounded-full bg-white school-logo mx-auto shadow-profile bg-circle p-3">
        <div className="p-2 bg-community rounded-full">
          {loading ? (
            <div className="bg-white rounded-full p-1 bg-onload img110px" />
          ) : (
            <img
              className="bg-white rounded-full p-1"
              src={data?.school.logo}
              alt={`Logo ${data?.school.name}`}
            />
          )}
        </div>
      </div>
      <div className="text-white font-bold text-center text-lg">
        <h3>{data?.school.name}</h3>
      </div>
      {token?.role === "admin" ? (
        <div className="text-center mt-4">
          {!open && (
            <button
              type="button"
              className="rounded-full shadow-mainnav bg-community"
              onClick={() => openModal()}
            >
              <PlusCircle className="text-main-white" />
            </button>
          )}
          {open && <CreateModal closeModal={closeModal} open={open} />}
        </div>
      ) : null}
    </div>
  );
};

export default Header;
