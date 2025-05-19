import { useEffect, useState } from "react"

interface Category {
  id: number
  name: string
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          "https://api.apptica.com/v1/applicationCategory?platform=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l"
        )
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`)
        const json = await res.json()
        setCategories(json.data)
      } catch (error) {
        console.error("Ошибка загрузки категорий:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading }
}
