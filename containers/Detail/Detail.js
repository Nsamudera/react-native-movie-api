import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import axios from 'axios'

//components
import Data from '../../components/Data/Data'

export class Detail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('data').original_title,
            headerStyle: {
                backgroundColor: '#0b2129',
            },
            headerTintColor: 'white',
            headerBackTitleStyle: {
                backgroundColor: '#00e378',
            }
        }
    };
    state = {
        similarMovies: [],
        page: 1,
        loading: false
    }
    componentDidMount = () => {
        this.getSimilarMovies()
    }
    getSimilarMovies = () => {
        this.setState({loading: true})
        axios({
            method: "get",
            url: `https://api.themoviedb.org/3/movie/${this.props.navigation.getParam('data').id}/similar?api_key=9a30f18e84cac37fa60aca083559a7b3&language=en-US&page=${this.state.page}`
        })
            .then(response => {
                this.setState({
                    similarMovies: [...this.state.similarMovies, ...response.data.results],
                    page: this.state.page + 1,
                    loading: false
                })
            })
            .catch(err => {
                alert(JSON.stringify(err.response))
            })
    }
    swipeLeft = () => {
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
        this.setState({page: 1, similarMovies: []}, () => {
            this.getSimilarMovies()
        })
    }
    swipeRight = () => {
        this.scroll.scrollTo({ x: 1000, y: 0, animated: true });
    }
    render() {
        let data = this.props.navigation.getParam('data')
        let screenWidth = Dimensions.get('window').width
        let screenHeight = Dimensions.get('window').height
        return (
            <View>
                <ScrollView
                    ref={(swiper) => { this.scroll = swiper }}
                    horizontal={true}
                    pagingEnabled={true}
                >
                    {/* Movie Details */}
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, width: screenWidth }}
                    >
                        <View style={{ backgroundColor: '#0b2129' }}>
                            {/* Poster Image */}
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}` }}
                                style={{ width: screenWidth, height: (screenHeight - 200) }}
                            />

                            {/* Info and Description */}
                            <View style={styles.description}>
                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                    <Text style={{ flex: 1 }}>
                                        <Text style={ styles.subHeader }>Released Date: </Text>
                                        <Text style={ styles.text }>{moment(data.release_date).format("YYYY")}</Text>
                                    </Text>
                                    <Text style={{ flex: 1 }}>
                                        <Text style={styles.subHeader}>Rating: </Text>
                                        <Text style={ styles.text }>
                                            <Icon name="star" color="gold" size={16}></Icon>
                                            {data.vote_average}
                                        </Text>
                                    </Text>
                                </View>

                                <View>
                                    <Text style={styles.subHeader}>Synopsis: </Text>
                                    <Text style={ styles.text }>
                                        {data.overview}
                                    </Text>
                                </View>

                            </View>

                            <TouchableOpacity
                                onPress={this.swipeRight}
                                style={styles.relatedMovies}
                            >
                                <Text style={styles.subHeader}>Related Movies: </Text>
                                <Icon 
                                    name="arrow-right-bold-outline" 
                                    size={22}
                                    color='white'>
                                </Icon>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>

                    {/* Related Movies */}
                    <View style={{ width: screenWidth, alignItems: "center" }}>
                        <Text style={styles.heading}>Related Movies:</Text>
                        {this.state.similarMovies.length > 0 ?
                            <View style={{flex:1, alignItems:'center'}}>
                                <FlatList
                                    onEndReached={this.getSimilarMovies}
                                    onEndReachedThreshold={0.2}
                                    data={this.state.similarMovies}
                                    renderItem={({ item }) =>
                                        <Data data={item} navigation={this.props.navigation} reference={true} swipe={this.swipeLeft} genres={this.props.navigation.getParam('genreList')} />
                                    }
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                {this.state.loading &&
                                <Text style={styles.loading}>Loading . . .</Text>
                                }
                            </View>
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
        margin: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: "600"
    },
    subHeader: {
        fontWeight: "500",
        color: '#00e378'
    },
    text: {
        color:'white',
    },
    relatedMovies: {
        alignItems: 'center',
        backgroundColor: '#233e37'
    },
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

export default Detail