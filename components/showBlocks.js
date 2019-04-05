import React from 'react'
import _ from 'lodash'
import { RpcClient } from 'tendermint'

class ShowBlocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.getBlocksList();
    this.setState({ isLoading: true })
  }

  getBlocksList() {
    const client = RpcClient("wss://rpc.nylira.net:443");

    client.subscribe({ query: "tm.event = 'NewBlock'" }, event => {
      this.setState({
        isLoading: false,
        data: event.block
      })
    })
  }

  render() {
    const { data } = this.state;
    console.log(data)

    // const getNestedObj = _.get(blocks, ['result', 'block', 'header'])
    // console.log(getNestedObj)

    const loadingState = (
      <div>
        <p>Loading...</p>
      </div>
    );

    return (
      <React.Fragment>
        {this.state.isLoading && loadingState}
        <code>{JSON.stringify(data)}</code>
      </React.Fragment>
    );
  }
}

export default ShowBlocks;