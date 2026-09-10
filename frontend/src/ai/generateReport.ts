interface Incident {
  id: string;
  title: string;
  summary: string;
  location: string;
  severity: string;
  status: string;
  time: string;
}

interface AIResult {
  analysis: string;
  recommendations: string[];
  riskScore: number;
  confidence: number;
  reasons: string[];
}

export function generateReport(
  incident: Incident,
  aiResult: AIResult
) {
  return {
    reportId: `REPORT-${incident.id}`,
    incidentId: incident.id,
    title: incident.title,
    location: incident.location,
    severity: incident.severity,
    status: incident.status,
    time: incident.time,
    riskScore: aiResult.riskScore,
    confidence: aiResult.confidence,
    analysis: aiResult.analysis,
    reasons: aiResult.reasons,
    recommendations: aiResult.recommendations,
  };
}