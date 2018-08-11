import React from 'react'
import {withCache} from './withCache'
import {createResource} from 'simple-cache-provider'
import ListItemLoader from './ListItemLoader'
import {Timeout} from './Timeout'
import {List} from 'antd'

const getNews = createResource(url => {
  return new Promise(async (res, rej) => {
    const reslt = await fetch(url)
    const list = await reslt.json()
    res(list)
  })
})

const ListAsync = withCache(props => {
  const list = getNews.read(props.cache, props.url)
  return (
    <List
      itemLayout="horizontal"
      // dataSource={list} //uncomment this to test all stories
      dataSource={list.slice(0, props.count || 20)}
      renderItem={item => <ListItemLoader id={item} {...props} />}
    />
  )
})

export function ListLoader(props) {
  const {url, fallback, ms} = props
  return (
    <React.unstable_AsyncMode>
      <Timeout ms={ms} fallback={fallback}>
        <ListAsync url={url} {...props} />
      </Timeout>
    </React.unstable_AsyncMode>
  )
}

export default ListLoader
