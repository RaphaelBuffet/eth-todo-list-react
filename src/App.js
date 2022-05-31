import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
import TodoList from './components/todolist'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }
  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    this.setState({ todoList })
    console.log("todoList" , todoList)
    const taskCount = await todoList.methods.taskCount().call()
    this.setState({ taskCount })
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()
      console.log(task)
      this.setState({
        tasks: [...this.state.tasks, task]
      })
    }
    this.setState({loading:false})
}

  createTask(content) {
    this.setState({ loading: true })
    this.state.todoList.methods.createTask(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
  })
  }


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

  constructor(props) {
    super(props)
    this.state = { account: '',
    balance:'0',
    taskCount: 0,
    tasks: [],
    loading:true,
  }
  this.createTask=this.createTask.bind(this)
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
              : <TodoList tasks={this.state.tasks} createTask={this.createTask}/>}
            </main>
            <div>
            <button onClick={() => this.showWallet()}>
          show address
        </button>
        <p>Your account: {this.state.account}</p>
        <button onClick={() => this.showBalance()}>
          show balance
        </button>
        <p>Your balance: {this.state.balance} eth</p>
        </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;