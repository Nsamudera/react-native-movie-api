import React, { Component } from 'react';
import { Platform, StyleSheet, View, TouchableOpacity, Dimensions, Text, FlatList } from 'react-native';
import { Card, Button } from 'react-native-elements'

export class Data extends Component {
    state = {
        currentMovieGenre: []
    }
    change = () => {
        this.props.navigation.navigate('Detail', {data: this.props.data})
        this.props.swipe()
    }
    componentDidMount = () => {
        this.formatGenres()
    }
    formatGenres =() => {
        let genreName = []
        let slicedGenres = this.props.data.genre_ids.slice(0, 3)
        slicedGenres.forEach(genre => {
            this.props.genres.forEach(genreList => {
                if(genre == genreList.id) {
                    genreName.push(genreList.name)
                }
            });
        })
        this.setState({
            currentMovieGenre: genreName
        })
    }
    render() {
        let screenWidth = Dimensions.get('window').width

        let genres = ['']
        if(this.props.genres) {
            // genres = this.props.data.genre_ids.map(this.formatGenres)
            // this.formatGenres()
        }
        if(this.props.reference) {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.change()} >
                        <Card
                            title={this.props.data.original_title}
                            image={{ 
                                uri: `https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`}}
                            imageStyle={{height:350, width: screenWidth - 50}}
                            containerStyle={{backgroundColor: '#0b2129'}}
                            titleStyle={{color: '#00e378'}}
                            >
                            <FlatList 
                                numColumns={3}   
                                columnWrapperStyle={{justifyContent:'space-evenly'}} 
                                data={this.state.currentMovieGenre}
                                renderItem={({ item }) =>
                                    <Text style={styles.genres}>{item}</Text>
                                }
                                keyExtractor={(item, index) => index.toString()}
                            >
                            </FlatList>
                        </Card>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {data: this.props.data, genreList: this.props.genres})} >
                        <Card
                            title={this.props.data.original_title}
                            image={{ 
                                uri: `https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`}}
                            imageStyle={{height:350}}
                            containerStyle={{backgroundColor: '#0b2129'}}
                            titleStyle={{color: '#00e378'}}
                            >
                            <FlatList 
                                numColumns={3}   
                                columnWrapperStyle={{justifyContent:'space-evenly'}} 
                                data={this.state.currentMovieGenre}
                                renderItem={({ item }) =>
                                    <Text style={styles.genres}>{item}</Text>
                                }
                                keyExtractor={(item, index) => index.toString()}
                            >
                            </FlatList>
                        </Card>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    genres: {
        color: 'white',
    }
});

export default Data