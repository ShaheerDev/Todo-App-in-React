import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      usertodo: " ",
    };
  }

  onAddItem = () => {
    if (this.state.usertodo == '' || this.state.usertodo == ' ' || this.state.usertodo == null || this.state.usertodo == undefined) {
       document.getElementById('bootstrapAlert').style.display = 'inline-block';
       document.getElementById('body').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    } else {
      var list = this.state.list;
      list.push({ id: this.state.list.length + 1, todo: this.state.usertodo, });
      this.setState({ list: list, usertodo: '' });
    }
  }

  handleKey(e) {
    if (e.key === 'Enter') {
      this.onAddItem();
    }
  }

  onRemoveItem = (id) => {
    this.setState(state => {
      const list = state.list.filter(item => item.id !== id);
      return { list };
    });
  };

  onEditItem = (id, target) => {
    var list = this.state.list;
    const foundId = this.state.list.find(item => item.id === id)
    if (foundId) {
      list = list.filter(item => item.id !== id);
      list.push({ id: id, todo: target });
      list = list.reverse();
      this.setState({ list: list, });
    }
  }

  render() {
    return (<div className='text-center' id='body' style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}}>
      <h1 className='display-1'>Todo App</h1>
      <div style={{ position: 'relative', top: 10, }}>
        <input type='text' placeholder=" Enter Todo..." value={this.state.usertodo} className='textbox' style={{ height: 35 }} onKeyDown={(e) => this.handleKey(e)} onChange={(e) => this.setState({ usertodo: e.target.value })}></input>
        <button className='btn btn-dark mx-1' onClick={this.onAddItem}>Add Todo</button>
        <div style={{ position: 'relative', top: 20, left: 10, }}>
          <div>
            <h1 style={{ fontWeight: '400' }}>Your Todos:</h1>
            {this.state.list.map((item) => (
              <div key={item.id}>
                <div key={'div'+item.id}>
                  <input type='text' key={'input'+item.id} value={item.todo} className='textbox' style={{ height: 35, }} onChange={(e) => this.onEditItem(item.id, e.target.value)}></input>
                  <button className='btn btn-danger mx-1' key={'btn'+item.id} onClick={() => this.onRemoveItem(item.id)}>Delete Todo</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id='bootstrapAlert' style={{display: 'none', position: 'absolute', top: '40%', left: '33%'}}>
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading" style={{color: 'red'}}>Warning</h4>
        <p>Textbox cannot be empty. Please type something to add a todo.</p>
        <hr></hr>
        <button className='btn btn-danger mx-1' onClick={() => {document.getElementById('bootstrapAlert').style.display = 'none';document.getElementById('body').style.backgroundColor = ''}}>Close Alert</button>
      </div>
    </div>
    </div>);
  }
}

export default App;
