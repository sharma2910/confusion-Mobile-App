import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'

class Contactus extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    render() {
        return (
            <View>
                <Card title={"Contact Information"}>
                    <Text style={{ paddingBottom: 10 }}>121, Clear Water Bay Road</Text>
                    <Text style={{ paddingBottom: 10 }} >Clear Water Bay, Kowloon</Text>
                    <Text style={{ paddingBottom: 10 }} >HONG KONG</Text>
                    <Text style={{ paddingBottom: 10 }} >Tel: +852 1234 5678</Text>
                    <Text style={{ paddingBottom: 10 }} >Fax: +852 8765 4321</Text>
                    <Text style={{ paddingBottom: 10 }} >Email:confusion@food.net</Text>
                </Card>
            </View>
        )
    }
}

export default Contactus;