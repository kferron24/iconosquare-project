import React, { useCallback, useMemo } from "react";
import Button from "./shared/Button";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";
import { DISPLAYED_EVENTS_NB } from "../utils/constants";

const useNavigationStatus = (navigationIndex: number, eventsLength: number) => {
  const halfDisplayedEvents = DISPLAYED_EVENTS_NB / 2;

  const isAtTheBeginning = useMemo(
    () => navigationIndex - halfDisplayedEvents <= 0,
    [navigationIndex, halfDisplayedEvents]
  );
  const isAtFirstIndex = useMemo(
    () => navigationIndex - halfDisplayedEvents === 1,
    [navigationIndex, halfDisplayedEvents]
  );
  const isAtLastIndex = useMemo(
    () => navigationIndex + halfDisplayedEvents >= eventsLength - 1,
    [navigationIndex, halfDisplayedEvents, eventsLength]
  );
  const isAtTheEnd = useMemo(
    () => navigationIndex + halfDisplayedEvents >= eventsLength,
    [navigationIndex, halfDisplayedEvents, eventsLength]
  );

  return {
    isAtTheBeginning,
    isAtFirstIndex,
    isAtLastIndex,
    isAtTheEnd,
  };
};

const LiveNavigation: React.FC = () => {
  const { dispatch, data } = useLiveChartContext();
  const isPaused = useMemo(() => data.isPaused, [data.isPaused]);
  const { isAtTheBeginning, isAtFirstIndex, isAtLastIndex, isAtTheEnd } =
    useNavigationStatus(data.navigationIndex, data.events.length);

  const handleTogglePause = useCallback(() => {
    dispatch({ type: "toggle_pause" });
  }, [dispatch]);

  const handleToggleRewind = useCallback(() => {
    dispatch({ type: "rewind" });
  }, [dispatch]);

  const handleTogglePrevious = useCallback(() => {
    dispatch({ type: "previous" });
  }, [dispatch]);

  const handleToggleNext = useCallback(() => {
    dispatch({ type: "next" });
  }, [dispatch]);

  const handleToggleForward = useCallback(() => {
    dispatch({ type: "forward" });
  }, [dispatch]);

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <span>You can navigate or change some values if you pause the live!</span>
      <Button
        onClick={handleToggleRewind}
        disabled={!isPaused || isAtTheBeginning || isAtFirstIndex}
      >
        {"<<"}
      </Button>
      <Button
        onClick={handleTogglePrevious}
        disabled={!isPaused || isAtTheBeginning}
      >
        {"<"}
      </Button>
      <Button onClick={handleTogglePause}>{isPaused ? "PLAY" : "PAUSE"}</Button>{" "}
      <Button onClick={handleToggleNext} disabled={!isPaused || isAtTheEnd}>
        {">"}
      </Button>
      <Button
        onClick={handleToggleForward}
        disabled={!isPaused || isAtTheEnd || isAtLastIndex}
      >
        {">>"}
      </Button>
    </div>
  );
};

export default LiveNavigation;
