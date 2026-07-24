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
        <p className="text-zinc-400 text-sm">Analysis</p>

        <p className="text-white mt-2">
          {result.analysis}
        </p>
      </div>

      <div>
        <p className="text-zinc-400 text-sm">
          Recommended Action
        </p>

        <p className="text-white mt-2">
          {result.recommendation}
        </p>
      </div>

    </div>
  );
}

export default AIAnalysis;