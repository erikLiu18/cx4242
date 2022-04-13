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

async function getTrades(collection_hash, limit=10) {
    const options = { address: collection_hash, limit: "10", chain: "eth" };
    const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);
    console.log(NFTTrades)
}

async function getContractTransfers(options) {
  // const options = {
  //   address: collection_hash,
  //   limit: "500",
  //   // offset: "0",
  //   chain: "eth",
  // };
  const nftTransfers = await Moralis.Web3API.token.getContractNFTTransfers(options);
  console.log("------")
  return nftTransfers
}

// async function getPages(collection_hash) {
//   list = []
//   var options = {
//     address: collection_hash,
//     limit: "500",
//     // offset: "0",
//     chain: "eth",
//   };
//   Moralis.Web3API.token.getContractNFTTransfers(options).then(response => {
//     console.log(response)
//     list = list.concat(response.result)
//     options = {
//       address: collection_hash,
//       limit: "500",
//       chain: "eth",
//       cursor: response.cursor
//     }
//     const nftTransfers = Moralis.Web3API.token.getContractNFTTransfers(options);
//     console.log(nftTransfers)
//     console.log(list)
//   })
// }

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

 // collection_address, 0, [], 0

async function getTransfers(nft_address,iteration,listOfTransfers,page){
  var iteration = iteration + 1;
  console.log(iteration)

  if(page == 0){
    var options = {address: nft_address}
  }
  else{
    var options = {address: nft_address, cursor:page}
  }

  Moralis.Web3API.token.getContractNFTTransfers(options).then(response => {
    if(response.total+500 <= iteration*500){
      console.log(listOfTransfers)
    }
    else{
      returnList = listOfTransfers.concat(response.result)
      console.log(response.cursor)
      setTimeout(() => {getTransfers(nft_address,iteration,returnList,response.cursor)},1000);
    }
  })
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;