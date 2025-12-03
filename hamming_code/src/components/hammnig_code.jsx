/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { Copy, Calculator, ArrowDown, Binary, CheckCircle } from 'lucide-react';

const DetailedHammingGenerator = ({ getbit, setgetbit }) => {
  const [inputBits, setInputBits] = useState('');
  const [encodedData, setEncodedData] = useState([]);
  const [parityCount, setParityCount] = useState(0);
  const [steps, setSteps] = useState([]);

  const calculateHamming = (bits) => {
    if (!bits || /[^0-1]/.test(bits)) {
      setEncodedData([]);
      setSteps([]);
      return;
    }

    const m = bits.length;
    let r = 0;

    while (Math.pow(2, r) < m + r + 1) {
      r++;
    }
    setParityCount(r);

    const totalLen = m + r;
    let arr = new Array(totalLen).fill(null);
    let logSteps = [];

    logSteps.push({
      title: "Step 1: Calculate Parity Bits (r)",
      desc: `Formula: 2^r >= m + r + 1`,
      detail: `Data Bits (m) = ${m}. We need ${r} parity bits because 2^${r} (${Math.pow(2, r)}) >= ${m} + ${r} + 1 (${m + r + 1}).`
    });

    let j = 0;
    for (let i = 1; i <= totalLen; i++) {
      if ((i & (i - 1)) === 0) {
        arr[i - 1] = { type: 'P', val: 0, pos: i, isParity: true };
      } else {
        arr[i - 1] = { type: 'D', val: parseInt(bits[j]), pos: i, isParity: false };
        j++;
      }
    }

    logSteps.push({
      title: "Step 2: Position Data Bits",
      desc: "Parity bits go to positions 1, 2, 4, 8... Data fills the rest.",
      detail: "Positions 1, 2, 4 are reserved for Parity (initialized to 0). Input data is placed in positions 3, 5, 6, 7..."
    });

    let parityCalcDetails = [];

    for (let i = 0; i < r; i++) {
      const pPos = Math.pow(2, i);
      let count = 0;
      let involvedPositions = [];
      let involvedValues = [];

      for (let k = 1; k <= totalLen; k++) {
        if ((k & pPos) !== 0) {
          if (k !== pPos) {
            count += arr[k - 1].val;
            involvedPositions.push(k);
            involvedValues.push(arr[k - 1].val);
          }
        }
      }

      const finalVal = count % 2 === 0 ? 0 : 1;
      arr[pPos - 1].val = finalVal;

      parityCalcDetails.push({
        pName: `P${pPos}`,
        checks: involvedPositions.join(', '),
        values: involvedValues.join(' + '),
        sum: count,
        result: finalVal
      });
    }

    logSteps.push({
      title: "Step 3: Calculate Parity Values (Even Parity)",
      desc: "Check specific bits for each Parity position.",
      subSteps: parityCalcDetails
    });

    setEncodedData(arr);
    setSteps(logSteps);
    setgetbit(bits);
  };

  useEffect(() => {
    calculateHamming(inputBits);
  }, [inputBits]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 font-mono flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-8">

        <div className="text-center border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-green-500 mb-2 flex items-center justify-center gap-3">
            <Binary className="w-8 h-8" /> Hamming Code Generator
          </h1>
          <p className="text-slate-500 text-sm">Input Binary - Detailed Construction Logic</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Input Data Bits</label>
              <input
                type="text"
                value={inputBits}
                onChange={(e) => setInputBits(e.target.value.replace(/[^0-1]/g, ''))}
                placeholder="e.g. 1010"
                className="w-full bg-black border border-slate-700 text-white text-2xl p-4 rounded-lg focus:border-green-500 focus:outline-none tracking-[0.2em] font-bold shadow-inner"
              />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Data Length (m):</span>
                <span className="font-bold text-white">{inputBits.length}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Parity Bits (r):</span>
                <span className="font-bold text-purple-400">{parityCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Code Length:</span>
                <span className="font-bold text-green-400">{encodedData.length}</span>
              </div>
            </div>
          </div>
        </div>

        {encodedData.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <h3 className="text-white font-bold flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" /> Final Generated Code
              </h3>
              <button
                onClick={() => navigator.clipboard.writeText(encodedData.map(d => d.val).join(''))}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded flex items-center gap-2 transition"
              >
                <Copy size={12} /> Copy
              </button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center bg-slate-900 p-6 rounded-xl border border-slate-800">
              {encodedData.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center relative">
                  <div className={`
                    w-12 h-14 flex items-center justify-center border-2 rounded-lg font-bold text-xl mb-1 shadow-lg
                    ${item.type === 'P'
                      ? 'border-purple-500 text-purple-300 bg-purple-900/20'
                      : 'border-green-600 text-green-300 bg-green-900/20'}
                  `}>
                    {item.val}
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono">{idx + 1}</span>
                  <span className={`text-[10px] font-bold ${item.type === 'P' ? 'text-purple-500' : 'text-green-600'}`}>
                    {item.type}{item.type === 'P' ? item.pos : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
            Construction Logic
          </h2>

          {steps.map((step, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center gap-3">
                <div className="bg-slate-800 p-2 rounded text-slate-400">
                  <Calculator size={18} />
                </div>
                <div>
                  <h3 className="text-white font-bold">{step.title}</h3>
                  <p className="text-xs text-slate-500">{step.desc}</p>
                </div>
              </div>

              <div className="p-6">
                {step.detail && (
                  <p className="text-slate-300 text-sm font-mono leading-relaxed bg-black p-4 rounded border border-slate-800">
                    {step.detail}
                  </p>
                )}

                {step.subSteps && (
                  <div className="grid gap-4">
                    {step.subSteps.map((sub, i) => (
                      <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 bg-black/40 p-4 rounded border border-slate-800/50">
                        <div className="w-16 h-16 rounded-full bg-purple-900/20 border-2 border-purple-500 flex items-center justify-center text-purple-400 font-bold text-xl shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                          {sub.pName}
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>Checks Positions:</span>
                            <span className="text-white font-mono bg-slate-800 px-2 rounded">{sub.checks}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>Bit Values:</span>
                            <span className="text-white font-mono">{sub.values}</span>
                            <span>=</span>
                            <span className="text-yellow-400 font-bold">{sub.sum}</span>
                          </div>
                        </div>

                        <div className="text-center bg-slate-900 p-3 rounded border border-slate-700 min-w-[100px]">
                          <div className="text-[10px] text-slate-500 uppercase">Parity Value</div>
                          <div className="text-2xl font-bold text-white">{sub.result}</div>
                          <div className="text-[10px] text-slate-400">
                            {sub.sum % 2 === 0 ? "(Even Sum)" : "(Odd Sum)"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default DetailedHammingGenerator;
