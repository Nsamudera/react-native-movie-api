import React, { Component } from 'react';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements'

export class Data extends Component {
    state = {
        data: {}
    }
    change = () => {
        this.props.navigation.navigate('Detail', {data: this.props.data})
        this.props.swipe()
    }
    render() {
        if(this.props.reference) {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.change()} >
                        <Card
                            title={this.props.data.original_title}
                            image={{ 
                                uri: `https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`}}
                            imageStyle={{height:350}}
                            >
                            
                            {/* <Button
                                onPress={() => this.props.navigation.navigate('CategorySearch',{category: this.state.data})}
                                title={this.state.data.strCategory}
                                backgroundColor="lightcyan"
                                color="black"
                            /> */}
                        </Card>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {data: this.props.data})} >
                        <Card
                            title={this.props.data.original_title}
                            image={{ 
                                uri: `https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`}}
                            imageStyle={{height:350}}
                            >
                        </Card>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

export default Data