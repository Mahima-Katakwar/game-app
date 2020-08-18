import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import StartGameScreen from './StartGameScreen';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import color from '../constants/color';
import Colors from '../constants/color';

const GenerateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rdNum = Math.floor(Math.random() * (max - min)) + min;
    if (rdNum === exclude) {
        return GenerateRandomBetween(min, max, exclude);
    }
    else {
       return rdNum;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] =
        useState(GenerateRandomBetween(1, 100, props.userChoice)
        );

        const [rounds, setRounds] = useState(0);
        const currentLow = useRef(1);
        const currentHigh = useRef(100);

        const { userChoice, onGameOver } = props;               //To reduce dependencies in code

        useEffect( () => {
            if (currentGuess === props.userChoice) {
                props.onGameOver(rounds);
            }
        }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (direction === 'lower' && currentGuess < props.userChoice ||
            direction === 'greater' && currentGuess > props.userChoice) {
            Alert.alert("dont lie!,..you know that this is wrong...", 'you know that this is wrong...'
            [{ text: 'sorry', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
            /*The user does not cheat so the value which is guessed, by computer is stored
            on current high and then set to current guess */
        }
        else {
            currentLow.current = currentGuess;
        }
        const nextNumber = GenerateRandomBetween(currentHigh.current, currentLow.current, currentGuess);
            /*Everytime the loop is running by the computer so that it does not generate the same guess (2nd or 2rd loop)
            it sets the boundary between current high and current low according to our chosen no
            So it can guess the chosen no between its random current boundaries */
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1 );

    };
    return (
        <View style={styles.screen}>
            <Text>Ooponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.ButtonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} 
                color = {color.accent} />
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')}
                color = {color.primary} />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;
