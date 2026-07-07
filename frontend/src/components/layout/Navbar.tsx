function Navbar() {
  return (
    <nav className="flex justify-between items-center px-12 py-8">

      <h1 className="text-white font-black tracking-widest">
        SENTINEL AI
      </h1>


      <div className="flex gap-10 text-xs text-zinc-400 tracking-widest">

        <span>DASHBOARD</span>
        <span>INCIDENTS</span>
        <span>REPORTS</span>

      </div>


    </nav>
  );
}


export default Navbar;