import React from "react";

const UserSmallCardLoading = (): JSX.Element => {
  return (
    <div data-testid="userSmallCard" className="mt-5 ml-3 grid grid-flow-col ">
      <div className="user-nav-img rounded-full object-cover z-10 bg-onload" />
      <p className="uppercase text-xs text-gray-300 items-end truncate ml-3 self-center " />
    </div>
  );
};

export default UserSmallCardLoading;
