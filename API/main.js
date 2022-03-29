// main.js

const serverUrl = "https://c6xxzyeqi59i.usemoralis.com:2053/server";
const appId = "4k4UZvHipDvawqoOo0HqPUR6cnnMafK3pVzCDPhq";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" })
      console.log(user)
      console.log(user.get('ethAddress'))
   } catch(error) {
     console.log(error)
   }
  }
}

// async function getTransfers() {
//     const options = { chain: "bsc", address: "0x...", limit: "10" };
//     const transfersNFT = await Moralis.Web3API.account.getNFTTransfers(options);
//     console.log(transfersNFT)
// }

async function getOwners() {
    const options = { address: "0xf61F24c2d93bF2dE187546B14425BF631F28d6dC", chain: "eth" };
    const nftOwners = await Moralis.Web3API.token.getNFTOwners(options);
    console.log(nftOwners)
}

async function getTrades() {
    const options = { address: "0xf61F24c2d93bF2dE187546B14425BF631F28d6dC", limit: "10", chain: "eth" };
    const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);
    console.log(NFTTrades)
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}



document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;