import React from 'react'
import axios from 'axios'

class CheckBlocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      informationOfBlock: '',
      address: null,
      blockDetails: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    this.setState({ informationOfBlock: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('A bech32 encoded address has been submitted: ' + this.state.informationOfBlock);

    // TODO: https://cosmos.network/rpc/#/ICS1/get_auth_accounts__address_
    // Refer to Note #5
    axios.get(`https://rpc.nylira.net/auth/accounts`, {
      params: {
        address: this.state.informationOfBlock
      }})
      .then(res => {
        this.setState({
          blockDetails: res.data
        })
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
              Check block: {" "}
              <input
                name="informationOfBlock"
                type="text"
                value={this.state.informationOfBlock}
                onChange={this.handleInputChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckBlocks;