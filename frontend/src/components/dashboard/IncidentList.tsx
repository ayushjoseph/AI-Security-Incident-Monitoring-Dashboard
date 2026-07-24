import { getSeverityStyle } from "../../utils/severity";
interface IncidentListProps {

    incidents: typeof import("../../data/incidents").incidents;
}


function IncidentList({ incidents }: IncidentListProps) {


return (

<div className="px-20 mt-16">


<h2 className="text-white text-2xl font-bold mb-6">

Recent Incidents

</h2>


<div className="space-y-4">


{incidents.map((incident)=>(


<div

key={incident.id}

className="
bg-white/5
border
border-white/10
rounded-xl
p-5
"


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