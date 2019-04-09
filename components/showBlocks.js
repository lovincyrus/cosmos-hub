import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { RpcClient } from 'tendermint'

class ShowBlocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {},
      precommits: []
    };
  }

  componentWillMount() {
    this.fetchBlock();
    this.setState({ isLoading: true })
  }

  async fetchBlock() {
    const client = await RpcClient('wss://rpc.nylira.net:443');

    client.subscribe({ query: "tm.event = 'NewBlock'" }, event => {
      this.setState({
        isLoading: false,
        data: event.block,
        precommits: event.block.last_commit.precommits
      })
    })
  }

  render() {
    const { data, precommits } = this.state;
    // console.log(data)
    console.log(precommits)

    const truncated = precommits.slice(0, 10);

    const getChainId = _.get(data, ['header', 'chain_id'])

    const loadingState = (
      <div>
        <p>Loading...</p>
      </div>
    );

    return (
      <React.Fragment>
        {this.state.isLoading && loadingState}
        <code>{getChainId}</code>
        <br />
        <br />
        <table>
          <tr>
            <th>Height</th>
            <th>Proposer</th>
            <th>Time</th>
          </tr>
        {truncated.map(item =>
          <tr>
            <td>{item.height}</td>
            <td>{item.validator_address}</td>
            <td>{moment(item.timestamp).format("YYYY-MM-DD h:mm:ss A")}</td>
          </tr>
        )}
        </table>

      <style jsx>
      {`
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
      `}
      </style>
      </React.Fragment>
    );
  }
}

export default ShowBlocks;