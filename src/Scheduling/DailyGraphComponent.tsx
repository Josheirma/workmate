import React from "react";

// Timeline24h.tsx
// Single-file React + TypeScript component that renders a 24-hour timeline
// with 15-minute sections (96 segments). The timeline content starts 400px
// to the right (a 400px left spacer). Uses Tailwind classes for quick styling.

type Timeline24hProps = {
  segmentWidth?: number; // width in px for each 15-minute segment
  height?: number; // height of the timeline track in px
  heading?: string;
};

const TOTAL_SEGMENTS = 24 * 4; // 24 hours * 4 (15-min segments) = 96
const LEFT_SPACER = 400; // px to start the timeline to the right

export default function Timeline24h({
  segmentWidth = 18,
  height = 72,
  heading = "24-hour Timeline (15-min sections)",
}: Timeline24hProps) {
  const totalWidth = LEFT_SPACER + TOTAL_SEGMENTS * segmentWidth;

  // Create an array of segment indices 0..95
  const segments = Array.from({ length: TOTAL_SEGMENTS }, (_, i) => i);

  // Utility to convert segment index to readable time (HH:MM)
  const timeLabel = (segmentIndex: number) => {
    const minutes = segmentIndex * 15;
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const hh = hour.toString().padStart(2, "0");
    const mm = minute.toString().padStart(2, "0");
    return `${hh}:${mm}`;
  };

  return (
    <div className="w-full">
      {/* Top heading */}
      <div className="px-4 py-3">
        <h1 className="text-2xl font-semibold">{heading}</h1>
      </div>

      {/* Scroll container so the timeline can overflow horizontally on small screens */}
      <div className="overflow-x-auto border-t border-b border-gray-200">
        {/* Canvas area */}
        <div
          className="relative"
          style={{ width: totalWidth, minWidth: totalWidth }}
          aria-hidden={false}
        >
          {/* Hour labels row (above track) */}
          <div className="flex items-end select-none" style={{ height: 40 }}>
            {/* left spacer */}
            <div style={{ width: LEFT_SPACER }} />

            {/* show an hour label every 1 hour (every 4 segments) */}
            {segments.map((s) => {
              const showHour = s % 4 === 0; // every 4 segments == 1 hour
              return (
                <div
                  key={`label-${s}`}
                  style={{ width: segmentWidth, minWidth: segmentWidth }}
                  className="flex items-end justify-center"
                >
                  {showHour ? (
                    <div className="text-xs font-medium">{timeLabel(s)}</div>
                  ) : (
                    <div className="text-xs opacity-0">{timeLabel(s)}</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Timeline track area */}
          <div className="absolute left-0 top-10" style={{ height }}>
            {/* track background */}
            <div className="flex items-stretch" style={{ height }}>
              {/* left spacer visual (space where nothing is drawn) */}
              <div style={{ width: LEFT_SPACER }} />

              {/* segments */}
              <div className="flex" role="list" aria-label="15-minute segments">
                {segments.map((s) => (
                  <div
                    key={`seg-${s}`}
                    role="listitem"
                    style={{ width: segmentWidth, minWidth: segmentWidth }}
                    className="h-full border-l border-gray-200"
                    title={timeLabel(s)}
                  >
                    {/* Optional: small tick mark in the top of the segment */}
                    <div className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* A thicker hour separator line drawn on top of the segments */}
            <div className="absolute left-0 top-0" style={{ width: totalWidth }}>
              <div style={{ height: 0 }}>
                {/* draw vertical thicker lines every hour */}
                <div className="relative">
                  {/* left spacer is empty */}
                  <div style={{ width: LEFT_SPACER, display: "inline-block" }} />

                  {/* hour lines */}
                  {Array.from({ length: 24 }, (_, hr) => {
                    const left = LEFT_SPACER + hr * 4 * segmentWidth;
                    return (
                      <div
                        key={`hour-${hr}`}
                        style={{ left, position: "absolute", top: 0, bottom: 0 }}
                      >
                        <div className="h-full" style={{ width: 1, background: "rgba(0,0,0,0.12)" }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Example content: a sample event bar from 08:15 to 10:45 */}
            <div className="absolute left-0 top-8" style={{ width: totalWidth }}>
              {/* For accessibility show a demo event */}
              <div
                style={{
                  left: LEFT_SPACER + (8 * 4 + 1) * segmentWidth, // 08:15 -> hour 8 *4 + 1
                  width: (2 * 4 + 3) * segmentWidth, // 2h30m = 10:45 - 08:15 -> 2.5h = 10 segments
                }}
                className="absolute top-2 rounded-md px-2 py-1 text-sm text-white bg-gradient-to-r from-sky-600 to-indigo-600 shadow-md"
                role="button"
                aria-label="Sample event from 08:15 to 10:45"
              >
                Sample event — 08:15 to 10:45
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Short usage note */}
      <div className="mt-3 px-4 text-sm text-gray-600">
        Tip: wrap this component in a container with <code className="rounded bg-gray-100 px-1">w-full</code>
        and allow horizontal scrolling. Adjust <code className="rounded bg-gray-100 px-1">segmentWidth</code>
        to compress or expand the time scale.
      </div>
    </div>
  );
}

/*
Usage example:

import Timeline24h from './Timeline24h';

function App() {
  return (
    <div className="p-4">
      <Timeline24h segmentWidth={18} height={80} heading="My Schedule" />
    </div>
  );
}

*/
