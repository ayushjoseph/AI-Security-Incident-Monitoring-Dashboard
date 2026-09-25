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

function App() {
  const [liveIncidents, setLiveIncidents] = useState(incidents);
  const [selectedIncident, setSelectedIncident] = useState(liveIncidents[0]);

  useEffect(() => {
  const timer = setInterval(() => {
    const newIncident = generateIncident();

    setLiveIncidents((previous) => [
      newIncident,
      ...previous,
    ]);

    setSelectedIncident(newIncident);
  }, 10000);

  return () => clearInterval(timer);
}, []);
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

      <IncidentTimeline />

      <AIAnalysis incident={selectedIncident} />

      <IncidentReport incident={selectedIncident} />

    </div>
  );
}

export default App;