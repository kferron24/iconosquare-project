import { Event } from "../types/events.model";

export const createRandomEvent = (index: number): Event => {
  return {
    index,
    value1: Math.round(Math.random() * 10000),
    value2: Math.round(Math.random() * 10000),
    comment: `Random comment ${index}`,
  };
};
