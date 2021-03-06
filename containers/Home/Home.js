import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import axios from 'axios'

//components
import Data from '../../components/Data/Data'

export class Home extends Component {
    static navigationOptions = {
        headerTitle: "Movie DB",
        headerTitleStyle: {
            fontStyle: "italic",
        },
        headerStyle: {
            backgroundColor: '#0b2129',
        },
        headerTintColor: '#00e378'
    };
    state = {
        data: [],
        page: 1,
        genres: [],
        loading: false
    }
    componentDidMount() {
        this.getGenre()
        this.getData()
    }
    getData = () => {
        this.setState({loading: true})
        axios({
            method: "get",
            url: `https://api.themoviedb.org/3/movie/now_playing?api_key=9a30f18e84cac37fa60aca083559a7b3&language=en-US&page=${this.state.page}`
        })
        .then(response => {
            this.setState({
                data: [...this.state.data, ...response.data.results],
                page: this.state.page + 1,
                loading: false
            })
        })
        .catch(err => {
            alert(JSON.stringify(err.response))
        })
    }
    getGenre = () => {
        axios({
            method: "get",
            url: `https://api.themoviedb.org/3/genre/movie/list?api_key=9a30f18e84cac37fa60aca083559a7b3&language=en-US`
        })
        .then(response => {
            this.setState({
                genres: response.data.genres,
            })
        })
        .catch(err => {
            alert(JSON.stringify(err.response))
        })
    }
    render() {
        if(this.state.data.length > 0) {
            return (
                <View style={{flex:1, alignItems:'center'}}>
                    <FlatList 
                        onEndReached={this.getData}
                        onEndReachedThreshold={0.2}
                        data={this.state.data}
                        renderItem={({item}) => 
                            <Data data={item} navigation={this.props.navigation} genres={this.state.genres}/>
                        }
                        keyExtractor={(item, index) => index.toString()}    
                    />
                    {this.state.loading &&
                    <Text style={styles.loading}>Loading . . .</Text>
                    }
                </View>
                
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

const styles = StyleSheet.create({
    loading: {
        position:'absolute', 
        fontSize:22, 
        bottom:0,
        backgroundColor: '#233e37',
        color: '#00e378',
        width: '100%',
        textAlign: 'center',
    }
});

export default Home