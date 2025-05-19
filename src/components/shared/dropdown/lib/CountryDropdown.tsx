import { useEffect, useState } from "react"
import { DownOutlined } from "@ant-design/icons"
import { Dropdown, Space, MenuProps } from "antd"

interface Country {
  id: number
  name: string
  country: string
  icon: string
}

type DropdownsProps = {
  onSelectCountry: (id: number) => void
}

export function CountryDropdown({ onSelectCountry }: DropdownsProps) {
  const [items, setItems] = useState<MenuProps["items"]>([])
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("/api/apptica/v1/geo", {
          headers: {
            "X-API-KEY": "key_here",
          },
        })
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`)
        const data = await res.json()

        const countries: Country[] = data.data

        if (countries.length > 0) {
          const firstCountry = countries[0]
          setSelectedCountry(firstCountry)
          onSelectCountry(firstCountry.id)
        }

        const countryItems: MenuProps["items"] = countries.map(
          (country: Country) => ({
            key: country.id.toString(),
            label: (
              <span
                className="flex items-center gap-2"
                onClick={() => {
                  setSelectedCountry(country)
                  onSelectCountry(country.id)
                }}
              >
                <img src={country.icon} alt={country.name} width={16} />
                {country.country}
              </span>
            ),
          })
        )

        setItems(countryItems)
      } catch (err) {
        console.error("Ошибка загрузки стран:", err)
      }
    }

    fetchCountries()
  }, [])

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <img
                src={selectedCountry.icon}
                alt={selectedCountry.name}
                width={16}
              />
              {selectedCountry.country}
            </div>
          ) : (
            "Select country"
          )}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}
