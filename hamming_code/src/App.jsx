

import { useState } from 'react'
import './App.css'
import HammingDeepDive from './components/hamming_code_error'
import DetailedHammingGenerator from './components/hammnig_code'
import Navbar from './components/navbar'

function App() {
  const [getbit, setgetbit] = useState("");
return(
  <div>
    <Navbar/>
  <DetailedHammingGenerator getbit={getbit} setgetbit={setgetbit}/>
  <HammingDeepDive getbit={getbit} />
  </div>
)
}

export default App
