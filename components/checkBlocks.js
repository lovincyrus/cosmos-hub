import React from 'react'
import axios from 'axios'
import moment from 'moment'
import Modal from 'react-responsive-modal'

class CheckBlocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: '',
      query: '',
      block: '',
      open: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(`A block height of ${this.state.query} has been submitted`)

    // Query for a particular block
    // https://rpc.nylira.net/block?height=1337
    axios.get(`https://rpc.nylira.net/block`, {
      params: {
        height: this.state.query
      }})
      .then(res => {
        this.setState({
          results: res.data,
          block: res.data.result.block.header
        })
        console.log(this.state.block)
      })
      .catch(err => console.log(`Error: ${err}`))
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, block } = this.state;

    const showModal = (
      <Modal open={open} onClose={this.onCloseModal} center>
        <h2>Block</h2>
        <p>chain id: <code>{block.chain_id}</code></p>
        <p>height: <code>{block.height}</code></p>
        <p>app hash: <code>{block.app_hash}</code></p>
        <p>consensus hash: <code>{block.consensus_hash}</code></p>
        <p>data hash: <code>{block.data_hash}</code></p>
        <p>evidence hash: <code>{block.evidence_hash}</code></p>
        <p>last commit hash: <code>{block.last_commit_hash}</code></p>
        <p>last results hash: <code>{block.last_results_hash}</code></p>
        <p>next validaotrs hash: <code>{block.next_validators_hash}</code></p>
        <p>num txs: <code>{block.num_txs}</code></p>
        <p>proposer address: <code>{block.proposer_address}</code></p>
        <p>time: <code>{moment(block.time).format("YYYY-MM-DD h:mm:ss A")}</code></p>
        <p>total txs: <code>{block.total_txs}</code></p>
        <p>validators hash: <code>{block.validators_hash}</code></p>
      </Modal>
    );

    return (
      <React.Fragment>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <br />
              Enter block height: {" "}
              <input
                name="query"
                type="text"
                placeholder="1337"
                value={this.state.query}
                onChange={this.handleInputChange}
              />
              {" "}
              <button type="submit" value="Submit" onClick={this.onOpenModal}>Submit</button>
            </label>
          </form>
        </div>
        {showModal}

      <style jsx>
      {`
        form {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input {
          background: #fff;
          font-size: 15px;
          padding: 5px;
          border: 1px solid #e3e3e3;
          flex: 1 0 auto;
          line-height: 1.4;
          margin: 0;
        }

        button {
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          white-space: nowrap;
          word-break: keep-all;
          cursor: pointer;
          line-height: 1;
          position: relative;
          text-align: center;
          padding: 8px 16px;
          margin-left: 10px;
          opacity: 1;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          border: 1px solid #5064fb;
          color: #FFF;
          background-color: #5064fb;
          text-shadow: 0 1px 1px rgba(0,0,0,0.08);
        }
      `}
      </style>
      </React.Fragment>
    );
  }
}

export default CheckBlocks;