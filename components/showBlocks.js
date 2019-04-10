import React from 'react'
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

  componentDidMount() {
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
    // console.log(precommits)

    // get top 10 blocks
    const truncated = precommits.slice(0, 10);
    const loadingState = (
      <div>
        <p>Loading...</p>
      </div>
    );

    return (
      <React.Fragment>
        {this.state.isLoading && loadingState}
        <br />
        <br />
        <table>
          <thead>
            <tr>
              <th>Height</th>
              <th>Proposer</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
          {truncated.map((item, index) =>
              <tr key={index}>
                <td>{item.height}</td>
                <td>{item.validator_address}</td>
                <td>{moment(item.timestamp).format("YYYY-MM-DD h:mm:ss A")}</td>
              </tr>
          )}
          </tbody>
        </table>

      <style jsx>
      {`
        table {
          border-collapse: collapse;
          width: 100%;
        }

        td, th {
          border: 1px solid #dddddd;
          text-align: center;
          padding: 8px;
        }
      `}
      </style>
      </React.Fragment>
    );
  }
}

export default ShowBlocks;