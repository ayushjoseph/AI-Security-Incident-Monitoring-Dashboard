const titles = [
  "Unauthorized Access",
  "Motion Detected",
  "Camera Offline",
  "Suspicious Login",
  "Unknown Device Connected",
  "Multiple Failed Logins"
];

const locations = [
  "Server Room",
  "Main Entrance",
  "Parking Area",
  "HR Office",
  "Admin Portal",
  "Warehouse"
];

const severities = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL"
];

export function generateIncident() {

  const title =
    titles[Math.floor(Math.random() * titles.length)];

  const location =
    locations[Math.floor(Math.random() * locations.length)];

  const severity =
    severities[Math.floor(Math.random() * severities.length)];

  return {

    id: `INC-${Date.now()}`,

    title,

    location,

    severity,

    status: "Open",

    time: new Date().toLocaleTimeString(),

    summary: `AI detected ${title.toLowerCase()} at ${location}.`

  };

}