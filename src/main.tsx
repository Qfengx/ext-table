import * as React from 'react'

import { Button, message } from 'antd'

import './main.less'

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    message.config({
      maxCount: 1
    })
  }

  handleClick = () => {
    message.success('Ext Table')
  }

  render() {
    return (
      <Button className="msg-btn" onClick={this.handleClick}>msg</Button>
    )
  }
}

export default Main