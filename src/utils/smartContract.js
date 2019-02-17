import {
  store
} from '../state/store';

const abi = [{
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_operator",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [{
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_approved",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [{
      "name": "id",
      "type": "uint256"
    }],
    "name": "buy",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "totalCost",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "content",
        "type": "string"
      }
    ],
    "name": "Memed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "reward",
        "type": "uint256"
      }
    ],
    "name": "Rewarded",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [{
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "numTokens",
        "type": "uint256"
      },
      {
        "name": "_content",
        "type": "string"
      }
    ],
    "name": "meme",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "numTokens",
        "type": "uint256"
      }
    ],
    "name": "priceToMint",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "numTokens",
        "type": "uint256"
      }
    ],
    "name": "rewardForBurn",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "_owner",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "",
      "type": "uint256"
    }],
    "name": "content",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "creators",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "_tokenId",
      "type": "uint256"
    }],
    "name": "exists",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "_tokenId",
      "type": "uint256"
    }],
    "name": "getApproved",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "InterfaceId_ERC165",
    "outputs": [{
      "name": "",
      "type": "bytes4"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "",
      "type": "uint256"
    }],
    "name": "num",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "_tokenId",
      "type": "uint256"
    }],
    "name": "ownerOf",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "",
      "type": "uint256"
    }],
    "name": "poolBalance",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "_interfaceId",
      "type": "bytes4"
    }],
    "name": "supportsInterface",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "_index",
      "type": "uint256"
    }],
    "name": "tokenByIndex",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "_tokenId",
      "type": "uint256"
    }],
    "name": "tokenURI",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "topId",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "",
      "type": "uint256"
    }],
    "name": "totalSupply_",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "wememe",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

export const startWeMeme = async () => {
  try {
    const addrs = await ethereum.enable() // eslint-disable-line no-undef
    const address = addrs[0];
    const Wememe = web3.eth.contract(abi); // eslint-disable-line no-undef
    const wememeContract = Wememe.at('0xF00e73041182368FB937cc6E6F93acE282dDfEc3')
    const profile = await Box.getProfile(address) // eslint-disable-line no-undef

    store.dispatch({
      type: 'WEMEME_CONTRACT',
      wememeContract,
      address,
      profile,
    })
  } catch (err) {
    store.dispatch({
      type: 'WEMEME_CONTRACT_FAILED',
    })
  }
}

export const getMemes = () => {
  const wememeContract = store.getState().threeBox.wememeContract;

  wememeContract.topId.call((e, r) => {
    const topId = r.toNumber()
    const forDraw = [];
    const forCaption = [];
    const forMarket = [];
    const forGallery = [];
    let count = 0;

    const checkEndAndUpdateState = () => {
      count++;
      if (count === topId) {
        store.dispatch({
          type: 'UPDATE_MEMES',
          forDraw,
          forCaption,
          forMarket,
          forGallery,
          topId,
        })
      }
    }

    for (let i = 0; i < topId; i++) {
      wememeContract.num.call(i, (e, num) => {
        wememeContract.content.call(i, (e, content) => {
          wememeContract.poolBalance.call(i, (e, staked) => {
            if (num.toNumber() === 1) {
              // for draw
              forDraw.push({
                id: i,
                content,
                staked: staked.toNumber(),
                step: 'draw',
              })
              checkEndAndUpdateState();
            } else if (num.toNumber() === 2) {
              // for caption
              forCaption.push({
                id: i,
                content,
                staked: staked.toNumber(),
                step: 'caption',
              })
              checkEndAndUpdateState();
            } else {
              if (staked.toNumber() === 0) {
                // already sold
                wememeContract.ownerOf.call(i, (e, owner) => {
                  forGallery.push({
                    id: i,
                    content,
                    owner,
                    step: 'gallery',
                  })
                })
                checkEndAndUpdateState();
              } else {
                // available for purchase
                forMarket.push({
                  id: i,
                  content,
                  price: staked.toNumber(),
                  step: 'buy',
                })
                checkEndAndUpdateState();
              }
            }
          })
        })
      })
    }
  })
}

export const waitForMined = (txHash) => {
  const transactionReceiptAsync = function (resolve, reject) {
    web3.eth.getTransactionReceipt(txHash, (error, receipt) => { // eslint-disable-line no-undef
      if (error) {
        reject(error);
      } else if (receipt == null) {
        setTimeout(() => transactionReceiptAsync(resolve, reject), 500);
      } else {
        setTimeout(() => resolve(receipt), 1500);
      }
    });
  };
  return new Promise(transactionReceiptAsync);
};
