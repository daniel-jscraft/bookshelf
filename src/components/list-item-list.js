/** @jsx jsx */
import {jsx} from '@emotion/core'

import {useQuery} from 'react-query'
import {BookListUL} from './lib'
import {BookRow} from './book-row'
import {client as apiClient} from 'utils/api-client'
import { useEffect, useState } from 'react'

function ListItemList({
  user,
  filterListItems,
  noListItems,
  noFilteredListItems,
}) {

  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      apiClient(`list-items`, {token: user.token}).then(data => data.listItems),
  })
  const filteredListItems = listItems?.filter(filterListItems)

  if (!listItems?.length) {
    return <div css={{marginTop: '1em', fontSize: '1.2em'}}>{noListItems}</div>
  }
  if (!filteredListItems.length) {
    return (
      <div css={{marginTop: '1em', fontSize: '1.2em'}}>
        {noFilteredListItems}
      </div>
    )
  }

  return (
    <BookListUL>
      {filteredListItems.map(listItem => (
        <li key={listItem.id}>
          <BookRow user={user} book={listItem.book} />
        </li>
      ))}
    </BookListUL>
  )
}

export {ListItemList}