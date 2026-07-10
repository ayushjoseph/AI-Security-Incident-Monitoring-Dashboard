import Navbar from "./components/layout/Navbar";
import Hero from "./components/dashboard/Hero";
import StatCard from "./components/dashboard/StatCard";
import IncidentList from "./components/dashboard/IncidentList";
import IncidentTimeline from "./components/dashboard/IncidentTimeline";
function App() {
  return (
    <div className="min-h-screen bg-neutral-950">

      <Navbar />

      <Hero />

      <div className="grid grid-cols-3 gap-6 px-20 mt-20">

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
          value="248"
        />

      </div>
            <IncidentList />
            <IncidentTimeline />
    </div>
  );
}

export default App;