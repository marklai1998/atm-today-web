import { formatParams } from '../utils/formatParams'

export type District = string

type ListDistrictsResponse = {
  success: boolean
  message: string
  districts: District[]
}

export const listDistrict = ({ language }: { language: string }) => {
  // return {
  //   success: true,
  //   message: 'Data received.',
  //   districts: [
  //     'YuenLong',
  //     'Yuen Long',
  //     'Yuen Long District',
  //     'YauTsimMong',
  //     'Yau Tsui Mong',
  //     'Yau Tsim Mong',
  //   ],
  // }

  return new Promise<ListDistrictsResponse>((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    xhr.open(
      'GET',
      `${
        import.meta.env.VITE_API_BASE
      }/AWTD/api/v1/GetDistrictLists.php${formatParams({ lan: language })}`
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
