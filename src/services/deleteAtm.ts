import { formatParams } from '../utils/formatParams'

export type Atm = {
  item_id: string
  latitude: string
  longitude: string
  district: string
  bank_name: string
  type_of_machine: string
  address: string
  service_hours: string
}

export const deleteAtm = ({ id }: { id: string }) => {
  return new Promise<void>((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    xhr.open(
      'DELETE',
      `${
        import.meta.env.VITE_API_BASE
      }/AWTD/api/v1/RemoveItemById.php${formatParams({
        item_id: id,
      })}`
    )
    xhr.responseType = 'json'

    xhr.send()

    xhr.onload = function () {
      if (xhr.status != 200) {
        reject(xhr.response)
      } else {
        resolve(xhr.response)
      }
    }

    xhr.onerror = function () {
      reject('XHR Error')
    }
  })
}
