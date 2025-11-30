

import { useState } from 'react'
import './App.css'
import HammingDeepDive from './components/hammingcodeerror'
import DetailedHammingGenerator from './components/hummnigcode'


function App() {
  const [getbit, setgetbit] = useState("");
return(
  <div>
  <DetailedHammingGenerator getbit={getbit} setgetbit={setgetbit}/>
  <HammingDeepDive getbit={getbit} />
  </div>
)
}

export default App
