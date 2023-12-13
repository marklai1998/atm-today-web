export type Bank = string

type ListBankResponse = {
  success: boolean
  message: string
  banks: Bank[]
}

export const listBank = () => {
  // return {
  //   success: true,
  //   message: 'Data received.',
  //   banks: [
  //     'The Bank of East Asia Limited',
  //     'Shanghai Commercial Bank Limited',
  //     'Public Bank (Hong Kong) Limited',
  //     'OCBC Bank (Hong Kong) Limited',
  //   ],
  // }

  return new Promise<ListBankResponse>((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    xhr.open(
      'GET',
      `${import.meta.env.VITE_API_BASE}/AWTD/api/v1/GetBankLists.php`
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
