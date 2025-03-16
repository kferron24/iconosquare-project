import React, { useContext, useReducer, createContext, ReactNode } from "react";
import { createRandomEvent } from "../utils";
import { Event, EventAction, EventState } from "../../types/events.model";
import { DISPLAYED_EVENTS_NB } from "../constants";

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

const initialData: EventState = {
  events: initialEvents,
  isPaused: false,
  pausedNewEvents: [],
  previousValues: initialEvents,
  navigationIndex: initialEvents.length - DISPLAYED_EVENTS_NB / 2,
  isUpdated: false,
};

const liveChartReducer = (
  state: EventState,
  action: EventAction
): EventState => {
  switch (action.type) {
    case "new_event":
      if (state.isPaused) {
        return {
          ...state,
          pausedNewEvents: [...state.pausedNewEvents, action.payload!],
        };
      }
      return {
        ...state,
        events: [...state.events, action.payload!], // Use '!' since we know payload will be defined
        previousValues: [...state.previousValues, action.payload!],
        navigationIndex: ++state.navigationIndex,
      };
    case "toggle_pause":
      if (state.isPaused) {
        return {
          ...state,
          isPaused: false,
          events: [...state.events, ...state.pausedNewEvents],
          previousValues: [...state.previousValues, ...state.pausedNewEvents],
          pausedNewEvents: [],
          navigationIndex:
            state.events.length +
            state.pausedNewEvents.length -
            DISPLAYED_EVENTS_NB / 2,
          selectedEvent: undefined,
        };
      }
      return {
        ...state,
        isPaused: true,
      };
    case "rewind":
      return {
        ...state,
        navigationIndex: state.navigationIndex - 2,
      };
    case "previous":
      return {
        ...state,
        navigationIndex: --state.navigationIndex,
      };
    case "next":
      return {
        ...state,
        navigationIndex: ++state.navigationIndex,
      };
    case "forward":
      return {
        ...state,
        navigationIndex: state.navigationIndex + 2,
      };
    case "select_value":
      if (!action.payload?.selectedValue) {
        return state;
      }
      return {
        ...state,
        selectedEvent: {
          event: action.payload,
          selectedValue: action.payload.selectedValue,
        },
      };
    case "update_value":
      if (!action.payload || !state.selectedEvent) {
        return state;
      }

      const { index } = action.payload;
      const updatedEvents = [...state.events];
      updatedEvents[index] = action.payload;

      return {
        ...state,
        events: updatedEvents,
        selectedEvent: {
          ...state.selectedEvent,
          event: action.payload,
        },
        isUpdated: true,
      };
    case "reset":
      return {
        ...state,
        events: state.previousValues,
        isUpdated: false,
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
