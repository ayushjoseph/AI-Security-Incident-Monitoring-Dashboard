interface Incident {
  title: string;
  summary: string;
  location: string;
  severity: string;
}

export function summarizeIncident(incident: Incident) {
  let analysis = "";
  let recommendation = "";
  let riskScore = 0;

  switch (incident.severity) {
    case "CRITICAL":
      analysis =
        `Critical security incident detected at ${incident.location}. ` +
        `Immediate investigation is required to prevent further risk.`;

      recommendation =
        "Notify SOC immediately, isolate affected systems, and review CCTV footage.";

      riskScore = 95;
      break;

    case "HIGH":
      analysis =
        `High-risk incident detected at ${incident.location}. ` +
        `Prompt investigation is recommended.`;

      recommendation =
        "Verify affected devices and notify the security team.";

      riskScore = 80;
      break;

    case "MEDIUM":
      analysis =
        `Medium-risk activity detected at ${incident.location}. ` +
        `Monitor the situation for additional suspicious behavior.`;

      recommendation =
        "Continue monitoring and collect additional evidence.";

      riskScore = 60;
      break;

    default:
      analysis =
        `Low-risk event detected at ${incident.location}.`;

      recommendation =
        "Log the event and continue monitoring.";

      riskScore = 30;
  }

  return {
    analysis,
    recommendation,
    riskScore,
  };
}