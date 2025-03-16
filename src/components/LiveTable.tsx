import React from "react";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";
import { Event } from "../types/events.model";
import { DISPLAYED_EVENTS_NB } from "../utils/constants";

const LiveTable: React.FC = () => {
  const { data } = useLiveChartContext();
  const halfDisplayedEvents = DISPLAYED_EVENTS_NB / 2;
  const eventsFiltered = data.events.slice(
    data.navigationIndex - halfDisplayedEvents,
    data.navigationIndex + halfDisplayedEvents
  );

  return (
    <div className="flex border border-gray-300 rounded">
      <div>
        <div className="p-2">Index</div>
        <div className="p-2 border-t border-gray-300">Value 1</div>
        <div className="p-2 border-t border-gray-300">Value 2</div>
      </div>
      {eventsFiltered.map((event: Event) => (
        <div key={event.index} className="border-l border-gray-300 flex-1">
          <div className="p-2">{event.index}</div>
          <div className="p-2 border-t border-gray-300">{event.value1}</div>
          <div className="p-2 border-t border-gray-300">{event.value2}</div>
        </div>
      ))}
    </div>
  );
};

export default LiveTable;
