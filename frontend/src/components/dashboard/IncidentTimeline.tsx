import { timelineEvents } from "../../data/timeline";


function IncidentTimeline() {


return(

<div className="px-20 mt-16 pb-20">


<h2 className="text-white text-2xl font-bold mb-8">

Incident Timeline

</h2>


<div className="space-y-6">


{timelineEvents.map((event)=>(


<div

key={event.id}

className="
border-l
border-cyan-400
pl-6
"


>


<p className="text-cyan-400 text-sm">

{event.time}

</p>


<h3 className="text-white font-bold mt-1">

{event.title}

</h3>


<p className="text-zinc-400 mt-2">

{event.description}

</p>


<span className="
inline-block
mt-3
text-xs
text-zinc-500
">

{event.type}

</span>


</div>


))}


</div>


</div>

)


}


export default IncidentTimeline;