import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { Atm, listAtm } from './services/listAtm'
import { useCallback, useEffect, useState } from 'react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { deleteAtm } from './services/deleteAtm'
import { CreateDrawer } from './CrateDrawer'
import { Bank } from './services/listBank'
import { District } from './services/listDistrict'
import { UpdateButton } from './UpdateButton'

export const AdminDrawer = ({
  onClose,
  isOpen,
  language,
  banks,
  districts,
}: {
  onClose: () => void
  isOpen: boolean
  language: string
  banks: Bank[]
  districts: District[]
}) => {
  const {
    isOpen: isCreateDrawerOpen,
    onOpen: onCreateDrawerOpen,
    onClose: onCreateDrawerClose,
  } = useDisclosure()

  const [atms, setAtms] = useState<Atm[]>([])

  const list = useCallback(async () => {
    const { latest_record } = await listAtm({
      language,
    })
    setAtms(latest_record)
  }, [language])

  useEffect(() => {
    list()
  }, [list])

  const deleteItem = useCallback(async ({ id }: { id: string }) => {
    await deleteAtm({ id })
    await list()
  }, [])

  return (
    <>
      <CreateDrawer
        onClose={() => {
          onCreateDrawerClose()
          list()
        }}
        isOpen={isCreateDrawerOpen}
        language={language}
        banks={banks}
        districts={districts}
      />
      <Drawer onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Admin</DrawerHeader>
          <DrawerBody>
            <Flex justifyContent="flex-end" w="full">
              <Button
                leftIcon={<AddIcon />}
                size="sm"
                mb="2"
                onClick={onCreateDrawerOpen}
              >
                Create
              </Button>
            </Flex>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th isNumeric>Id</Th>
                    <Th isNumeric>Lat</Th>
                    <Th isNumeric>Long</Th>
                    <Th>District</Th>
                    <Th>Bank Name</Th>
                    <Th>Type</Th>
                    <Th>Address</Th>
                    <Th>Service Hours</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {atms.map(atm => {
                    const {
                      item_id,
                      latitude,
                      longitude,
                      district,
                      bank_name,
                      type_of_machine,
                      address,
                      service_hours,
                    } = atm
                    return (
                      <Tr key={item_id}>
                        <Td>
                          <IconButton
                            aria-label="delete"
                            size="sm"
                            variant="link"
                            icon={<DeleteIcon />}
                            onClick={() => {
                              deleteItem({ id: item_id })
                            }}
                          />
                          <UpdateButton
                            atm={atm}
                            onClose={list}
                            banks={banks}
                            districts={districts}
                            language={language}
                          />
                        </Td>
                        <Td>{item_id}</Td>
                        <Td>{latitude}</Td>
                        <Td>{longitude}</Td>
                        <Td>{district}</Td>
                        <Td>{bank_name}</Td>
                        <Td>{type_of_machine}</Td>
                        <Td>{address}</Td>
                        <Td>{service_hours}</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
