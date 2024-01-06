import { IconButton, useDisclosure } from '@chakra-ui/react'
import { Atm } from './services/listAtm'
import { EditIcon } from '@chakra-ui/icons'
import { CreateDrawer } from './CrateDrawer'
import { Bank } from './services/listBank'
import { District } from './services/listDistrict'

export const UpdateButton = ({
  atm,
  onClose,
  language,
  banks,
  districts,
}: {
  atm: Atm
  onClose: () => void
  language: string
  banks: Bank[]
  districts: District[]
}) => {
  const {
    isOpen: isCreateDrawerOpen,
    onOpen: onCreateDrawerOpen,
    onClose: onCreateDrawerClose,
  } = useDisclosure()

  return (
    <>
      <IconButton
        aria-label="edit"
        size="sm"
        variant="link"
        icon={<EditIcon />}
        onClick={() => {
          onCreateDrawerOpen()
        }}
      />
      <CreateDrawer
        onClose={() => {
          onCreateDrawerClose()
          onClose()
        }}
        isOpen={isCreateDrawerOpen}
        language={language}
        banks={banks}
        districts={districts}
        atm={atm}
      />
    </>
  )
}
