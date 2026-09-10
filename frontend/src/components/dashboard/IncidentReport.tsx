import { summarizeIncident } from "../../ai/summarizeIncident";
import { generateReport } from "../../ai/generateReport";

interface IncidentReportProps {
  incident: {
    id: string;
    title: string;
    summary: string;
    location: string;
    severity: string;
    status: string;
    time: string;
  };
}

function IncidentReport({ incident }: IncidentReportProps) {
  const aiResult = summarizeIncident(incident);

  const report = generateReport(incident, aiResult);

  return (
    <section className="mx-20 mt-16 mb-16 rounded-xl border border-white/10 bg-white/5 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <p className="text-xs tracking-widest text-zinc-500">
            SECURITY REPORT
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Incident Report
          </h2>
        </div>

        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
          {report.reportId}
        </span>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-zinc-500">Incident</p>
          <p className="mt-1 font-semibold text-white">
            {report.title}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Location</p>
          <p className="mt-1 text-white">
            {report.location}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Severity</p>
          <p className="mt-1 font-semibold text-white">
            {report.severity}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Status</p>
          <p className="mt-1 text-white">
            {report.status}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Risk Score</p>
          <p className="mt-1 text-xl font-bold text-white">
            {report.riskScore}/100
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">AI Confidence</p>
          <p className="mt-1 text-xl font-bold text-white">
            {report.confidence}%
          </p>
        </div>

      </div>

      <div className="mt-8">

        <p className="text-sm text-zinc-500">
          AI Analysis
        </p>

        <p className="mt-2 text-white">
          {report.analysis}
        </p>

      </div>

      <div className="mt-8">

        <p className="text-sm text-zinc-500">
          Assessment Reasons
        </p>

        <ul className="mt-3 space-y-2">

          {report.reasons.map((reason, index) => (
            <li
              key={index}
              className="flex gap-2 text-white"
            >
              <span className="text-cyan-400">•</span>
              {reason}
            </li>
          ))}

        </ul>

      </div>

      <div className="mt-8">

        <p className="text-sm text-zinc-500">
          Recommended Actions
        </p>

        <ul className="mt-3 space-y-2">

          {report.recommendations.map((recommendation, index) => (
            <li
              key={index}
              className="flex gap-2 text-white"
            >
              <span className="text-green-400">✓</span>
              {recommendation}
            </li>
          ))}

        </ul>

      </div>

    </section>
  );
}

export default IncidentReport;