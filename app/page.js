"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [roms, setRoms] = useState([]);
  const [selectedRom, setSelectedRom] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gameLoaded, setGameLoaded] = useState(false);
  const gameContainerRef = useRef(null);

  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [cardStars, setCardStars] = useState({});


  useEffect(() => {
    setStars(
      [...Array(200)].map(() => ({
        size: Math.random() * 4,
        opacity: Math.random() * 0.7 + 0.3,
        top: Math.random() * 100,
        left: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: 2 + Math.random() * 3,
      }))
    );

    setShootingStars(
      [...Array(10)].map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        rotate: Math.random() * 360,
        duration: 5 + Math.random() * 10,
        delay: Math.random() * 20,
      }))
    );
  }, []);

  useEffect(() => {
    const fetchRoms = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/roms");

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }

        setRoms(data.roms);
        setLoading(false);

  
        const cardStarsData = {};
        data.roms.forEach((rom) => {
          cardStarsData[rom.name] = [...Array(3)].map(() => ({
            top: 20 + Math.random() * 60,
            left: Math.random() * 100,
          }));
        });
        setCardStars(cardStarsData);
      } catch (err) {
        setError("Error fetching ROMs: " + err.message);
        setLoading(false);
      }
    };

    fetchRoms();
  }, []);

  const handleSelectRom = async (rom) => {
    setSelectedRom(rom);
    setLoading(true);
    setGameLoaded(false);
    setError(null);

    try {
      const gameUrl = rom.url;
      const gameName = rom.name.replace(/\.[^/.]+$/, "");

 
      const container = gameContainerRef.current;
      if (container) container.innerHTML = "";

   
      window.EJS_player = "#game";
      window.EJS_core = "nes";
      window.EJS_gameName = gameName;
      window.EJS_color = "#000000";
      window.EJS_startOnLoaded = true;
      window.EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
      window.EJS_gameUrl = gameUrl;

    
      const script = document.createElement("script");
      script.src = "https://cdn.emulatorjs.org/stable/data/loader.js";
      script.onload = () => {
        setLoading(false);
        setGameLoaded(true);
        console.log(`${gameName} loaded successfully`);
      };
      script.onerror = () => {
        setError("Failed to load ROM.");
        setLoading(false);
      };
      document.body.appendChild(script);
    } catch (err) {
      setError("Error loading ROM: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 md:p-8 text-white overflow-hidden relative">
    
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}

    
        {shootingStars.map((star, i) => (
          <div
            key={i}
            className="absolute w-20 h-1 bg-gradient-to-r from-white to-transparent opacity-0"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              transform: `rotate(${star.rotate}deg)`,
              animation: `shootingStar ${star.duration}s infinite`,
              animationDelay: `${star.delay}s`,
            }}
          ></div>
        ))}
      </div>

          {/* Header */}
          <div className="relative text-center mb-8 z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 drop-shadow-lg">
              Nintendo in the Stars
            </h1>

            {/* Hard-coded SVG icon */}
            <div className="flex justify-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width={96} height={96} viewBox="0 0 24 24">
                <path fill="#e4f906" d="m4.447 12.546l-1.202-1.942h-.864v2.793h.864v-1.942l1.202 1.942h.856v-2.793H4.44zm6.828-1.001v-.279h-.451v-.376h-.841v.376h-.458v.279h.458v1.852h.841v-1.852zm-5.491 1.844h.834v-1.852h-.834zm0-2.213h.841v-.572h-.841zm14.663.233c-.676 0-1.224.467-1.224 1.039s.548 1.039 1.224 1.039s1.225-.467 1.225-1.039s-.549-1.039-1.225-1.039m.338 1.431c0 .293-.173.414-.338.414s-.346-.121-.346-.414v-.783c0-.294.173-.414.346-.414c.165 0 .338.12.338.414zm-2.659-1.212a1.1 1.1 0 0 0-.473-.166c-.601-.053-1.067.482-1.067.971c0 .648.496.881.571.919c.285.128.646.135.961-.068v.105h.827v-2.785h-.827c.008 0 .008.595.008 1.024m.008.828v.331c0 .286-.196.361-.331.361s-.331-.075-.331-.361v-.662c0-.287.196-.362.331-.362c.128 0 .33.075.33.362zm-9.556-1.001a1.02 1.02 0 0 0-.668.278v-.196h-.834v1.852h.834V12.17c0-.158.172-.339.398-.339c.225 0 .383.181.383.339v1.219h.834v-1.008c0-.731-.631-.942-.947-.926m6.798 0a1 1 0 0 0-.668.278v-.196h-.834v1.852h.834V12.17c0-.158.173-.339.398-.339s.383.181.383.339v1.219h.834v-1.008c0-.731-.631-.942-.947-.926m-1.75 1.016c0-.572-.556-1.054-1.232-1.054c-.683 0-1.232.467-1.232 1.039s.549 1.039 1.232 1.039c.564 0 1.044-.324 1.187-.76h-.834v.112c0 .339-.225.414-.345.414c-.128 0-.353-.075-.353-.413v-.385zm-1.517-.655a.35.35 0 0 1 .293-.166c.112 0 .225.053.293.166c.052.09.052.203.052.361h-.698c0-.158.007-.263.06-.361m9.893-.866q0-.135-.203-.135h-.188v.474h.113v-.196h.06l.09.196h.128l-.105-.211c.067-.022.105-.068.105-.128m-.218.068h-.06v-.136h.052q.104 0 .105.068c0 .053-.029.068-.097.068m.007-.392a.433.433 0 0 0-.428.43c0 .233.196.429.429.429a.429.429 0 0 0 0-.859zm0 .776a.35.35 0 0 1-.345-.346a.35.35 0 0 1 .346-.347a.35.35 0 0 1 .345.347a.35.35 0 0 1-.345.346zm-.938-2.364H3.132C1.254 9.03 0 10.386 0 12.004s1.254 2.959 3.14 2.959h17.72c1.886 0 3.14-1.34 3.14-2.959c-.007-1.618-1.269-2.966-3.147-2.966m-.008 5.202H3.14c-1.495.008-2.404-1.001-2.404-2.236s.917-2.228 2.404-2.236h17.705c1.487 0 2.404 1.001 2.404 2.236s-.909 2.236-2.404 2.236"></path>
              </svg>
            </div>
          </div>



      {/* Main content */}
      <div className="max-w-6xl mx-auto relative z-10">
        {error && (
          <div className="bg-red-900/80 backdrop-blur-sm border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-6 flex items-center animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        {/* Game display */}
        {selectedRom && (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-2xl mb-8 transform transition-all duration-300 hover:shadow-purple-500/20">
            <div className="flex items-center justify-between mb-4">
                         <a
                           href="https://nes-in-stars.vercel.app"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-sm font-medium text-purple-300 flex items-center gap-1 hover:text-yellow-300 transition-colors"
                         >
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             className="h-4 w-4"
                             viewBox="0 0 20 20"
                             fill="currentColor"
                           >
                             <path
                               fillRule="evenodd"
                               d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                               clipRule="evenodd"
                             />
                           </svg>
                           nes-in-stars.vercel.app
                         </a>

              {gameLoaded && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900/30 text-green-300 border border-green-700/50">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                  Online
                </span>
              )}
            </div>

            <p className="text-lg font-medium text-white mb-4 text-center glow-purple">
              {selectedRom.name.replace(/\.[^/.]+$/, "")}
            </p>

            <div className="relative mx-auto w-full max-w-2xl">
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 transition-opacity duration-300"></div>

              <div
                id="game"
                className="relative bg-black/80 aspect-video w-full rounded-lg overflow-hidden shadow-2xl border-2 border-purple-500/30 crt-tv-screen transform-gpu"
                ref={gameContainerRef}
              ></div>
            </div>

                         <div className="mt-4 text-center text-gray-300 text-sm flex items-center justify-center gap-2">
                           <img src="/kb.svg" alt="Keyboard" className="w-8 h-8 inline-block" />
                           <p className="inline">Z X V ENTER</p>
                         </div>

          </div>
        )}

        {/* Game library */}
        {roms.length > 0 && (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-2xl mt-8">
            <h3 className="text-xl font-semibold mb-4 text-purple-200 text-center flex items-center justify-center">
              NES ROMs
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[24rem] overflow-y-auto pr-2 custom-scrollbar">
              {roms.map((rom, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectRom(rom)}
                  disabled={loading}
                  className={`p-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105 relative overflow-hidden group ${
                    selectedRom?.name === rom.name
                      ? "bg-purple-600/80 border-2 border-purple-400"
                      : "bg-gray-900/60 border border-gray-700 hover:bg-purple-800/40"
                  } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {/* Card stars */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cardStars[rom.name]?.map((s, idx) => (
                      <div
                        key={idx}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{ top: `${s.top}%`, left: `${s.left}%` }}
                      />
                    ))}
                  </div>

                  <div className="w-full h-20 mb-2 flex items-center justify-center bg-black/30 rounded group-hover:bg-purple-900/20 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-purple-400 group-hover:text-yellow-300 transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium truncate">{rom.name.replace(/\.[^/.]+$/, "")}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

                             <footer className="mt-12 text-center text-gray-400 text-sm relative z-10">
                               <a
                                 href="https://nes-in-stars.vercel.app"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="hover:text-yellow-300 transition-colors"
                               >
                                 Nintendo in the Stars
                               </a>
                             </footer>


      <style jsx>{`
        @keyframes shootingStar {
          0% {
            opacity: 0;
            transform: translateX(0) translateY(0);
          }
          5% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(100vw) translateY(100vh);
          }
        }

        .crt-tv-screen {
          position: relative;
        }
        .crt-tv-screen:after {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.1);
          opacity: 0.2;
          z-index: 2;
          pointer-events: none;
        }
        .glow-purple {
          text-shadow: 0 0 10px rgba(192, 132, 252, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
        }
      `}</style>
    </div>
  );
}
