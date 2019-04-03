import React from 'react'
import axios from 'axios'
import _ from 'lodash'

class ShowBlocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: {},
      isLoading: true,
      informationOfBlock: ""
    };
  }

  componentDidMount() {
    this.getBlocksList();
    this.setState({ isLoading: true })
  }

  getBlocksList() {
    const status = response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
      }
      return Promise.reject(new Error(response.statusText))
    }

    axios.get(`https://rpc.nylira.net/block?height=10`)
      .then(status)
      .then(res => {
        this.setState({
          isLoading: false,
          blocks: res.data
        })
      })
      .catch(error => {
        console.log('Request failed', error)
      })
  }

  render() {
    const { blocks } = this.state;
    // console.log(blocks)

    const getNestedObj = _.get(blocks, ['result', 'block', 'header'])
    // console.log(getNestedObj)

    const loadingState = (
      <div>
        <p>Loading...</p>
      </div>
    );

    return (
      <React.Fragment>
        {this.state.isLoading && loadingState}
        <code>{JSON.stringify(getNestedObj)}</code>
      </React.Fragment>
    );
  }
}

export default ShowBlocks;