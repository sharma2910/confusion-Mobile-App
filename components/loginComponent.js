import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { Card, Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import { ImagePicker } from 'expo';
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from '../shared/baseUrl'
class LoginTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userData) => {
                let userinfo = JSON.parse(userData);
                if (userinfo) {
                    this.setState({ userName: userinfo.userName });
                    this.setState({ password: userinfo.password });
                    this.setState({ remember: true });
                }
            })
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='sing-in'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
            />
        )
    }

    handleLogin() {
        console.log(JSON.stringify(this.state))
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ userName: this.state.userName, password: this.state.password })
            )
                .catch((error) => console.log('Could not save user Info', error))
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => { console.log('Could not delete user info') })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: "user-o" }}
                    onChangeText={(userName) => { this.setState({ userName }) }}
                    value={this.state.userName}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: "key" }}
                    onChangeText={(password) => { this.setState({ password }) }}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title="Remember Me"
                    containerStyle={styles.formCheckbox}
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        color="#512DA8"
                    />
                </View>
            </View>
        );
    }

}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            remember: false,
            firstName: '',
            lastName: '',
            email: '',
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: "user-o" }}
                    onChangeText={(userName) => { this.setState({ userName }) }}
                    value={this.state.userName}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: "key" }}
                    onChangeText={(password) => { this.setState({ password }) }}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title="Remember Me"
                    containerStyle={styles.formCheckbox}
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: "user-o" }}
                    onChangeText={(userName) => { this.setState({ firstName }) }}
                    value={this.state.firstName}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: "user-o" }}
                    onChangeText={(userName) => { this.setState({ lastName }) }}
                    value={this.state.lastName}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: "envelope-o" }}
                    onChangeText={(userName) => { this.setState({ email }) }}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title='Register'
                        color="#512DA8"
                        
                    />
                </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        marginTop: 40
    },
    formCheckbox: {
        marginTop: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default LoginTab;

352
