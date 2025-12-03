/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Microscope, Calculator, RefreshCcw, ArrowRight } from 'lucide-react';

const HammingDeepDive = ({ getbit }) => {
  const [dataInput, setDataInput] = useState('');
  const [cleanCode, setCleanCode] = useState([]);
  const [userCode, setUserCode] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const generateCode = (bits) => {
    if (!bits) return [];
    const m = bits.length;
    let r = 0;
    while (Math.pow(2, r) < m + r + 1) r++;
    const totalLen = m + r;
    let arr = new Array(totalLen).fill(0);

    let j = 0;
    for (let i = 1; i <= totalLen; i++) {
      if ((i & (i - 1)) !== 0) {
        arr[i - 1] = parseInt(bits[j]);
        j++;
      }
    }

    for (let i = 0; i < r; i++) {
      const pPos = Math.pow(2, i);
      let count = 0;
      for (let k = 1; k <= totalLen; k++) {
        if ((k & pPos) !== 0 && k !== pPos) count += arr[k - 1];
      }
      arr[pPos - 1] = count % 2 === 0 ? 0 : 1;
    }
    return arr;
  };

  useEffect(() => {
    const code = generateCode(dataInput);
    setCleanCode(code);
    setUserCode([...code]);
    setFlippedIndex(null);
    setAnalysis(null);
    setDataInput(getbit);
  }, [dataInput, getbit]);

  const handleBitClick = (index) => {
    const newCode = [...cleanCode];
    if (flippedIndex === index) {
      setFlippedIndex(null);
      setUserCode(newCode);
    } else {
      newCode[index] = newCode[index] === 0 ? 1 : 0;
      setFlippedIndex(index);
      setUserCode(newCode);
    }
    setAnalysis(null);
  };

  const analyzeError = () => {
    const bits = userCode;
    const totalLen = bits.length;
    let r = 0;
    while (Math.pow(2, r) < totalLen + 1) r++;

    let errorPos = 0;
    let steps = [];

    for (let i = 0; i < r; i++) {
      const pPos = Math.pow(2, i);
      let checkedIndices = [];
      let sum = 0;

      for (let k = 1; k <= totalLen; k++) {
        if ((k & pPos) !== 0) {
          checkedIndices.push(k);
          sum += bits[k - 1];
        }
      }

      const isOdd = sum % 2 !== 0;
      const status = isOdd ? "FAIL (Odd 1s)" : "PASS (Even 1s)";
      if (isOdd) errorPos += pPos;

      steps.push({
        parity: `P${pPos}`,
        covers: checkedIndices.join(', '),
        bitValues: checkedIndices.map(idx => bits[idx - 1]).join('+'),
        sum: sum,
        result: status,
        valToAdd: isOdd ? pPos : 0
      });
    }

    setAnalysis({
      steps: steps,
      finalError: errorPos,
      isCorrect: errorPos === 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 p-6 font-sans flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">

        <div className="border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Microscope className="text-blue-500" /> Error Detection & Correction Studio
          </h1>
          <p className="text-sm text-gray-500">
            Generate Code - Flip 1 Bit - See the Math behind detection
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-blue-400 uppercase text-sm tracking-wider">
              Step 2: Simulate Noise (Click to Flip)
            </span>
            <span className="text-xs text-orange-400 bg-orange-900/20 px-2 py-1 rounded border border-orange-900/50">
              Only 1 error allowed at a time
            </span>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {userCode.map((bit, idx) => {
              const isParity = ((idx + 1) & idx) === 0;
              const isFlipped = idx === flippedIndex;

              return (
                <div key={idx} className="flex flex-col items-center group cursor-pointer" onClick={() => handleBitClick(idx)}>
                  <div
                    className={`
                      w-12 h-14 flex items-center justify-center text-xl font-bold rounded transition-all duration-300 relative
                      ${
                        isFlipped
                          ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] scale-110 border-2 border-red-300'
                          : isParity
                            ? 'bg-purple-900/20 text-purple-400 border border-purple-500/30 hover:bg-purple-900/40'
                            : 'bg-emerald-900/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/40'
                      }
                    `}
                  >
                    {bit}
                    {isFlipped && (
                      <span className="absolute -top-3 -right-3 bg-gray-700 text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-gray-500 text-gray-300">
                        {cleanCode[idx]}
                      </span>
                    )}
                  </div>

                  <span className="mt-2 text-xs text-gray-600 font-mono">{idx + 1}</span>
                  <span className="text-[9px] uppercase font-bold text-gray-700">
                    {isParity ? 'P' : 'D'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={analyzeError}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/20 transition-all transform active:scale-95"
            >
              <Calculator size={18} /> Run Diagnostics
            </button>
          </div>
        </div>

        {analysis && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex items-center gap-2 text-gray-400">
              <ArrowRight size={16} />
              <span className="uppercase font-bold text-sm">Diagnostic Report</span>
            </div>

            <div className="grid gap-3">
              {analysis.steps.map((step, i) => (
                <div key={i} className={`p-4 rounded-lg border flex justify-between items-center ${step.valToAdd > 0 ? 'bg-red-900/10 border-red-500/30' : 'bg-green-900/10 border-green-500/30'}`}>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold text-lg ${step.valToAdd > 0 ? 'text-red-400' : 'text-green-400'}`}>{step.parity}</span>
                      <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">Checks positions: {step.covers}</span>
                    </div>
                    <div className="mt-2 text-sm font-mono text-gray-400">
                      Bits Sum: <span className="text-gray-200">{step.bitValues}</span> = <span className="font-bold text-white">{step.sum}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`font-bold text-sm ${step.valToAdd > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {step.result}
                    </div>
                    {step.valToAdd > 0 && (
                      <div className="text-xs text-red-300 mt-1">
                        Adds +{step.valToAdd} to Error Pos
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-black p-6 rounded-xl border border-gray-700 flex flex-col items-center text-center">
              <h3 className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-2">Result</h3>

              {analysis.isCorrect ? (
                <div className="text-green-500 flex flex-col items-center">
                  <ShieldAlert size={40} className="mb-2" />
                  <span className="text-2xl font-bold">No Errors Detected</span>
                  <p className="text-sm text-gray-500 mt-1">Syndrome is 0. Data is clean.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <div className="text-red-500 mb-2 font-mono text-4xl font-bold">
                    {analysis.finalError}
                  </div>
                  <p className="text-white font-bold text-lg">Error Detected at Position {analysis.finalError}</p>
                  <div className="mt-4 bg-gray-900 p-3 rounded text-sm text-gray-400 w-full">
                    To fix: Flip bit #{analysis.finalError} from <span className="text-red-400 font-bold">{userCode[analysis.finalError - 1]}</span> to <span className="text-green-400 font-bold">{userCode[analysis.finalError - 1] === 0 ? 1 : 0}</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default HammingDeepDive;
