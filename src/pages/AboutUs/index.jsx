import React from "react";
import AboutUsCard from "../../Component/aboutus/AboutUsCard";
import AboutusFeatureCard from "../../Component/aboutus/AboutusFeatureCard";
function AboutUs() {
  const features = [
    "All-in-one app for basketball",
    "Free to use",
    "Live scoring",
    "Fixtures",
    "Player registration",
    "Player profiling",
    "Player Ranking",
    "Tournament registration",
    "Tournament updates",
    "Team registration",
    "Team Profile",
    "Basketball news",
    "Scoreboard",
    "Set points",
    "Time-outs",
    "Rules and regulations ",
  ];

  return (
    <div className="">
      <div className=" lg:text-left mx-auto px-10 sm:px-20 md:px-20 lg:px-20 xl:px-20 2xl:px-32 2xl:min-h-screen">
        <div className="xs:py-10 py-10">
          <h1 className="xs:text-3xl sm:text-3xl md:text-4xl text-center font-bold  italic uppercase text-[#ee6730]  ">About Us</h1>
        </div>
        <div className="">
          <AboutUsCard key={1} name={1} />
        </div>
        <div className="pb-32 mt-10">
          <div className="text-center">
            <h1 className="text-3xl text-center ">CBL Features</h1>
            <p className="w-full md:w-2/3 mx-auto p-2 text-gray-800 italic">
              Unleash the full potential of your basketball passion with our all-in-one web
              portal, featuring live scores, tournament updates, stats, and more.
            </p>
          </div>
          <div className="flex flex-wrap justify-center lg:grid-cols-4 gap-5 mt-10">
            {features.map((feature) => {
              return <AboutusFeatureCard key={feature} feature={feature} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
