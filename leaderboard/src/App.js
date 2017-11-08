// https://fcctop100.herokuapp.com/api/fccusers/top/recent
// https://fcctop100.herokuapp.com/api/fccusers/top/alltime

import React, { Component } from 'react';
import 'whatwg-fetch';
import './App.css';

export class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state= {
      time: 'recent',
      list: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.getList = this.getList.bind(this);
  }

  // Thoughts
    // You want handleClick to set the state and run the getList function
    // You want to pass the result of the getList function as a prop
    // to the List component
    // the List component will display that result
    // Meaning: give the <List /> the value when you call it
    // ex: <List campers={this.props.list} />

    // I think the Table component should actually be the parent?
    // The Table component runs the handleClick function onClick

  handleClick(e) {
    this.setState({
      'time': e.target.id
    }, this.getList);
  }

  getList() {
    var list;
    if (this.state.time === "recent") {
      // Make AJAX call
      // https://fcctop100.herokuapp.com/api/fccusers/top/recent
      fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
        .then(function(response) {
          return response.json()
        }).then(json => {
          console.log(json);
          list = json.map(obj => obj.data);
          this.setState({list}, console.log(this.state.list));
        })
        .catch(function(ex) {
          console.log('parsing failed', ex)
      });

    } else {
      // Make AJAX call
      // https://fcctop100.herokuapp.com/api/fccusers/top/alltime
      fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
        .then(function(response) {
          return response.json()
        }).then(json => {
          console.log(json);
          list = json.map(obj => obj.data);
          this.setState({list}, console.log(this.state.list));
        })
        .catch(function(ex) {
          console.log('parsing failed', ex)
      });
    }
  }

  render() {
    return <Table list={this.state.list} onClick={this.handleClick} />
  }
}

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <tbody>
          <tr>
            <td>Test</td>
            <td>{this.props.list}</td>
          </tr>
        </tbody>

        /*
          {this.props.list.map((user,i) =>
            <tr key={user}><td>{user}</td></tr>
          )}

          <tr>
            <td>Postion</td>
          </tr>
          <tr>
            <td>Camper</td>
          </tr>
          <tr>
            <td>Recent Points</td>
          </tr>
          <tr>
            <td>Total</td>
          </tr>
      */
    );
  }
}

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table>
        <caption>FreeCodeCamp Leaderboard</caption>
        <thead>
          <tr>
            <th>Postion</th>
          </tr>
          <tr>
            <th>Camper</th>
          </tr>
          <tr>
            <th style={{cursor:'pointer', background: '#cdecde'}} onClick={this.props.onClick} id="recent">Recent Points</th>
          </tr>
          <tr>
            <th style={{cursor:'pointer', background: '#cdecde'}} onClick={this.props.onClick} id="total">Total Points</th>
          </tr>
        </thead>

        <List list={this.props.list} />

      </table>
    );
  }
}

export default ListContainer;
