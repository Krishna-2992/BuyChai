# Sample Hardhat Project

this is the transfer ether dapp...

create the state containing provider, signer and contract and set all values as null

```
const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
    })
```

then write a connect wallet function:

```{
        const connectWallet = async () => {
                const { ethereum } = window
                if (ethereum) {
                    const account = await ethereum.request({
                        method: 'eth_requestAccounts',
                    })

                    window.ethereum.on('chainChanged', () => {
                        window.location.reload()
                    })

                    window.ethereum.on('accountsChanged', function(accounts) {
                        window.location.reload()
                    });

                    const provider = new ethers.providers.Web3Provider(ethereum)
                    const signer = provider.getSigner()
                    const contract = new ethers.Contract(
                        contractAddress,
                        contractABI,
                        signer
                    )
                    setState({ provider, signer, contract })
                } else {
                    alert('please install metamask')
                }
            }
        }
```

then just call the function so as to send the ethers to the deposit function: 
```
const buyChai = async (event) => {
        event.preventDefault()
        const { contract } = state
        const name = document.querySelector('#name').value
        const message = document.querySelector('#message').value
        const amount = { value: ethers.utils.parseEther('0.01') }
        const transaction = await contract.buyChai(name, message, amount)
        await transaction.wait()
        console.log('transaction is done')
    }
```
