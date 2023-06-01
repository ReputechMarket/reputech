import { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './component/Navbar'
import { Footer } from './component/Footer'
import { TradePage } from './pages/TradePage'
import { GetSellAdsFromAPI } from './services/DealFortressAPI'

function App() {

  const [ sellAds, setSellAds ] = useState<SellAd[]>([]);

  const GetData = async () => {
    setSellAds(await GetSellAdsFromAPI());
  }

  useEffect(() => {
    GetData();
  }, [])

  console.log(sellAds[0]);

  return (
    <>
      <Navbar />
        <TradePage />
      <Footer />
    </>
  )
}


export default App
