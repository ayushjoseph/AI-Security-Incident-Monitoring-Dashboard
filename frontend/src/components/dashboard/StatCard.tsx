interface StatCardProps {
  title: string;
  value: string;
}


function StatCard({ title, value }: StatCardProps) {
  return (
    <div
      className="
      bg-white/5
      border border-white/10
      rounded-xl
      p-8
      backdrop-blur
      "
    >

      <p className="text-zinc-500 text-sm">
        {title}
      </p>


      <h2 className="text-white text-5xl font-bold mt-3">
        {value}
      </h2>


    </div>
  );
}


export default StatCard;