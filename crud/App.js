import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Header, Button, Right, Body, Input, Text } from 'native-base';
import axios from 'axios';

export default class App extends React.Component {
  constructor(){
    super();
    this.state= {
      id:0,
      set:'',
      data:[],
      btn: 'Save',
      base_url:'http://192.168.0.26:5000/api/'
    }
  }

  getTask(){
    axios.get(this.state.base_url)
    .then(response => {
      this.setState({ data: response.data });
    });
    // alert('tes');
  }

  addTask(){
    if(this.state.btn === 'Save'){
      let itext = this.state.set;
      if(itext.length > 0){
        axios.post(this.state.base_url, { name: itext })
        .then(response => {
          this.setState({ set: '' });
        })
        this.getTask();
      } else {
        alert('Du du du')
      }  
    } else {
      axios.put(this.state.base_url+this.state.id, { name: this.state.set})
      .then(response => {
        this.setState({ set: '', btn: 'Save' })
      })
      this.getTask();
    }
  }

  set(text){
    this.setState({ set: text });
  }

  putTask(item){
    this.setState({ set: item.name, btn: 'Update', id: item._id });
  }

  delTask(item){
    axios.delete(this.state.base_url+item._id)
    .then(function(response){
    })
    this.getTask();
    // .catch(err => {
    //   alert('Error');
    // })
  }

  componentDidMount(){
    this.getTask()
  }

  render(){
    return(
      <View>
        <View>
          <Header>
            <Body>
              <Input
              onChangeText={(text)=>this.set(text)}
              value={this.state.set}
              placeholder='Type Here. . .'/>
            </Body>
            <Right>
              <Button onPress={() => this.addTask()} >
                <Text>{this.state.btn}</Text>
              </Button>
            </Right>
          </Header>
        </View>
        <View>
          <FlatList
            keyExtractor={(item, index)=>index.toString()}
            data={this.state.data}
            renderItem={({item, index}) =>
              <ListItem
              onPress = {() => this.putTask(item)}
              onLongPress = {() => this.delTask(item)}>
                <Text>{item.name}</Text>
              </ListItem>
            }          
          />
        </View>
      </View>
    )
  }
}