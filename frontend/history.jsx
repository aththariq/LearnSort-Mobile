import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const HistoryScreen = ({ navigation }) => {
    // Ini hanya contoh data, Anda bisa mengambil data riil dari state atau props
    const historyData = [
        { id: 1, title: 'Quiz 1', result: '80%' },
        { id: 2, title: 'Quiz 2', result: '90%' },
        { id: 3, title: 'Quiz 3', result: '75%' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
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
                        <Text>{item.title}</Text>
                        <Text>{item.result}</Text>
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
        padding: 15,
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
    username: {
        marginRight: 10,
        fontSize: 16,
        color: '#333',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    logoutButton: {
        backgroundColor: '#3c4f6d',
        marginLeft: 10,
        padding: 10,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#f6f7f2',
        fontSize: 16,
    },
    historyContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
    },
    historyItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
    }
});

export default HistoryScreen;
