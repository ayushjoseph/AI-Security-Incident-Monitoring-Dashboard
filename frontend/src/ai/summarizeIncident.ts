interface Incident {
  title: string;
  summary: string;
  location: string;
  severity: string;
}

export function summarizeIncident(incident: Incident) {
  let analysis = "";
 let recommendations: string[] = [];
  let riskScore = 0;

  switch (incident.severity) {
    case "CRITICAL":
      analysis =
        `Critical security incident detected at ${incident.location}. ` +
        `Immediate investigation is required to prevent further risk.`;

      recommendations = [
  "Notify SOC immediately",
  "Review CCTV footage",
  "Lock nearby access points",
  "Preserve system logs",
  "Escalate to Level-2 Analyst",
];

      riskScore = 95;
      break;

    case "HIGH":
      analysis =
        `High-risk incident detected at ${incident.location}. ` +
        `Prompt investigation is recommended.`;

      recommendations = [
  "Verify affected devices",
  "Notify the security team",
  "Review event logs",
];

      riskScore = 80;
      break;

    case "MEDIUM":
      analysis =
        `Medium-risk activity detected at ${incident.location}. ` +
        `Monitor the situation for additional suspicious behavior.`;

     recommendations = [
  "Continue monitoring",
  "Collect additional evidence",
];

      riskScore = 60;
      break;

    default:
      analysis =
        `Low-risk event detected at ${incident.location}.`;

     recommendations = [
  "Log the event",
  "Continue monitoring",
];

      riskScore = 30;
  }

  return {
  analysis,
  recommendations,
  riskScore,
};
}