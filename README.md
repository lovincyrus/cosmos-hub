# cosmos-hub

- [x] GUI should be responsive and work well for recent versions of mobile and PC web browsers
- [x] `index.js` shows a list of the most recent ten blocks along with when they were created
- [x] `index.js` includes an interactive form that lets the user input a number and search for a particular block. IF the block exists, it should redirect them to a block details view.
- [x] There should be a block details view that let users view the information for a specific block

## Run
```
git clone https://github.com/lovincyrus/cosmos-hub.git
cd cosmos-hub
yarn; yarn dev
```

### Tendermint sample JS code
```
import { RpcClient } from "tendermint";

const client = RpcClient("wss://rpc.cosmos.network:26657");

client.subscribe({ query: "tm.event = 'NewBlock'" }, event => {
  console.log(event.block)
})
```

### More endpoints with flexible CORS policy
```
https://rpc.nylira.net
wss://rpc.nylira.net:443

https://lcd.nylira.net
```

### Available endpoints
`https://cosmos.network/rpc/#/`

### Notes
1. Can't access `https://rpc.cosmos.network:26657`, it has been blocked by CORS. CORS are not enabled from the requested source. [https://imgur.com/a/WxFXjok](https://imgur.com/a/WxFXjok)
2. [Attempted to set up express](https://github.com/lovincyrus/cosmos-hub/commit/f042b1af69505d15df3b1191c4d3d33439d857a9) and use Tendermint RPC in local machine. 
3. Use `https://rpc.nylira.net` instead
4. Input number and search for a particular block - which API? [🤔](https://cosmos.network/rpc/#/)
5. `/staking/delegators/{delegatorAddr}/delegations` & `/staking/validators/{validatorAddr}` are not available on [rpc.nylira.net](https://rpc.nylira.net)
6. No available API endpoint for block details, can't `GET` it. Returns CORS error or 404. [reference](https://cosmos.network/rpc/#/)
7. ModuleNotFoundError: Module not found: Error: Can't resolve 'fs' [https://github.com/zeit/next.js/issues/2734](https://github.com/zeit/next.js/issues/2734)
8. Found `fs` error fix here: [https://github.com/zeit/next.js/issues/4305#issuecomment-387679511](https://github.com/zeit/next.js/issues/4305#issuecomment-387679511)
9. Reason being: [https://github.com/zeit/next.js/issues/2734#issuecomment-321151325](https://github.com/zeit/next.js/issues/2734#issuecomment-321151325)