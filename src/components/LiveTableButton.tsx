import React, { useCallback, useMemo } from "react";
import { SelectedValue, Event } from "../types/events.model";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

type LiveTableButtonProps = {
  event: Event;
  value: SelectedValue;
};

const LiveTableButton: React.FC<LiveTableButtonProps> = ({ event, value }) => {
  const { data, dispatch } = useLiveChartContext();
  const selectedEvent = useMemo(() => data.selectedEvent, [data.selectedEvent]);

  const isSelected = useMemo(
    () =>
      selectedEvent &&
      selectedEvent.event.index === event.index &&
      selectedEvent.selectedValue === value,
    [selectedEvent, event.index, value]
  );

  const buttonClasses = useMemo(
    () =>
      `p-2 border-t w-full text-left border-gray-300 ${
        isSelected ? "bg-blue-300" : ""
      } ${data.isPaused ? "pointer-events-auto" : "pointer-events-none"}`,
    [isSelected, data.isPaused]
  );

  const handleToggleSelection = useCallback(
    (event: Event, selectedValue: SelectedValue) => () => {
      dispatch({ type: "select_value", payload: { ...event, selectedValue } });
    },
    [dispatch]
  );

  return (
    <button
      className={buttonClasses}
      onClick={handleToggleSelection(event, value)}
      disabled={!data.isPaused}
    >
      {event[value]}
    </button>
  );
};

export default LiveTableButton;
