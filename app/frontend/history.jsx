import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const HistoryScreen = ({ navigation }) => {
    const historyData = [
        { id: 1, title: 'Quiz 1', result: '80%', date: '2023-01-10' },
        { id: 2, title: 'Quiz 2', result: '90%', date: '2023-01-12' },
        { id: 3, title: 'Quiz 3', result: '75%', date: '2023-01-15' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('path-to-assets/logo.webp')} style={styles.logo} />
                </TouchableOpacity>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>Username</Text>
                    <Image source={require('path-to-assets/Person.svg')} style={styles.profilePic} />
                    <TouchableOpacity onPress={() => console.log('Logout')} style={styles.logoutButton}>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.historyContainer}>
                <Text style={styles.title}>Quiz History</Text>
                {historyData.map((item) => (
                    <View key={item.id} style={styles.historyItem}>
                        <Text style={styles.quizTitle}>{item.title}</Text>
                        <Text style={styles.result}>{item.result}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
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
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f6f7f2',
    },
    backButton: {
        padding: 10, // For easier touch
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
    username: {
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    logoutButton: {
        backgroundColor: '#3c4f6d',
        marginLeft: 10,
        padding: 8,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#f6f7f2',
        fontSize: 14,
    },
    historyContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    historyItem: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    result: {
        fontSize: 16,
        color: '#3c4f6d',
        marginTop: 5,
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    }
});

export default HistoryScreen;
