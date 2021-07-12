// eslint-disable-next-line camelcase
import {unstable_getCacheForType} from 'react'
import {createFromFetch} from 'react-server-dom-webpack'

function createResponseCache () {
  return new Map()
}

export function useServerResponse (props) {
  const key = JSON.stringify(props)
  const cache = unstable_getCacheForType(createResponseCache)
  let response = cache.get(key)
  if (response) {
    return response
  }
  response = createFromFetch(
    fetch('/react?props=' + encodeURIComponent(key))
  )
  cache.set(key, response)
  return response
}
