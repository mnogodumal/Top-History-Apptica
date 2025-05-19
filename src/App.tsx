import { ChartDataFetcher } from "./components/shared/chart"
import { CountryDropdown } from "./components/shared/dropdown"

import { useState } from "react"

export function ChartsWrapper() {
  const [countryId, setCountryId] = useState<number | null>(null)

  const handleSelectCountry = (id: number) => {
    setCountryId(id)
  }
  return (
    <>
      <div className="flex gap-5">
        <span>Country</span>
        <CountryDropdown onSelectCountry={handleSelectCountry} />
      </div>
      {countryId !== null && <ChartDataFetcher countryId={countryId} />}
    </>
  )
}

function App() {
  return (
    <section className="container">
      <ChartsWrapper />
    </section>
  )
}

export default App
