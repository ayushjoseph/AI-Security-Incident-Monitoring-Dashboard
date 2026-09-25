import { getSeverityStyle } from "../../utils/severity";
interface IncidentListProps {
  incidents: typeof import("../../data/incidents").incidents;
  selectedIncident: (typeof import("../../data/incidents").incidents)[number];
  onSelectIncident: (
    incident: (typeof import("../../data/incidents").incidents)[number]
  ) => void;
}


function IncidentList({
  incidents,
  selectedIncident,
  onSelectIncident,
}: IncidentListProps) {


return (

<div className="px-20 mt-16">


<h2 className="text-white text-2xl font-bold mb-6">

Recent Incidents

</h2>


<div className="space-y-4">


{incidents.map((incident)=>(


<div
  key={incident.id}
  onClick={() => onSelectIncident(incident)}
  className={`cursor-pointer transition-all ${
    selectedIncident.id === incident.id
      ? "ring-1 ring-cyan-400/50 bg-white/10"
      : ""
  }`}
>


<div className="flex justify-between">


<h3 className="text-white font-bold">

{incident.title}

</h3>

<span
  className={`
    px-3
    py-1
    rounded-full
    border
    text-xs
    font-bold
    ${getSeverityStyle(incident.severity)}
  `}
>
  {incident.severity}
</span>


</div>



<p className="text-zinc-400 mt-2">

{incident.summary}

</p>


<p className="text-zinc-500 text-sm mt-3">

{incident.location} • {incident.time}

</p>


</div>


))}


</div>


</div>

)


}


export default IncidentList;