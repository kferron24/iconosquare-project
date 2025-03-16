import React, { useCallback, useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";
import { DISPLAYED_EVENTS_NB } from "../utils/constants";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";
import { SelectedValue } from "../types/events.model";

const LiveChart: React.FC = () => {
  const { data, dispatch } = useLiveChartContext();
  const halfDisplayedEvents = DISPLAYED_EVENTS_NB / 2;
  const eventsFiltered = useMemo(
    () =>
      data.events.slice(
        data.navigationIndex - halfDisplayedEvents,
        data.navigationIndex + halfDisplayedEvents
      ),
    [data.events, data.navigationIndex, halfDisplayedEvents]
  );

  const handleToggleSelection = useCallback<CategoricalChartFunc>(
    (e) => {
      const activeTooltipIndex = e.activeTooltipIndex;
      if (activeTooltipIndex && data.isPaused) {
        const selectedEvent = eventsFiltered[activeTooltipIndex];
        dispatch({
          type: "select_value",
          payload: { ...selectedEvent, selectedValue: SelectedValue.VALUE1 },
        });
      }
    },
    [data.isPaused, dispatch, eventsFiltered]
  );

  return (
    <div className="mb-8">
      <ResponsiveContainer height={250}>
        <AreaChart
          onClick={handleToggleSelection}
          data={eventsFiltered}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="index" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey="value1"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey="value2"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveChart;
