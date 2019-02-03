import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, FlatList } from 'react-native';
import axios from 'axios'

//components
import Data from '../../components/Data/Data'

export class Home extends Component {
    static navigationOptions = {
        headerTitle: "Movie DB",
        headerTitleStyle: {
            fontStyle: "italic"
        },
    };
    state = {
        data: [],
        page: 1
    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        axios({
            method: "get",
            url: `https://api.themoviedb.org/3/movie/now_playing?api_key=9a30f18e84cac37fa60aca083559a7b3&language=en-US&page=${this.state.page}`
        })
            .then(response => {
                this.setState({
                    data: [...this.state.data, ...response.data.results],
                    page: this.state.page + 1
                })
            })
            .catch(err => {
                alert(JSON.stringify(err.response))
            })
    }
    getMoreData = () => {
        
    }
    render() {
        if(this.state.data.length > 0) {
            return (
                <FlatList 
                    onEndReached={this.getData}
                    onEndReachedThreshold={1}
                    data={this.state.data}
                    renderItem={({item}) => 
                        <Data data={item} navigation={this.props.navigation}/>
                    }
                    keyExtractor={(item, index) => index.toString()}    
                />
            );
        } else {
            return (
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize: 30}}>Loading . . .</Text>
                </View>
            );
        }
            
    }
}

export default Home