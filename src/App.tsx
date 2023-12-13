import { Box, Flex, Input, Select } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Atm, listAtm } from './services/listAtm'
import { Marker } from './Marker'
import { Bank, listBank } from './services/listBank'
import { District, listDistrict } from './services/listDistrict'
const center = { lat: 22.3316025, lng: 114.12776 }
const zoom = 12
export const App = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [banks, setBanks] = useState<Bank[]>([])
  const [districts, setDistricts] = useState<District[]>([])

  const [atms, setAtms] = useState<Atm[]>([])

  const [district, setDistrict] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [bankName, setBankName] = useState<string>()

  useEffect(() => {
    const fn = async () => {
      const { banks } = await listBank()
      setBanks(banks)

      const { districts } = await listDistrict()
      setDistricts(districts)
    }
    fn()
  }, [])

  useEffect(() => {
    const fn = async () => {
      const { latest_record } = await listAtm({ district, address, bankName })
      setAtms(latest_record)
    }
    fn()
  }, [district, address, bankName])

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
          clickableIcons: false,
          disableDefaultUI: true,
        })
      )
    }
  }, [ref, map])

  return (
    <Box>
      <Flex
        position="fixed"
        w="50"
        top="4"
        left="4"
        flexDirection="column"
        gap="2"
        zIndex="1"
      >
        <Input
          bg="white"
          size="sm"
          placeholder="address"
          value={address}
          onChange={e => {
            setAddress(e.target.value)
          }}
        />
        <Select
          bg="white"
          size="sm"
          placeholder="District"
          value={district}
          onChange={e => {
            setDistrict(e.target.value)
          }}
        >
          {districts.map(district => (
            <option value={district} key={district}>
              {district}
            </option>
          ))}
        </Select>
        <Select
          bg="white"
          size="sm"
          placeholder="Bank"
          value={bankName}
          onChange={e => {
            setBankName(e.target.value)
          }}
        >
          {banks.map(bank => (
            <option value={bank} key={bank}>
              {bank}
            </option>
          ))}
        </Select>
      </Flex>
      <Box h="100vh" w="100vw" ref={ref} id="map">
        {atms.map(atm => {
          const { item_id, latitude, longitude } = atm
          return (
            <Marker
              key={item_id}
              position={{
                lat: Number(latitude),
                lng: Number(longitude),
              }}
              map={map}
              atm={atm}
            />
          )
        })}
      </Box>
    </Box>
  )
}
