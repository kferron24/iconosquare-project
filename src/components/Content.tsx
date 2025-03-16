import React from "react";
import LiveTable from "./LiveTable";
import LiveChart from "./LiveChart";
import LiveNavigation from "./LiveNavigation";
import LiveUpdater from "./LiveUpdater";

const Content: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-8">
      <LiveChart />
      <div className="flex justify-center items-center gap-7 my-8">
        <LiveNavigation />
      </div>
      <LiveTable />
      <LiveUpdater />
    </div>
  );
};

export default Content;
