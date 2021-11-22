import { useEffect, useState } from 'react'
import { ResultType } from 'feeds'

export default function useRequestMessage () {
  const [requestResult, setRequestResult] = useState<ResultType>({})

  useEffect(() => {
    const timer = setTimeout(() => {
      setRequestResult({})
    }, 2000)

    return () => clearTimeout(timer)
  }, [requestResult])

  return [requestResult, setRequestResult] as const
}
