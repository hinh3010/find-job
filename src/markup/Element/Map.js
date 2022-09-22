import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import { useLoadScript } from '@react-google-maps/api'

const position = { lat: 21.02077359871018, lng: 105.85818356090816 }
const options = { closeBoxURL: '', enableEventPropagation: true };

const Map = () => {
  return (

    <GoogleMap
      defaultZoom={18}
      defaultCenter={position}
    >
      <Marker
        icon={{
          url: 'https://cdn-icons-png.flaticon.com/128/2555/2555572.png',
          scaledSize: new window.google.maps.Size(40, 40),
        }}
        position={position}
      >
        <InfoBox
          options={options}
        >
          <>
            <div style={{ backgroundColor: 'green', color: 'white', borderRadius: '1em', padding: '0.2em' }}>
              12-14 P. Lê Thánh Tông
            </div>
          </>
        </InfoBox>
      </Marker>

    </GoogleMap>

  );
}

export default withScriptjs(withGoogleMap(Map));