import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/dashboard/Hero";
import StatCard from "./components/dashboard/StatCard";
import IncidentList from "./components/dashboard/IncidentList";
import IncidentTimeline from "./components/dashboard/IncidentTimeline";
import AIAnalysis from "./components/dashboard/AIAnalysis";
import IncidentReport from "./components/dashboard/IncidentReport";

import { incidents } from "./data/incidents";
import { generateIncident } from "./data/generateIncident";
import {
  timelineEvents,
  type ActivityEvent,
} from "./data/timeline";

function App() {
  const [liveIncidents, setLiveIncidents] = useState(incidents);

  const [selectedIncident, setSelectedIncident] = useState(
    incidents[0]
  );

  // Keep the initial timeline and add new activity to it.
  const [activityEvents, setActivityEvents] =
    useState<ActivityEvent[]>(timelineEvents);

  // Generate a new incident every 10 seconds.
useEffect(() => {
  const timer = setInterval(() => {
    const newIncident = generateIncident();

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Add the new incident to the list.
    setLiveIncidents((previous) => [
      newIncident,
      ...previous,
    ]);

    // Automatically select the new incident.
    setSelectedIncident(newIncident);

    // Record the new incident at the top of the timeline.
    setActivityEvents((previous) => [
      {
        id: `incident-${newIncident.id}-${Date.now()}`,
        time: currentTime,
        title: "New Incident Detected",
        type: "ALERT",
        description: `${newIncident.title} detected at ${newIncident.location}.`,
        incidentId: newIncident.id,
      },
      ...previous,
    ]);
  }, 10000);

  return () => clearInterval(timer);
}, []);

  // Update the selected incident and record its status change.
  const handleStatusChange = (newStatus: string) => {
    if (selectedIncident.status === newStatus) {
      return;
    }

    const previousStatus = selectedIncident.status;

    const updatedIncident = {
      ...selectedIncident,
      status: newStatus,
    };

    // Update the incident list.
    setLiveIncidents((previous) =>
      previous.map((incident) =>
        incident.id === updatedIncident.id
          ? updatedIncident
          : incident
      )
    );

    // Update the selected incident and report.
    setSelectedIncident(updatedIncident);

    // Add a status-change event to the activity timeline.
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setActivityEvents((previous) => [
  {
    id: `status-${updatedIncident.id}-${Date.now()}`,
    time: currentTime,
    title: "Incident Status Updated",
    type: "STATUS",
    description: `${updatedIncident.title}: status changed from ${previousStatus} to ${newStatus}.`,
    incidentId: updatedIncident.id,
  },
  ...previous,
]);
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      <Hero />

      <div className="grid grid-cols-1 gap-6 px-6 mt-20 md:grid-cols-3 md:px-20">
        <StatCard
          title="CRITICAL INCIDENTS"
          value="03"
        />

        <StatCard
          title="CAMERAS ACTIVE"
          value="12"
        />

        <StatCard
          title="AI EVENTS"
          value={liveIncidents.length.toString()}
        />
      </div>

      <IncidentList
        incidents={liveIncidents}
        selectedIncident={selectedIncident}
        onSelectIncident={setSelectedIncident}
      />

      <IncidentTimeline events={activityEvents} />

      <AIAnalysis incident={selectedIncident} />

      <IncidentReport
        incident={selectedIncident}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default App;