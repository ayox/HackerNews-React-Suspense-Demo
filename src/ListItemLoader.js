import React from 'react'
import { withCache } from './withCache'
import { createResource } from 'simple-cache-provider'
import { Timeout } from './Timeout'
import { List } from 'antd'

const getStory = createResource(id => {
  return new Promise(async (res, rej) => {
    const reslt = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    const listItem = await reslt.json()
    // setTimeout(() => res(listItem), 2000) // you can enable this to throttle loading of each item
    res(listItem)
  })
})

const ListItemAsync = withCache(props => {
  const listItem = getStory.read(props.cache, props.id)
  return <List.Item>
    <List.Item.Meta
      title={<a href={listItem.url}>{listItem.title}</a>}
      description={listItem.by}
    />
  </List.Item>
})

export function ListItemLoader (props) {
  const {ms, fallback, id} = props
  return (
    <React.unstable_AsyncMode>
      <Timeout ms={ms} fallback={fallback}>
        <ListItemAsync id={id} {...props}/>
      </Timeout>
    </React.unstable_AsyncMode>
  )
}

export default ListItemLoader
