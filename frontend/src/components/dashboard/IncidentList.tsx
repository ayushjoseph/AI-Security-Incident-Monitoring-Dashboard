import { useState } from "react";
import { getSeverityStyle } from "../../utils/severity";

interface IncidentListProps {
  incidents: typeof import("../../data/incidents").incidents;
  selectedIncident: (typeof import("../../data/incidents").incidents)[number];
  onSelectIncident: (
    incident: (typeof import("../../data/incidents").incidents)[number]
  ) => void;
}

function IncidentList({
  incidents,
  selectedIncident,
  onSelectIncident,
}: IncidentListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("ALL");

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      severityFilter === "ALL" ||
      incident.severity === severityFilter;

    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="px-20 mt-16">

      <h2 className="text-white text-2xl font-bold mb-6">
        Recent Incidents
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row">

  <input
    type="text"
    placeholder="Search incidents..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
    className="flex-1 px-4 py-3 rounded-lg bg-neutral-900 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-400/50"
  />

  <select
    value={severityFilter}
    onChange={(event) => setSeverityFilter(event.target.value)}
    className="px-4 py-3 rounded-lg bg-neutral-900 border border-white/10 text-white outline-none focus:border-cyan-400/50"
  >
    <option value="ALL">ALL SEVERITIES</option>
    <option value="CRITICAL">CRITICAL</option>
    <option value="HIGH">HIGH</option>
    <option value="MEDIUM">MEDIUM</option>
    <option value="LOW">LOW</option>
  </select>

</div>

      {/* Incident List */}
      <div className="space-y-4">

        {filteredIncidents.map((incident) => (

          <div
            key={incident.id}
            onClick={() => onSelectIncident(incident)}
            className={`cursor-pointer transition-all ${
              selectedIncident.id === incident.id
                ? "ring-1 ring-cyan-400/50 bg-white/10"
                : ""
            }`}
          >

            <div className="flex justify-between">

              <h3 className="text-white font-bold">
                {incident.title}
              </h3>

              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  border
                  text-xs
                  font-bold
                  ${getSeverityStyle(incident.severity)}
                `}
              >
                {incident.severity}
              </span>

            </div>

            <p className="text-zinc-400 mt-2">
              {incident.summary}
            </p>

            <p className="text-zinc-500 text-sm mt-3">
              {incident.location} • {incident.time}
            </p>

          </div>

        ))}

        {filteredIncidents.length === 0 && (
          <div className="text-zinc-500 text-center py-10">
            No incidents found.
          </div>
        )}

      </div>

    </div>
  );
}

export default IncidentList;