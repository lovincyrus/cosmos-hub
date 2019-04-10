import React from 'react'
import axios from 'axios'

class CheckBlocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '',
      results: '',
      query: '',
      block_meta: '',
      block: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    this.setState({ query: value });
  }

  handleSubmit(event) {
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
          block: res.data.result.block,
          block_meta: res.data.result.block_meta
        })
        console.log(this.state.results)
        console.log(this.state.block)
        console.log(this.state.block_meta)
      })
      .catch(err => console.log(`Error: ${err}`))
  }

  render() {
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
              <button type="submit" value="Submit">Submit</button>
            </label>

          </form>
        </div>

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