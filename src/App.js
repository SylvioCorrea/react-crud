import React, { Component } from 'react';
import axios from 'axios';

import ApiItem from './components/ApiItem';
import PostForm from './components/PostForm';
import EditForm from './components/EditForm';
import PostFormik from './components/PostFormik'
import './App.css';

const apiEndPoint = 'http://10.128.0.7:8080/activity';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      editing: -1,
    }
    this.name = 'App';
    this.postItem = this.postItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.putItem = this.putItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
    
    this.editFormScrollRef = React.createRef();
  }

  //=====================================================================
  //CRUD functions
  getItems() {
    console.log('getting');
    console.log(this.name);
    axios.get(apiEndPoint + '/')
      .then(response => this.setState({ itemList: response.data }))
      .catch(error => console.log(error));
  }

  postItem(postBody) {
    console.log(this.name);
    axios.post(apiEndPoint, postBody)
      .then(response => {
        console.log(response);
        this.getItems(); //Para fazer update da lista sendo mostrada
      })
      .catch(error => console.log(error));
  }

  deleteItem(i) {
    console.log('deleting ' + i);
    axios.delete(`${apiEndPoint}/${i}`)
      .then(()=>this.getItems());
  }
  
  putItem(putBody) {
    console.log('putting');
    console.log(putBody);
    axios.put(`${apiEndPoint}/${putBody.idatividade}`, putBody)
      .then(response => {
        console.log(response);
        this.getItems();
        this.setState({
          editing: -1,
        });
      })
      .catch(error => console.log(error));
  }
  //=====================================================================

  //GET on launch
  componentDidMount() {
    this.getItems();
  }
  
  handleEdit(i) {
    console.log('Editing enabled');
    this.setState({
      editing: i,
    });
    window.scrollTo(0, this.editFormScrollRef.current.offsetTop);
  }

  handleEditCancel() {
    console.log('cancelling');
    this.setState({
      editing: -1,
    });
  }

  conditionalRenderEditForm() {
    const editing = this.state.editing;
    if(editing >= 0) {
      const item = this.state.itemList.find(elem => elem.idatividade === editing);
      return (
        <EditForm
          idatividade={item.idatividade}
          nomeatividade={item.nomeatividade}
          situacaoatividade={item.situacaoatividade}
          submitCallBack={this.putItem}
          cancelCallBack={this.handleEditCancel}
        />
      )
    } else {
      return null;
    }
  }
  
  render() {
    
    return (
      <div>
        <center><h1>novo titulo</h1></center>
        
        {/* <PostForm apiEndPoint={apiEndPoint} postCallBack={this.postItem}/> */}
        <PostFormik onSubmitCallback={this.postItem}></PostFormik>
        
        <div ref={this.editFormScrollRef}></div>
        <div style={{height:20}} />
        {this.conditionalRenderEditForm()}

        {this.state.itemList.map((i) => (
          <ApiItem key={i.idatividade}
            idatividade={i.idatividade}
            nomeatividade={i.nomeatividade}
            situacaoatividade={i.situacaoatividade}
            handleDelete={this.deleteItem}
            handleEdit={this.handleEdit}
          />
        ))}
      </div>
    );
  }
  
}

export default App;
