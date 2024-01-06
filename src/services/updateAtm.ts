import { formatParams } from '../utils/formatParams'
import { Atm } from './listAtm'

export const updateAtm = (language: string, details: Atm) => {
  return new Promise<void>((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    xhr.open(
      'PUT',
      `${
        import.meta.env.VITE_API_BASE
      }/AWTD/api/v1/UpdateItemById.php${formatParams({
        lan: language,
      })}`
    )
    xhr.responseType = 'json'
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.send(JSON.stringify(details))

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
