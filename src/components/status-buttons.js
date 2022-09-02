/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import { useMutation, useQuery, queryCache } from 'react-query'
import { client as apiClient } from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import * as colors from 'styles/colors'
import {CircleButton, Spinner} from './lib'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run} = useAsync()

  function handleClick() {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({user, book}) {
  const {data} = useQuery({
    queryKey: `list-items`,
    queryFn: () =>
      apiClient(`list-items`, {token: user.token}).then(data => data),
  })

  const [remove] = useMutation(
    ({id}) => apiClient(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )

  const [add] = useMutation(
    ({id}) => apiClient(`list-items`, { data:{bookId: id}, token: user.token})
  )

  const listItem = data?.listItems?.find( item => item.bookId === book.id )

  console.log("---------------")
  console.log(data)
  console.log(listItem?.length)
  console.log(book.id)

  // 💰 for all the mutations below, if you want to get the list-items cache
  // updated after this query finishes then use the `onSettled` config option
  // to queryCache.invalidateQueries('list-items')

  // 🐨 call useMutation here and assign the mutate function to "update"
  // the mutate function should call the list-items/:listItemId endpoint with a PUT
  //   and the updates as data. The mutate function will be called with the updates
  //   you can pass as data.


  // 🐨 call useMutation here and assign the mutate function to "create"
  // the mutate function should call the list-items endpoint with a POST
  // and the bookId the listItem is being created for.

  


  const removeBookFromReadingList = () => {
    return remove({id: book.id}) 
  }

  const addBookToReadingList = () => {
    return add({id: book.id})
  }


  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            // 🐨 add an onClick here that calls update with the data we want to update
            // 💰 to mark a list item as unread, set the finishDate to null
            // {id: listItem.id, finishDate: null}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            // 🐨 add an onClick here that calls update with the data we want to update
            // 💰 to mark a list item as read, set the finishDate
            // {id: listItem.id, finishDate: Date.now()}
            onClick={addBookToReadingList}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={removeBookFromReadingList}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          onClick={addBookToReadingList}
          highlight={colors.indigo}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}