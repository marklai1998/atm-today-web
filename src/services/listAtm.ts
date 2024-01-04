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

type ListAtmResponse = {
  success: boolean
  message: string
  latest_record: Atm[]
}

export const listAtm = ({
  district,
  bankName,
  address,
  language,
}: {
  district?: string
  bankName?: string
  address?: string
  language: string
}) => {
  // return {
  //   success: true,
  //   message: 'Data Update Successful.',
  //   latest_record: [
  //     {
  //       item_id: '643',
  //       latitude: '22.251836',
  //       longitude: '114.176473',
  //       district: 'Southern',
  //       bank_name: 'The Bank of East Asia Limited',
  //       type_of_machine: 'Automatic Teller Machine',
  //       address:
  //         'G/F lobby area of Gleneagles Hong Kong Hospital, 1 Nam Fung Path, Wong Chuk Hang',
  //       service_hours: '24 hours',
  //     },
  //     {
  //       item_id: '678',
  //       latitude: '22.251973',
  //       longitude: '114.176313',
  //       district: 'Southern District',
  //       bank_name: 'The Hongkong and Shanghai Banking Corporation Limited',
  //       type_of_machine: 'Automatic Teller Machine',
  //       address:
  //         'G/F, Gleneagles Hong Kong Hospital,  1 Nam Fung Path, Wong Chuk Hang, Hong Kong',
  //       service_hours: '24 hours',
  //     },
  //   ],
  // }

  return new Promise<ListAtmResponse>((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    xhr.open(
      'GET',
      `${
        import.meta.env.VITE_API_BASE
      }/AWTD/api/v1/GetItemByKeySearch.php${formatParams({
        district,
        bank_name: bankName,
        address,
        lan: language,
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
