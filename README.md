# cosmos-hub

- [ ] GUI should be responsive and work well for recent versions of mobile and PC web browsers
- [ ] `index.js` shows a list of the most recent ten blocks along with when they were created (table, list, dates)
- [ ] `index.js` includes an interactive form that lets the user input a number and search for a particular block. IF the block exists, it should redirect them to a block details view.
- [ ] There should be a block details view that let users view the information for a specific block
- [ ] unit tests for the block explorer


### Tendermint sample JS code
```
import { RpcClient } from "tendermint";

const client = RpcClient("wss://rpc.cosmos.network:26657");

client.subscribe({ query: "tm.event = 'NewBlock'" }, event => {
  console.log(event.block)
})

```