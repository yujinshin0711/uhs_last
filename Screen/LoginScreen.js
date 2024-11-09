import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Loader from './Components/Loader';
import axios from 'axios'; // 추가
import EmptyPage from './EmptyPage'; // 추가

const LoginScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 추가

    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        setLoading(true);

        // axios를 사용하여 서버로 회원가입 정보 전송
        axios.post('http://172.18.4.22:3000/login', {
            user_email: userEmail,
            user_password: userPassword
        })
            .then((response) => {
                setLoading(false);
                console.log(response);
                if (response.data.status == 1) {
                    AsyncStorage.setItem('user_id', response.data.user_id);
                    console.log(response.data.user_id);
                    setIsLoggedIn(true); // 로그인 상태 변경
                    // navigation.replace('DrawerNavigationRoutes'); // 기존 코드 주석 처리
                } else {
                    setErrortext('Please check your email id or password');
                    console.log('Please check your email id or password');
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    // 로그인이 성공했을 때 빈 페이지로 이동하는 로직 추가
    if (isLoggedIn) {
        return <EmptyPage />;
    }

    // 기존 로그인 화면 코드
    return (
        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                placeholder="Enter Email" //dummy@abc.com
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current && passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                                placeholder="Enter Password" //12345
                                placeholderTextColor="#8b9cb5"
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />
                        </View>
                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}> {errortext} </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}>
                            <Text style={styles.buttonTextStyle}>LOGIN</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => navigation.navigate('RegisterScreen')}>
                            New Here ? Register
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
    },
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
        marginBottom: 25,
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
    registerTextStyle: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
