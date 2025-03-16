export const enum SelectedValue {
  VALUE1 = "value1",
  VALUE2 = "value2"
}

export type Event = {
  index: number;
  value1: number;
  value2: number;
  comment: string;
  selectedValue?: SelectedValue;
};

export type SelectedEvent = {
  event: Event;
  selectedValue: SelectedValue;
};

export type EventState = {
  events: Event[];
  isPaused: boolean;
  pausedNewEvents: Event[]; // Use to not edit the Container File and keep a logical index
  previousValues: Event[],
  navigationIndex: number;
  selectedEvent?: SelectedEvent;
  isUpdated: boolean
};

export type EventAction = {
  type: string;
  payload?: Event;
};
