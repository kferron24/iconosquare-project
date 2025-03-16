import { useEffect, useRef } from "react";
import {
  LiveChartProvider,
  useLiveChartContext,
} from "../utils/hooks/useLiveChartContext";
import { createRandomEvent } from "../utils/utils";
import Content from "./Content";

// ONLY EDITED FOR TYPESCRIPT

const ContainerContent: React.FC = () => {
  const currentIndex = useRef(50);
  const { dispatch } = useLiveChartContext();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({
        type: "new_event",
        payload: createRandomEvent(
          ++currentIndex.current - 1
          // Necessary because the next index is 51 and not 50 by default and the initial state put an array as 0 --> 49
        ),
      });
    }, 2000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Content />;
};

const Container: React.FC = () => {
  return (
    <LiveChartProvider>
      <ContainerContent />
    </LiveChartProvider>
  );
};

export default Container;
