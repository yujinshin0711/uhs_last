// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import Loader from './Components/Loader';
import axios from 'axios'; // axios 추가

const RegisterScreen = (props) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

    const nameInputRef = createRef();
    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const addressInputRef = createRef();
    const passwordInputRef = createRef();

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
            alert('Please fill Name');
            return;
        }
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userAge) {
            alert('Please fill Age');
            return;
        }
        if (!userAddress) {
            alert('Please fill Address');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        //Show Loader
        setLoading(true);

        // 회원가입 정보를 서버로 전송
        axios.post('http://172.18.4.22:3000/register', {
            user_name: userName,
            user_email: userEmail,
            user_age: userAge,
            user_address: userAddress,
            user_password: userPassword
        })
            .then((response) => {
                setLoading(false);
                console.log(response);
                if (response.data.status == 1) {
                    setIsRegistraionSuccess(true);
                    console.log('Registration Successful. Please Login to proceed');
                } else {
                    setErrortext('Registration Unsuccessful');
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    if (isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../image/success.png')}
                    style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
                />
                <Text style={styles.successTextStyle}>Registration Successful.</Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View style={{ alignItems: 'center' }}>
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) => setUserName(UserName)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Name"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                emailInputRef.current && emailInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Email"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="email-address"
                            ref={emailInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                ageInputRef.current && ageInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserAge) => setUserAge(UserAge)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Age"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="numeric"
                            ref={ageInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                addressInputRef.current && addressInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserAddress) => setUserAddress(UserAddress)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Address"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            ref={addressInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInputRef.current && passwordInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Password"
                            placeholderTextColor="#8b9cb5"
                            secureTextEntry={true}
                            ref={passwordInputRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}> {errortext} </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#333333',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: '#000000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});
