/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as colors from 'styles/colors'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import { client as apiRequest } from './utils/api-client'
import {useAsync} from 'utils/hooks'
import { useEffect, useState } from 'react'

function DiscoverBooksScreen() {
  const {data, error, status, run} = useAsync()
  // const [status, setStatus] = useState('idle')
  const [query, setQuery] = useState()
  // const [data, setData] = useState()
  // const [error, setError] = useState()
  
  

  useEffect(() => {
    console.log(' in useEffect')
    if(query) {
      console.log(' in run')
      run(apiRequest(`books?query=${encodeURIComponent(query)}`))
    }
  }, [query, run])

    // setStatus('loading')
    // setData(null)
    // setError()

    // apiRequest(`books?query=${encodeURIComponent(query)}`).then(
    //   response => {
    //     console.log(error)
    //     if (response.status == 500) {
    //       setStatus('isError')
    //       setError({message: response.message})
    //       return
    //     }
    //     setStatus('success')
    //     setData(response)
    //   }
  

  function handleSearchSubmit(event) {
    event.preventDefault()
    console.log(event.target.search.value)
    setQuery(event.target.search.value)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {(status === 'loading') ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      { (status === 'success') ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}

      {
        (status === 'isError') ? (
          <div css={{color: colors.danger}}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null
      }
    </div>
  )
}

export {DiscoverBooksScreen}