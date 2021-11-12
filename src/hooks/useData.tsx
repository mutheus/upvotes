import { useCallback, useState } from 'react'
import { api } from 'services/api'

export default function useData () {
  const [feeds, setFeeds] = useState([])

  const fetchAndSetData = useCallback(async () => {
    const { data } = await api.get('/feeds')

    setFeeds(data)
  }, [])

  const onInteraction = () => {
    fetchAndSetData()
    console.log('hi')
  }

  return {
    feeds,
    fetchAndSetData,
    onInteraction,
  }
}
