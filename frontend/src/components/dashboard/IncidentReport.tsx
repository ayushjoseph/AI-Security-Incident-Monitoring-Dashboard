import { useState } from "react";
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

  onStatusChange: (status: string) => void;
}

function IncidentReport({
  incident,
  onStatusChange,
}: IncidentReportProps) {
  const aiResult = summarizeIncident(incident);
  const [copied, setCopied] = useState(false);

  const report = generateReport(incident, aiResult);

  const reportText = `
SECURITY INCIDENT REPORT

Report ID: ${report.reportId}
Incident ID: ${report.incidentId}

Incident: ${report.title}
Location: ${report.location}
Severity: ${report.severity}
Status: ${report.status}
Time: ${report.time}

Risk Score: ${report.riskScore}/100
AI Confidence: ${report.confidence}%

AI Analysis:
${report.analysis}

Assessment Reasons:
${report.reasons.map((reason) => `- ${reason}`).join("\n")}

Recommended Actions:
${report.recommendations.map((item) => `- ${item}`).join("\n")}
`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(reportText);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([reportText], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${report.reportId}.txt`;

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="incident-report"
      className="mx-20 mt-16 mb-16 rounded-xl border border-white/10 bg-white/5 p-8"
    >
      <div className="mb-8 flex items-start justify-between">

        <div>
          <p className="text-xs tracking-widest text-zinc-500">
            SECURITY REPORT
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Incident Report
          </h2>
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={handleCopy}
            className="no-print rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
          >
            {copied ? "Copied!" : "Copy Report"}
          </button>

          <button
            onClick={() => window.print()}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 no-print"
          >
            Print Report
          </button>

          <button
            onClick={handleDownload}
            className="no-print rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
          >
            Download
          </button>

          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
            {report.reportId}
          </span>

        </div>

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

          <select
            value={incident.status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="no-print mt-1 rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-white outline-none focus:border-cyan-400/50"
          >
            <option value="Open">Open</option>
            <option value="Investigating">Investigating</option>
            <option value="Resolved">Resolved</option>
          </select>

          <p className="status-print mt-1 hidden text-white">
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