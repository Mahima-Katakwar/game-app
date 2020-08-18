import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import color from '../constants/color';
import Colors from '../constants/color';

const GameOverScreen = props => {
    return (
        <View style = {styles.screen}>
            <Text>The Game is Over!!</Text>
            <Text>Number of rounds: {props.roundsNumber}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <View style = {styles.space}><Button title= "NEW GAME" onPress={props.onRestart} color= {Colors.accent}  /></View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    space: {
        marginTop: 80
    }
});

export default GameOverScreen;
