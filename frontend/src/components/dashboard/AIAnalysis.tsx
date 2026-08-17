import { summarizeIncident } from "../../ai/summarizeIncident";

interface AIAnalysisProps {
  incident: {
    title: string;
    summary: string;
    location: string;
    severity: string;
  };
}

function AIAnalysis({ incident }: AIAnalysisProps) {
  const result = summarizeIncident(incident);

  return (
    <div className="mx-20 mt-16 rounded-xl border border-white/10 bg-white/5 p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        🤖 AI Analysis
      </h2>

      <div className="mb-5">
        <p className="text-zinc-400 text-sm">Risk Score</p>
        <h3 className="text-4xl font-bold text-red-400">
          {result.riskScore}/100
        </h3>
      </div>
<div className="mb-5">
  <p className="text-zinc-400 text-sm">Latest Incident</p>

  <h3 className="text-xl font-semibold text-white mt-2">
    {incident.title}
  </h3>

  <p className="text-zinc-500 mt-1">
    {incident.location}
  </p>

  <span className="inline-block mt-3 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">
    {incident.severity}
  </span>
</div>
      <div className="mb-5">
        <p className="text-zinc-400 text-sm">Analysis</p>

        <p className="text-white mt-2">
          {result.analysis}
        </p>
      </div>

      <div>
        <p className="text-zinc-400 text-sm">
          Recommended Action
        </p>

       <ul className="mt-3 space-y-2">
  {result.recommendations.map((item, index) => (
    <li
      key={index}
      className="text-white flex items-center gap-2"
    >
      <span className="text-green-400">✔</span>
      {item}
    </li>
  ))}
</ul>
      </div>

    </div>
  );
}

export default AIAnalysis;