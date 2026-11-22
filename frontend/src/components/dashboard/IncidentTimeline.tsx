import { useState } from "react";

import {
  timelineEvents,
  type ActivityEvent,
} from "../../data/timeline";

interface IncidentTimelineProps {
  events: ActivityEvent[];
  incidents: typeof import("../../data/incidents").incidents;
}

function IncidentTimeline({
  events = timelineEvents,
  incidents,
}: IncidentTimelineProps) {
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [incidentFilter, setIncidentFilter] = useState("ALL");

  const eventTypes = Array.from(
    new Set(events.map((event) => event.type))
  );

  const filteredEvents = events.filter((event) => {
    const matchesType =
      typeFilter === "ALL" || event.type === typeFilter;

    const matchesIncident =
      incidentFilter === "ALL" ||
      (incidentFilter === "UNASSIGNED"
        ? !event.incidentId
        : event.incidentId === incidentFilter);

    return matchesType && matchesIncident;
  });

  return (
    <div className="px-20 mt-16 pb-20">

      <h2 className="text-white text-2xl font-bold mb-8">
        Incident Timeline
      </h2>

      {/* Activity Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          className="rounded-lg bg-neutral-900 border border-white/10 px-4 py-3 text-white outline-none"
        >
          <option value="ALL">ALL EVENT TYPES</option>

          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={incidentFilter}
          onChange={(event) => setIncidentFilter(event.target.value)}
          className="rounded-lg bg-neutral-900 border border-white/10 px-4 py-3 text-white outline-none"
        >
          <option value="ALL">ALL INCIDENTS</option>
          <option value="UNASSIGNED">SYSTEM / UNASSIGNED</option>

          {incidents.map((incident) => (
            <option key={incident.id} value={incident.id}>
              {incident.title} — {incident.location}
            </option>
          ))}
        </select>

      </div>

      {/* Activity Events */}
      <div className="space-y-6">

        {filteredEvents.map((event) => {
          const relatedIncident = incidents.find(
            (incident) => incident.id === event.incidentId
          );

          return (
            <div
              key={event.id}
              className="border-l border-cyan-400 pl-6"
            >

              <p className="text-cyan-400 text-sm">
                {event.time}
              </p>

              <h3 className="text-white font-bold mt-1">
                {event.title}
              </h3>

              <p className="text-zinc-400 mt-2">
                {event.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3">

                <span className="text-xs text-zinc-500">
                  {event.type}
                </span>

                {relatedIncident && (
                  <span className="text-xs text-cyan-400">
                    {relatedIncident.title} · {relatedIncident.location}
                  </span>
                )}

                {!event.incidentId && (
                  <span className="text-xs text-zinc-500">
                    SYSTEM EVENT
                  </span>
                )}

              </div>

            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <p className="text-zinc-500 py-8 text-center">
            No activity found for the selected filters.
          </p>
        )}

      </div>

    </div>
  );
}

export default IncidentTimeline;