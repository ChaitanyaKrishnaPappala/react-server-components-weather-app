import React, {Suspense} from 'react'
import PropTypes from 'prop-types'
import WeatherContainer from './containers/WeatherContainer.client'
import Loader from './components/Loader.server'
import {geolocated} from 'react-geolocated'

function App ({coords}) {
  return (
    <div style={{textAlign: 'center'}}>
      <header
        style={{background: '#222', height: 80, padding: 20, color: 'white'}}
      >
        <h1 style={{fontSize: '1.5em'}}>Welcome to DarkSky Weather app</h1>
      </header>
      <Suspense fallback={<Loader />}>
        <WeatherContainer coords={coords} />
      </Suspense>
    </div>
  )
}

App.propTypes = {
  coords: PropTypes.object
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(App)
