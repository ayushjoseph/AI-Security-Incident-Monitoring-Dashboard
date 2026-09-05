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
const severityStyles = {
  CRITICAL:
    "border-red-500/40 bg-red-500/10 text-red-400",

  HIGH:
    "border-orange-500/40 bg-orange-500/10 text-orange-400",

  MEDIUM:
    "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",

  LOW:
    "border-green-500/40 bg-green-500/10 text-green-400",
};

const severityStyle =
  severityStyles[incident.severity as keyof typeof severityStyles] ||
  severityStyles.LOW;
  return (
<div className="mx-20 mt-16 rounded-xl border border-white/10 bg-white/5 p-6 mb-16">

      <h2 className="text-2xl font-bold text-white mb-6">
        🤖 AI Analysis
      </h2>

<div className="mb-6">
  <p className="text-zinc-400 text-sm">Risk Score</p>

  <div className="flex items-end gap-3 mt-1">
    <h3
      className={`text-4xl font-bold ${
        severityStyle
          .split(" ")
          .find((style) => style.startsWith("text-"))
      }`}
    >
      {result.riskScore}
    </h3>

    <span className="text-zinc-500 mb-1">
      /100
    </span>
  </div>
<div className="mb-8">
  <div className="flex items-center justify-between">
    <p className="text-sm text-zinc-400">
      AI Confidence
    </p>

    <p className="font-semibold text-white">
      {result.confidence}%
    </p>
  </div>

  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
    <div
      className="h-full bg-cyan-400 transition-all duration-700"
      style={{ width: `${result.confidence}%` }}
    />
  </div>
</div>
<div className="mb-8">
  <p className="text-sm text-zinc-400">
    Why this assessment?
  </p>

  <ul className="mt-3 space-y-2">
    {result.reasons.map((reason, index) => (
      <li
        key={index}
        className="flex items-start gap-2 text-white"
      >
        <span className="text-cyan-400">•</span>
        {reason}
      </li>
    ))}
  </ul>
</div>
  <div className="mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
    <div
      className={`h-full transition-all duration-700 ${
        severityStyle
          .split(" ")
          .find((style) => style.startsWith("bg-"))
      }`}
      style={{ width: `${result.riskScore}%` }}
    />
  </div>

  <p className="text-zinc-500 text-xs mt-2">
    Threat Level:{" "}
    <span className="text-white font-semibold">
      {incident.severity}
    </span>
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