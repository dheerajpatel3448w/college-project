import React from 'react';
import { Users, UserCheck, Award } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 shadow-2xl font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-24 py-4 md:py-0 gap-4 md:gap-0">

          <div className="flex-shrink-0 flex items-center gap-4 group cursor-pointer">

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <img 
                className="relative h-14 w-auto rounded-md bg-white p-1 object-contain" 
                src="https://tse3.mm.bing.net/th/id/OIP.bfE4nn77fd8PDTDRuqpxngAAAA?pid=Api&P=0&h=180" 
                alt="IIST Logo" 
                onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex'}}
              />
              <div className="hidden relative h-14 w-14 rounded-md bg-white items-center justify-center text-blue-900 font-bold text-xl border-2 border-blue-500">
                IIST
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-wide group-hover:text-blue-400 transition-colors">
                Hammming Code Error Detection and Correction
              </span>
              <span className="text-slate-500 text-xs uppercase tracking-widest">
                Information Technology Dept.
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
            
            <div className="flex items-center gap-3 bg-slate-800/50 px-5 py-2 rounded-full border border-slate-700/50 hover:bg-slate-800 transition-all">
              <div className="bg-blue-900/50 p-2 rounded-full text-blue-400">
                <UserCheck size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Submitted To
                </span>
                <span className="text-blue-100 font-semibold">
                  Prof. Rakesh Verma Sir
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/50 px-5 py-2 rounded-full border border-slate-700/50 hover:bg-slate-800 transition-all">
              <div className="bg-emerald-900/50 p-2 rounded-full text-emerald-400">
                <Users size={18} />
              </div>

              <div className="flex flex-col text-right md:text-left">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">
                  Submitted By
                </span>

                <div className="flex gap-2 text-slate-200 font-medium text-xs">
                  <span className="hover:text-emerald-400 transition-colors cursor-default">Dheeraj Patel</span>
                  <span className="text-slate-600">•</span>
                  <span className="hover:text-emerald-400 transition-colors cursor-default">Daksh Nimje</span>
                  <span className="text-slate-600">•</span>
                  <span className="hover:text-emerald-400 transition-colors cursor-default">Honey Chilhate</span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                  <span className="bg-slate-700/50 px-1.5 py-0.5 rounded text-slate-300">IT</span>
                  <span className="text-slate-600">|</span>
                  <span>Third Year</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-emerald-400/90">Computer Network</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    </nav>
  );
};

export default Navbar;
