import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ListLoader from './ListLoader'
import {Col, InputNumber, Layout, Radio, Row, Spin} from 'antd'
import 'antd/dist/antd.css'

const {Content} = Layout

class App extends Component {
  state = {
    url: 'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty',
    count: 10
  }
  onChange = e => {
    this.setState({
      url: `https://hacker-news.firebaseio.com/v0/${
        e.target.value
      }.json?print=pretty`
    })
  }

  render() {
    const {url, count} = this.state
    return (
      <Layout>
        <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
          <h1>Hacker News</h1>
          <Row style={{marginBottom: 10}}>
            <Col span={3}>
              <Radio.Group onChange={this.onChange} defaultValue="beststories">
                <Radio.Button value="beststories">Best</Radio.Button>
                <Radio.Button value="topstories">Top</Radio.Button>
                <Radio.Button value="newstories">New</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={3}>
              <InputNumber
                style={{width: '100%'}}
                onChange={v =>
                  this.setState({
                    count: v
                  })
                }
                value={count}
                placeholder={'News Count'}
                autoFocus={true}
              />
            </Col>
          </Row>
          <div style={{padding: 24, background: '#fff'}}>
            <ListLoader
              url={url}
              count={count}
              ms={300} // you can change this to 0 show spinners
              fallback={
                <Spin>
                  <p style={{marginTop: 10}}>loading..</p>
                </Spin>
              }
            />
          </div>
        </Content>
      </Layout>
    )
  }
}

App.propTypes = {}
App.defaultProps = {}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)
