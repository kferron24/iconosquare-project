import React, { useState, useCallback, useMemo, useEffect } from "react";
import Button from "./shared/Button";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const LiveUpdater: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>();
  const { data, dispatch } = useLiveChartContext();

  const selectedEvent = useMemo(() => data.selectedEvent, [data.selectedEvent]);
  const selectedValue = useMemo(() => selectedEvent?.event[selectedEvent.selectedValue], [selectedEvent])

  const handleUpdateValue = useCallback(() => {
    const formattedValue = Number(inputValue);
    if (selectedEvent) {
      if (!isNaN(formattedValue)) {
        dispatch({
          type: "update_value",
          payload: {
            ...selectedEvent.event,
            [selectedEvent.selectedValue]: formattedValue,
          },
        });
      } else {
        alert("Please enter a valid number.");
      }
    }
  }, [dispatch, inputValue, selectedEvent]);

  const handleReset = useCallback(() => {
    dispatch({ type: "reset" });
  }, [dispatch]);

  useEffect(() => {
    if (selectedEvent && selectedValue) {
      setInputValue(String(selectedValue));
    }
  }, [selectedEvent, selectedValue]);

  return (
    <>
      {(selectedValue || data.isUpdated) && (
        <div className="fixed top-4 right-4 bg-white border-blue-300 border-2 rounded-md p-2 flex flex-wrap gap-4 items-center">
          {data.isPaused && selectedEvent && (
            <>
              <span className="text-blue-500">
                Selected {selectedEvent.selectedValue} at index{" "}
                {selectedEvent.event.index} to update:
              </span>
              <input
                type="number"
                value={
                  inputValue ?? selectedValue
                }
                onChange={(e) => setInputValue(e.target.value)}
                className="px-2 py-1 rounded-md text-black w-20 border-blue-300 border-2"
                placeholder="Enter value"
              />
              <Button onClick={handleUpdateValue} disabled={inputValue === String(selectedValue)}>
                Update
              </Button>
            </>
          )}
          <Button onClick={handleReset} disabled={!data.isUpdated}>
            Reset All Values
          </Button>
        </div>
      )}
    </>
  );
};

export default LiveUpdater;
