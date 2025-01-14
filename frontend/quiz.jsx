import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const QuizScreen = ({ navigation }) => {
    const [score, setScore] = useState(0);
    const [lastScore, setLastScore] = useState('N/A');
    const [lastAttempt, setLastAttempt] = useState('N/A');
    const [isQuizStarted, setIsQuizStarted] = useState(false);

    const startQuiz = () => {
        setIsQuizStarted(true);
        // Logic to start the quiz
    };

    const reattemptQuiz = () => {
        setIsQuizStarted(false);
        setScore(0);
        // Logic to reset the quiz
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
                    <Image source={require('path-to-assets/logo.webp')} style={styles.logo} />
                </TouchableOpacity>
                <View style={styles.userInfo}>
                    <Text>Username</Text>
                    <Image source={require('path-to-assets/Person.svg')} style={styles.profilePic} />
                    <TouchableOpacity onPress={() => console.log('Logout')} style={styles.logoutButton}>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.quizContainer}>
                <Text style={styles.quizTitle}>Quiz</Text>
                {!isQuizStarted ? (
                    <View style={styles.startContainer}>
                        <Text>Last Score: {lastScore}</Text>
                        <Text>Last Attempt: {lastAttempt}</Text>
                        <TouchableOpacity style={styles.primaryButton} onPress={startQuiz}>
                            <Text style={styles.buttonText}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.quizBox}>
                        <Text>Question text here...</Text>
                        {/* Example question and answer buttons */}
                        <TouchableOpacity style={styles.answerButton}>
                            <Text>Answer 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.answerButton}>
                            <Text>Answer 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.answerButton}>
                            <Text>Answer 3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.answerButton}>
                            <Text>Answer 4</Text>
                        </TouchableOpacity>
                        <View style={styles.resultContainer}>
                            <Text>Score: {score}</Text>
                            <TouchableOpacity style={styles.primaryButton} onPress={reattemptQuiz}>
                                <Text style={styles.buttonText}>Reattempt Quiz</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#f6f7f2',
    },
    logo: {
        width: 60,
        height: 30,
        resizeMode: 'contain',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    logoutButton: {
        backgroundColor: '#3c4f6d',
        padding: 10,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#fff',
    },
    quizContainer: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        margin: 20,
    },
    quizTitle: {
        fontSize: 22,
        marginBottom: 20,
        textAlign: 'center',
    },
    startContainer: {
        alignItems: 'center',
    },
    quizBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    answerButton: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#4caf50',
        borderRadius: 5,
        alignItems: 'center',
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#0a1944',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
    }
});

export default QuizScreen;
