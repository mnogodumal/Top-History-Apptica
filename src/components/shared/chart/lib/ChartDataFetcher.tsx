import { useEffect, useState } from "react"
import { ChartUI } from "./ChartUI"

type Props = {
  countryId: number
}

const subCategory = {
  1: "Top Free",
  2: "Top Paid",
  3: "Top Grossing",
  4: "Top Free",
  5: "Top Paid",
  6: "Top Grossing",
  7: "New Free",
  8: "New Paid",
  9: "Trending",
}

export function ChartDataFetcher({ countryId }: Props) {
  const [chartData, setChartData] = useState<{
    labels: string[]
    datasets: any[]
  } | null>(null)

  const dateTo = new Date().toISOString().split("T")[0]
  const dateLast = new Date()
  dateLast.setDate(dateLast.getDate() - 30)
  const dateFrom = dateLast.toISOString().split("T")[0]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.apptica.com/package/top_history/9379/${countryId}?date_from=${dateFrom}&date_to=${dateTo}&platforms=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`
        )
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`)
        const data = await res.json()

        const infoAll = data.data

        const resCateg = await fetch(
          "/api/apptica/v1/applicationCategory?platform=1"
        )
        if (!resCateg.ok)
          throw new Error(`Ошибка категорий: ${resCateg.status}`)
        const dataCateg = await resCateg.json()
        const categories = dataCateg.data

        const datesSet = new Set<string>()
        Object.values(infoAll).forEach((catObj) => {
          Object.values(catObj).forEach((subCatObj) => {
            Object.keys(subCatObj).forEach((dateStr) => {
              datesSet.add(dateStr)
            })
          })
        })
        const labels = Array.from(datesSet).sort()

        const datasets = []

        for (const catId in infoAll) {
          const catName =
            categories.find((c: any) => c.id === Number(catId))?.name ||
            `Категория ${catId}`

          const subCats = infoAll[catId]
          for (const subCatId in subCats) {
            const dataByDate = subCats[subCatId]
            const data = labels.map((date) => dataByDate[date] ?? null)

            datasets.push({
              label: `${catName} - ${
                subCategory[Number(subCatId)] || subCatId
              }`,
              data,
              fill: false,
              borderColor: getRandomColor(catId + subCatId),
              tension: 0.3,
            })
          }
        }

        setChartData({ labels, datasets })
      } catch (err) {
        console.error("Ошибка загрузки данных:", err)
      }
    }

    fetchData()
  }, [countryId])

  if (!chartData) return <div>Загрузка...</div>

  return <ChartUI chartData={chartData} />
}

function getRandomColor(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase()
  return "#" + "00000".substring(0, 6 - c.length) + c
}
