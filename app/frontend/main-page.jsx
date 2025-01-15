import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const MainPageScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
            <View style={styles.contentWrapper}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeTitle}>Welcome Back!</Text>
                    <Text style={styles.subtitle}>Shall we keep the momentum going?</Text>
                    <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Sort')}>
                        <Text style={styles.buttonText}>Continue Learning</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.progressSection}>
                    <Text style={styles.progressTitle}>Progress Tracker</Text>
                    {/* Placeholder for a chart or progress display */}
                    <View style={styles.progressContainer}>
                        <Text style={styles.progressPercentage}>0%</Text>
                        <Text style={styles.progressText}>Completed</Text>
                    </View>
                </View>
                <View style={styles.lessonSection}>
                    <Text style={styles.sectionTitle}>Learn</Text>
                    {/* Placeholder for lesson cards */}
                </View>
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
    username: {
        marginRight: 10,
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
    contentWrapper: {
        padding: 20,
    },
    welcomeSection: {
        marginBottom: 20,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    primaryButton: {
        backgroundColor: '#0a1944',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    progressSection: {
        marginTop: 20,
    },
    progressTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    progressContainer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    progressPercentage: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2d6a4f',
    },
    progressText: {
        fontSize: 16,
        color: '#666',
    },
    lessonSection: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default MainPageScreen;
