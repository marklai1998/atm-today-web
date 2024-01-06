import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Atm, listAtm } from './services/listAtm'
import { useCallback, useEffect, useState } from 'react'
import { DeleteIcon } from '@chakra-ui/icons'
import { deleteAtm } from './services/deleteAtm'

export const AdminDrawer = ({
  onClose,
  isOpen,
  language,
}: {
  onClose: () => void
  isOpen: boolean
  language: string
}) => {
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
    <Drawer onClose={onClose} isOpen={isOpen} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Admin</DrawerHeader>
        <DrawerBody>
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
                {atms.map(
                  ({
                    item_id,
                    latitude,
                    longitude,
                    district,
                    bank_name,
                    type_of_machine,
                    address,
                    service_hours,
                  }) => (
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
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
