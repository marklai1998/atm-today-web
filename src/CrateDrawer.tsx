import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  NumberInput,
  NumberInputField,
  Select,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { createAtm } from './services/createAtm'
import { Bank } from './services/listBank'
import { District } from './services/listDistrict'
import { Atm } from './services/listAtm'
import { updateAtm } from './services/updateAtm'

export const CreateDrawer = ({
  onClose,
  isOpen,
  language,
  banks,
  districts,
  atm,
}: {
  onClose: () => void
  isOpen: boolean
  language: string
  banks: Bank[]
  districts: District[]
  atm?: Atm
}) => {
  const [lat, setLat] = useState<number | undefined>(
    atm ? Number(atm.latitude) : undefined
  )
  const [long, setLong] = useState<number | undefined>(
    atm ? Number(atm.longitude) : undefined
  )
  const [district, setDistrict] = useState<string | undefined>(atm?.district)
  const [bankName, setBankName] = useState<string | undefined>(atm?.bank_name)
  const [address, setAddress] = useState<string | undefined>(atm?.address)
  const [type, setType] = useState<string | undefined>(atm?.type_of_machine)
  const [serviceHours, setServiceHours] = useState<string | undefined>(
    atm?.service_hours
  )

  const create = useCallback(async () => {
    if (
      !lat ||
      !long ||
      !district ||
      !bankName ||
      !address ||
      !type ||
      !serviceHours
    ) {
      return
    }
    try {
      if (atm) {
        await updateAtm(language, {
          item_id: atm.item_id,
          latitude: String(lat),
          longitude: String(long),
          district,
          bank_name: bankName,
          address,
          type_of_machine: type,
          service_hours: serviceHours,
        })
      } else {
        await createAtm(language, {
          latitude: String(lat),
          longitude: String(long),
          district,
          bank_name: bankName,
          address,
          type_of_machine: type,
          service_hours: serviceHours,
        })
      }
    } finally {
      onClose()
    }
  }, [lat, long, district, bankName, address, type, serviceHours, language])

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{atm ? 'Update ATM' : 'Create ATM'}</DrawerHeader>
        <DrawerBody>
          <form
            id="my-form"
            onSubmit={e => {
              e.preventDefault()
              void create()
            }}
          >
            <Box mb="2">
              Lat
              <NumberInput
                size="sm"
                value={lat}
                onChange={v => setLat(Number(v))}
              >
                <NumberInputField />
              </NumberInput>
            </Box>
            <Box mb="2">
              Long
              <NumberInput
                size="sm"
                value={long}
                onChange={v => setLong(Number(v))}
              >
                <NumberInputField />
              </NumberInput>
            </Box>
            <Box mb="2">
              District
              <Select
                size="sm"
                value={district}
                onChange={e => setDistrict(e.target.value)}
              >
                <option></option>
                {districts.map(district => (
                  <option value={district} key={district}>
                    {district}
                  </option>
                ))}
              </Select>
            </Box>
            <Box mb="2">
              Bank Name
              <Select
                size="sm"
                value={bankName}
                onChange={e => setBankName(e.target.value)}
              >
                <option></option>
                {banks.map(bank => (
                  <option value={bank} key={bank}>
                    {bank}
                  </option>
                ))}
              </Select>
            </Box>
            <Box mb="2">
              Type
              <Input
                size="sm"
                value={type}
                onChange={e => setType(e.target.value)}
              />
            </Box>
            <Box mb="2">
              Address
              <Input
                size="sm"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </Box>
            <Box mb="2">
              Service Hours
              <Input
                size="sm"
                value={serviceHours}
                onChange={e => setServiceHours(e.target.value)}
              />
            </Box>
          </form>
        </DrawerBody>
        <DrawerFooter>
          <Button type="submit" form="my-form">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
