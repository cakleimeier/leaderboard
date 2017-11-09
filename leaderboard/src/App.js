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
      recentList: [],
      totalList: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      'time': e.target.id
    });
  }

  getList() {
    var apiRequest1 = fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(function(response){ 
      return response.json();
    });
    var apiRequest2 = fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime').then(function(response){
      return response.json();
    });
    var recentList=[];
    var totalList=[];

    Promise.all([apiRequest1,apiRequest2]).then(values=>{
        //combinedData[0] = values[0];
        //combinedData[1] = values[1];
        for (const prop in values[0]) {
          recentList.push([]);
          for(const innerProp in values[0][prop]) {
            recentList[prop].push(values[0][prop][innerProp]);
          }
        }
        for (const prop in values[1]) {
          totalList.push([]);
          for(const innerProp in values[1][prop]) {
            totalList[prop].push(values[1][prop][innerProp]);
          }
        }
        this.setState({
          recentList: recentList,
          totalList: totalList
        });
        return recentList, totalList;
    });
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    return <Table list={this.state.time === "recent"? this.state.recentList : this.state.totalList} onClick={this.handleClick} time={this.state.time} />
  }
}

class List extends Component {
  render() {
    var list= this.props.list;
    console.log(list);

    return(
      <tbody>
        {list.map((user,i) =>
          <tr key={i}>
            <td>{i+1}</td>
            <td>
              <a href={"https://www.freecodecamp.com/"+ user[0]}>
                <img src={user[1]} style={{width: '50px'}} />
                {user[0]}
              </a>
            </td>
            <td className={(this.props.time=="recent" ? 'active' : '')}>{this.props.time==="recent"?user[2]:user[3]}</td>
            <td className={(this.props.time=="total" ? 'active' : '')}>{this.props.time==="recent"?user[3]:user[2]}</td>
          </tr>
        )}
      </tbody>
    );
  }
}

class Table extends Component {
  render() {
    return (
      <table>
        <caption>FreeCodeCamp Leaderboard</caption>
        <thead>
          <tr>
            <th>Postion</th>
            <th>Camper</th>
            <th className={"sort" + (this.props.time=="recent" ? ' active' : '')} onClick={this.props.onClick} id="recent">Recent Points {this.props.time=="recent" ? String.fromCharCode("9662") : ''}</th>
            <th className={"sort" + (this.props.time=="total" ? ' active' : '')} onClick={this.props.onClick} id="total">Total Points {this.props.time=="total" ? String.fromCharCode("9662") : ''}</th>
          </tr>
        </thead>

        <List list={this.props.list} time={this.props.time} />

      </table>
    );
  }
}

export default ListContainer;
