import React, { Component } from 'react';
import { Card,Button, Icon } from 'react-native-elements';
import { View, Text} from 'react-native';
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable';

import * as MailComposer from 'expo-mail-composer';


class Contactus extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern'
        })
    }

    render() {
        return (
            <View>
                <Animatable.View animation="fadeInDown" duration={1000} delay={500}>
                    <Card title={"Contact Information"}>
                        <Text style={{ paddingBottom: 10 }}>121, Clear Water Bay Road</Text>
                        <Text style={{ paddingBottom: 10 }} >Clear Water Bay, Kowloon</Text>
                        <Text style={{ paddingBottom: 10 }} >HONG KONG</Text>
                        <Text style={{ paddingBottom: 10 }} >Tel: +852 1234 5678</Text>
                        <Text style={{ paddingBottom: 10 }} >Fax: +852 8765 4321</Text>
                        <Text style={{ paddingBottom: 10 }} >Email:confusion@food.net</Text>
                        <Button
                            title='Send Email'
                            buttonStyle={{backgroundColor:'#512DA8'}}
                            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                            onPress={this.sendMail}
                        />
                    </Card>
                </Animatable.View>
            </View>
        )
    }
}

export default Contactus;