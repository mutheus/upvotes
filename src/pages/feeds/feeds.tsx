import { useEffect } from 'react'
import { api } from 'services/api'

export function Feeds () {
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/feeds')
      console.log(data)
    })()
  }, [])

  return (
    <></>
  )
}
