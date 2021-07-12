import React from 'react'
import {WeatherDisplay} from './WeatherDisplay.server'
import {ClipLoader} from 'react-spinners'
import PropTypes from 'prop-types'
import {fetch} from 'react-fetch'

const Weather = ({value, coords: {latitude, longitude}}) => {
  const location = fetch(`/latng?type=address&value=${value}`)

  const weather = fetch(`/weather?lat=${latitude}&lng=${longitude}`)

  const getError = () => {
    if (location.status !== 200) {
      return `An error occurred while retrieving location data, ${location.statusText}`
    } else if (weather.status !== 200) {
      return `An error occurred while retrieving weather data, ${weather.statusText}`
    } else {
      return ''
    }
  }

  const locationDetails = location.json()
  const weatherDetails = weather.json()

  const temperature = weatherDetails?.data?.currently?.temperature
  const icon = weatherDetails?.data?.currently?.icon?.toUpperCase()
  const address = locationDetails?.address

  const isLoading = !locationDetails || !weatherDetails

  const error = getError()

  return (
    <div
      style={{display: 'flex', flexDirection: 'column', paddingBottom: 50}}
    >
      {!isLoading ? (
        error ? (
          <div style={{display: 'flex', padding: 30}}>{error}</div>
        ) : (
          <WeatherDisplay
            temperature={temperature}
            iconType={icon}
            address={address}
          />
        )
      ) : (
        <div style={{marginLeft: 30, marginBottom: 30}} id='loader'>
          <ClipLoader size={100} color='#123abc' loading={isLoading} />
        </div>
      )}
    </div>
  )
}

Weather.propTypes = {
  value: PropTypes.string,
  coords: PropTypes.object
}

export default Weather
