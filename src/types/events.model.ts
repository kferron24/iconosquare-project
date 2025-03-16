export type Event = {
  index: number;
  value1: number;
  value2: number;
  comment: string;
};

export type EventState = {
  events: Event[];
  isPaused: boolean;
  pausedNewEvents: Event[]; // Use to not edit the Container File and keep a logical index
  navigationIndex: number;
};

export type EventAction = {
  type: string;
  payload?: Event;
};
