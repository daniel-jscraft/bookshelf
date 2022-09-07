import * as React from 'react'
import {client as apiClient} from './api-client'
import {useMutation, queryCache, useQuery} from 'react-query'


function useDoBookItemUpdate(user) {
  return useMutation(
    data => 
      apiClient(`list-items/${data.id}`, {
        method: 'PUT',
        data,
        token: user.token,
      }),
      {
        onSettled: () => queryCache.invalidateQueries('list-items')
      }
  )
}

function useDoBookSearch(user, query) {
  return useQuery({
    queryKey: ['bookSearch', {query}],
    queryFn: () =>
      apiClient(`books?query=${encodeURIComponent(query)}`, {
        token: user.token,
      }).then(data => data.books),
  })
}

function useDoBookUpdateHook(user) {
  const [update] = useMutation(
    data => 
      apiClient(`list-items/${data.id}`, {
        method: 'PUT',
        data,
        token: user.token,
      }),
      {
        onSettled: () => queryCache.invalidateQueries('list-items')
      }
  )
  return update
}

function useSafeDispatch(dispatch) {
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    mounted.current = true
    return () => (mounted.current = false)
  }, [])
  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  )
}

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
const defaultInitialState = {status: 'idle', data: null, error: null}
function useAsync(initialState) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })
  const [{status, data, error}, setState] = React.useReducer(
    (s, a) => ({...s, ...a}),
    initialStateRef.current,
  )

  const safeSetState = useSafeDispatch(setState)

  const setData = React.useCallback(
    data => safeSetState({data, status: 'resolved'}),
    [safeSetState],
  )
  const setError = React.useCallback(
    error => safeSetState({error, status: 'rejected'}),
    [safeSetState],
  )
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState],
  )

  const run = React.useCallback(
    promise => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        )
      }
      safeSetState({status: 'pending'})
      return promise.then(
        data => {
          setData(data)
          return data
        },
        error => {
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [safeSetState, setData, setError],
  )

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

export {useAsync, useDoBookUpdateHook, useDoBookSearch, useDoBookItemUpdate}
