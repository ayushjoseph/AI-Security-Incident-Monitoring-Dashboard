export function getSeverityStyle(severity: string) {
  switch (severity) {
    case "CRITICAL":
      return "bg-red-500/20 text-red-400 border-red-500/40";

    case "HIGH":
      return "bg-orange-500/20 text-orange-400 border-orange-500/40";

    case "MEDIUM":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";

    case "LOW":
      return "bg-green-500/20 text-green-400 border-green-500/40";

    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/40";
  }
}

