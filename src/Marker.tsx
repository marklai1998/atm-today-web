import { FC, useEffect, useState } from 'react'
import { Atm } from './services/listAtm'

export const Marker: FC<google.maps.MarkerOptions & { atm: Atm }> = ({
  atm,
  ...options
}) => {
  const [marker, setMarker] = useState<google.maps.Marker>()

  useEffect(() => {
    if (!marker) {
      const contentString =
        '<div id="content">' +
        `<h1><b>${atm.type_of_machine}</b></h1>` +
        '<div id="bodyContent">' +
        `<p>${atm.bank_name}</p>` +
        "<hr style='margin: 8px 0'/>" +
        `<p>${atm.service_hours}</p>` +
        `<p>${atm.address}</p>` +
        '</div>' +
        '</div>'

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      })

      const marker = new google.maps.Marker()

      marker.addListener('click', () => {
        infowindow.open({
          anchor: marker,
          map: options.map,
        })
      })

      setMarker(marker)
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])

  useEffect(() => {
    if (marker) {
      marker.setOptions(options)
    }
  }, [marker, options])

  return <></>
}
