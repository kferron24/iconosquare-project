export type Event = {
  index: number;
  value1: number;
  value2: number;
  comment: string;
};

export type EventState = {
  events: Event[];
};

export type EventAction = {
  type: string;
  payload?: Event;
};
