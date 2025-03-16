import React, { useContext, useReducer, createContext, ReactNode } from "react";
import { createRandomEvent } from "../utils";
import { Event, EventAction, EventState } from "../../types/events.model";

const LiveChartContext = createContext<
  | {
      data: EventState;
      dispatch: React.Dispatch<EventAction>;
    }
  | undefined
>(undefined);

const initialEvents: Event[] = Array.from(Array(50)).map((_, ix) =>
  createRandomEvent(ix)
);

const initialData = {
  events: initialEvents,
};

const liveChartReducer = (
  state: EventState,
  action: EventAction
): EventState => {
  switch (action.type) {
    case "new_event":
      return {
        events: [...state.events, action.payload!],
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

type LiveChartProviderProps = {
  children: ReactNode;
};

const LiveChartProvider: React.FC<LiveChartProviderProps> = ({ children }) => {
  const [data, dispatch] = useReducer(liveChartReducer, initialData);
  return (
    <LiveChartContext.Provider value={{ data, dispatch }}>
      {children}
    </LiveChartContext.Provider>
  );
};

const useLiveChartContext = () => {
  const context = useContext(LiveChartContext);
  if (!context) {
    throw new Error(
      "useLiveChartContext must be used within a LiveChartProvider"
    );
  }

  return context;
};

export { LiveChartProvider, useLiveChartContext };
