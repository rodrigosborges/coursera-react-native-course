import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
import * as Asset from 'expo-asset'
import * as ImageManipulator from 'expo-image-manipulator'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../shared/baseUrl';

const LoginTab = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    useEffect(() => {
        SecureStore.getItemAsync('userinfo')
        .then((userdata) => {
            let userinfo = JSON.parse(userdata);
            if (userinfo) {
                setUsername(userinfo.username);
                setPassword(userinfo.pasword)
                setRemember(true)
            }
        })
    }, [])

    const handleLogin = () => {
        if (remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: username, password: password}))
                .catch((error) => console.log('Could not save user info', error));
        else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));

    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Username"
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(username) => setUsername(username)}
                value={username}
                containerStyle={styles.formInput}
                />
            <Input
                placeholder="Password"
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(password) => setPassword(password)}
                value={password}
                containerStyle={styles.formInput}
                />
            <CheckBox title="Remember Me"
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formCheckbox}
                />
            <View style={styles.formButton}>
                <Button
                    onPress={() => handleLogin()}
                    title="Login"
                    icon={
                        <Icon
                            name='sign-in'
                            type='font-awesome'            
                            size={24}
                            color= 'white'
                        />
                    }
                    buttonStyle={{
                        backgroundColor: "#512DA8"
                    }}
                    />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => props.navigation.navigate('Register')}
                    title="Register"
                    clear
                    icon={
                        <Icon
                            name='user-plus'
                            type='font-awesome'            
                            size={24}
                            color= 'blue'
                        />
                    }
                    titleStyle={{
                        color: "blue"
                    }}
                    />
            </View>
        </View>
    );

}

const RegisterTab = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [remember, setRemember] = useState(false)
    const [imageUrl, setImageUrl] = useState(baseUrl + 'images/logo.png')

    const getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                processImage(capturedImage.uri);
            }
        }

    }

    const getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                processImage(capturedImage.uri);
            }
        }

    }

    const processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulate(
            imageUri, 
            [
                {resize: {width: 400}}
            ],
            {format: 'png'}
        );
        setImageUrl(processedImage.uri)

    }

    const handleRegister = () => {
        if (remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: username, password: password}))
                .catch((error) => console.log('Could not save user info', error));
    }

    return(
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={{uri: imageUrl}} 
                    loadingIndicatorSource={require('./images/logo.png')}
                    style={styles.image} 
                    key={imageUrl}
                    />
                <Button
                    title="Camera"
                    onPress={getImageFromCamera}
                    />
                <Button
                    title="Gallery"
                    onPress={getImageFromGallery}
                    />
            </View>
            <Input
                placeholder="Username"
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(username) => setUsername(username)}
                value={username}
                containerStyle={styles.formInput}
                />
            <Input
                placeholder="Password"
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(password) => setPassword(password)}
                value={password}
                containerStyle={styles.formInput}
                />
            <Input
                placeholder="First Name"
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(lastname) => this.setState({firstname})}
                value={firstname}
                containerStyle={styles.formInput}
                />
            <Input
                placeholder="Last Name"
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(lastname) => this.setState({lastname})}
                value={lastname}
                containerStyle={styles.formInput}
                />
            <Input
                placeholder="Email"
                leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                onChangeText={(email) => this.setState({email})}
                value={email}
                containerStyle={styles.formInput}
                />
            <CheckBox title="Remember Me"
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formCheckbox}
                />
            <View style={styles.formButton}>
                <Button
                    onPress={() => handleRegister()}
                    title="Register"
                    icon={
                        <Icon
                            name='user-plus'
                            type='font-awesome'            
                            size={24}
                            color= 'white'
                        />
                    }
                    buttonStyle={{
                        backgroundColor: "#512DA8"
                    }}
                    />
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

RegisterTab.navigationOptions = {
    title: 'Register',
    tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name='user-plus'
          type='font-awesome'            
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ) 
};

LoginTab.navigationOptions = {
    title: 'Login',
    tabBarIcon: ({ tintColor }) => (
        <Icon
          name='sign-in'
          type='font-awesome'            
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ) 
};

const Tab = createBottomTabNavigator()

function Login(){
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeBackgroundColor: '#9575CD',
                inactiveBackgroundColor: '#D1C4E9',
                activeTintColor: '#ffffff',
                inactiveTintColor: 'gray'
            }}
            >
            <Tab.Screen name="Login" component={LoginTab} />
            <Tab.Screen name="Register" component={RegisterTab} />
        </Tab.Navigator>
    )
}

export default Login;