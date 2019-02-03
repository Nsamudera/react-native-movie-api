import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Image, Dimensions, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card, Button } from 'react-native-elements'
import moment from 'moment'
import axios from 'axios'

//components
import Data from '../../components/Data/Data'

export class Detail extends Component {
    static navigationOptions = ({ navigation }) =>{
        return {
            headerTitle: navigation.getParam('data').original_title,
            headerRight: (
                <View style={{flexDirection:"row"}}>
                    <Icon name="star" color="gold" size={32}></Icon>
                    <Text style={{fontSize:20, marginRight:10}}>
                        {navigation.getParam('data').vote_average}
                    </Text>
                </View>
              ),
        }
    };
    state = {
        similarMovies: [],
        page: 1
    }
    componentDidMount = () => {
        this.setState({
            page: 1
        }, () => {
            this.getSimilarMovies()
        })
    }
    getSimilarMovies = () => {
        axios({
            method: "get",
            url: `https://api.themoviedb.org/3/movie/${this.props.navigation.getParam('data').id}/similar?api_key=9a30f18e84cac37fa60aca083559a7b3&language=en-US&page=${this.state.page}`
        })
            .then(response => {
                this.setState({
                    similarMovies: [...this.state.similarMovies, ...response.data.results],
                    page: this.state.page + 1
                })
            })
            .catch(err => {
                alert(JSON.stringify(err.response))
            })
    }
    swipe= () => {
        this.scroll.scrollTo({x: 0, y: 0, animated: true});
    }
    render() {
            let data = this.props.navigation.getParam('data')
            let screenWidth = Dimensions.get('window').width
            let screenHeight = Dimensions.get('window').height
            return (
                <View>
                    <ScrollView 
                        ref={(swiper) => {this.scroll = swiper}}
                        horizontal={true}
                        pagingEnabled={true}
                    >
                        {/* Movie Details */}
                        <ScrollView
                            contentContainerStyle={{flexGrow: 1, width:screenWidth}}
                        >
                            <View>
                                {/* Poster Image */}
                                <Image 
                                    source={{uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`}} 
                                    style={{width: screenWidth, height: (screenHeight-200)}} 
                                />

                                {/* Description */}
                                <Card
                                    containerStyle={{alignItems:"center"}}
                                >
                                    <Icon name="arrow-down-bold-outline" size={22}></Icon>
                                </Card>

                                <View style={styles.description}>
                                    <View style={{flexDirection:'row', marginBottom:20}}>
                                        <Text style={{flex:1}}>
                                            <Text style={{fontWeight:"500"}}>Released Date: </Text>
                                            <Text>{moment(data.release_date).format("YYYY")}</Text>
                                        </Text>
                                        <Text style={{flex:1}}>
                                            <Text style={{fontWeight:"500"}}>Popularity: </Text>
                                            <Text>{data.popularity}</Text>
                                        </Text>
                                    </View>
                                    
                                    <View>
                                        <Text>
                                            {data.overview}
                                        </Text>
                                    </View>

                                </View>

                                <Card
                                    containerStyle={{alignItems:"center"}}
                                >
                                    <Icon name="arrow-right-bold-outline" size={22}></Icon>
                                </Card>

                            </View>
                        </ScrollView>

                        {/* Related Movies */}
                        <View style={{width:screenWidth, alignItems:"center"}}>
                            <Text style={styles.heading}>Related Movies:</Text>
                            {this.state.similarMovies.length > 0 ?
                            <FlatList 
                                onEndReached={this.getSimilarMovies}
                                onEndReachedThreshold={1}
                                data={this.state.similarMovies}
                                renderItem={({item}) => 
                                    <Data data={item} navigation={this.props.navigation} reference={true} swipe={this.swipe}/>
                                }
                                keyExtractor={(item, index) => index.toString()}    
                            />
                            :
                            <Text>No Related Movies Found</Text>
                            }
                        </View>
                    
                    </ScrollView>
                </View>
            );     
    }
}

const styles = StyleSheet.create({
    description: {
        margin: 10
    },
    heading: {
        fontSize: 20,
        fontWeight: "600"
    }
});

export default Detail