import React from "react";

function EventHero() {
  return (
    <div className="h-64 sm:h-80 md:h-96 w-full bg-slate-700 flex flex-col justify-center items-center text-center px-4">
      <h2 className="text-white font-bold text-4xl sm:text-5xl md:text-7xl lg:text-[100px]">
        All Events
      </h2>

      <span className="text-white text-sm sm:text-base md:text-lg mt-2">
        Here are all the events
      </span>
    </div>
  );
}

export default EventHero;
