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

  // -----------------------------------
  // 1. Risk score + analysis by severity
  // -----------------------------------

  switch (incident.severity) {
    case "CRITICAL":
      riskScore = 95;

      analysis =
        `Critical security incident detected at ${incident.location}. ` +
        `Immediate investigation is required to prevent further risk.`;

      break;

    case "HIGH":
      riskScore = 80;

      analysis =
        `High-risk incident detected at ${incident.location}. ` +
        `Prompt investigation is recommended.`;

      break;

    case "MEDIUM":
      riskScore = 60;

      analysis =
        `Medium-risk activity detected at ${incident.location}. ` +
        `Monitor the situation for additional suspicious behavior.`;

      break;

    case "LOW":
      riskScore = 30;

      analysis =
        `Low-risk event detected at ${incident.location}. ` +
        `Continue monitoring the activity.`;

      break;

    default:
      riskScore = 30;

      analysis =
        `Security event detected at ${incident.location}.`;

      break;
  }

  // -----------------------------------
  // 2. Recommendations by incident type
  // -----------------------------------

  switch (incident.title) {
    case "Camera Offline":
      recommendations = [
        "Check camera power",
        "Verify network connectivity",
        "Review last recorded footage",
        "Check for possible tampering",
      ];
      break;

    case "Unauthorized Access":
      recommendations = [
        "Notify SOC immediately",
        "Review CCTV footage",
        "Lock nearby access points",
        "Preserve security logs",
        "Escalate incident",
      ];
      break;

    case "Multiple Failed Logins":
      recommendations = [
        "Review authentication logs",
        "Identify the source IP",
        "Check the affected account",
        "Consider temporary account lock",
      ];
      break;

    case "Motion Detected":
      recommendations = [
        "Review CCTV footage",
        "Verify whether the activity is authorized",
        "Continue monitoring the area",
      ];
      break;

    case "Suspicious Login":
      recommendations = [
        "Review login location",
        "Verify user identity",
        "Check authentication logs",
      ];
      break;

    case "Unknown Device Connected":
      recommendations = [
        "Identify the connected device",
        "Verify device authorization",
        "Check network activity",
        "Review endpoint logs",
      ];
      break;

    default:
      recommendations = [
        "Review the incident",
        "Collect additional evidence",
        "Continue monitoring",
      ];
      break;
  }

  // -----------------------------------
  // 3. Return complete AI result
  // -----------------------------------

  return {
    analysis,
    recommendations,
    riskScore,
  };
}