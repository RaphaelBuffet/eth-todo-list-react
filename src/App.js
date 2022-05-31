import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }
  async loadBlockchainData() {
    
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const NFT = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({ NFT })
    console.log("NFT " , NFT)
    console.log(accounts[0])
    /*NFT.methods.mint('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',3,"www.coucou.ch",2,'0x5B38Da6a701c568545dCfcB03FcB875f56beddC4','0x5B38Da6a701c568545dCfcB03FcB875f56beddC4').send({ from: accounts[0] })*/
    const NFTTEST = await NFT.methods.getPricebyId(1).call()
    this.setState({ NFTTEST })
    console.log("Test",NFTTEST)
    /*for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()
      console.log(task)
      this.setState({
        tasks: [...this.state.tasks, task]
      })
    }*/
    this.setState({loading:false})
}
/*
  createTask(content) {
    this.setState({ loading: true })
    this.state.todoList.methods.createTask(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
  })
  }
*/

  async showWallet(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  async showBalance(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const balance = await web3.eth.getBalance(this.state.account)
    this.setState({ balance: balance/1000000000000000000 })
  }

  async getPrice(id){
    console.log(id)
    let idForPrice= await this.state.NFT.methods.getPricebyId(id).call()
    console.log(idForPrice)
    this.setState({price: idForPrice});
  }
  async createNFT(){
    this.state.NFT.methods.mint('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',4,"www.coucou.ch",1,'0x5B38Da6a701c568545dCfcB03FcB875f56beddC4','0x5B38Da6a701c568545dCfcB03FcB875f56beddC4').send({ from: this.state.account })
  }

  constructor(props) {
    super(props)
    this.state = { account: '',
    balance:'0',
    taskCount: 0,
    NFT: [],
    loading:true,
    id:'1',
    price:'undefined',
    walletOwner:'2',
    walletArtist:'',
    priceDefine:'',
    idDefine:'',
    urlDefine:''
  }
  this.handleChangeId = this.handleChangeId.bind(this);
  this.handleChangeOwner = this.handleChangeOwner.bind(this);
  this.handleChangeArtist = this.handleChangeArtist.bind(this);
  this.handleChangePriceDefine = this.handleChangePriceDefine.bind(this);
  this.handleChangeIdDefine = this.handleChangeIdDefine.bind(this);
  this.handleChangeUrlDefine = this.handleChangeUrlDefine.bind(this);
  }
  handleChangeId(event) {
    this.setState({id: event.target.value});
  }
  handleChangeOwner(event) {
    this.setState({walletOwner: event.target.value});
  }
  handleChangeArtist(event) {
    this.setState({walletArtist: event.target.value});
  }
  handleChangePriceDefine(event) {
    this.setState({priceDefine: event.target.value});
  }
  handleChangeIdDefine(event) {
    this.setState({idDefine: event.target.value});
  }
  handleChangeUrlDefine(event) {
    this.setState({urlDefine: event.target.value});
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank">NFT image licences</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
              {this.state.loading ? 
              <div id="loader" className="text-center">
                <p className="text-center">Loading...</p>
              </div> 
              : <div></div>
  }
            </main>
            <div>
            <button onClick={() => this.showWallet()}>
          show my wallet address
        </button>
        <p>Your account: {this.state.account}</p>
        <button onClick={() => this.showBalance()}>
          show balance
        </button>
        <p>Your balance: {this.state.balance} eth</p>
        <input type="text" value={this.state.id} onChange={this.handleChangeId} />
        <button onClick={() => this.getPrice(this.state.id)}>
          getPrice
        </button>
        <p>CurrentNFTPrice: {this.state.price} eth</p>
        </div>
        
          </div>
          <div>
          <div>
          <div>
          <label>WalletOwner</label>
          <input type="text" value={this.state.walletOwner} onChange={this.handleChangeOwner} />
          </div>
          <div>
          <label>walletArtist</label>
          <input type="text" value={this.state.walletArtist} onChange={this.handleChangeArtist} />
          </div>
          <div>
          <label>price</label>
          <input type="text" value={this.state.priceDefine} onChange={this.handleChangePriceDefine} />
          </div>
          <div>
          <label>id</label>
          <input type="text" value={this.state.idDefine} onChange={this.handleChangeIdDefine} />
          </div>
          <div>
          <label>url</label>
          <input type="text" value={this.state.urlDefine} onChange={this.handleChangeUrlDefine} />
          </div>
          </div>
          <button onClick={() => this.createNFT(this.state.walletOwner,this.state.walletArtist,this.state.priceDefine,this.state.idDefine,this.state.urlDefine)}>
          createNFT
          </button>
        </div>
          
        </div>
      </div>
    );
  }
}

export default App;