import React, {useEffect} from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, ToastAndroid } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchPromos: () => dispatch(fetchPromos())
})

import DishDetail from './DishDetailComponent'
import Menu from './MenuComponent'
import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'
import Reservation from './ReservationComponent'
import Favorite from './FavoriteComponent'
import Login from './LoginComponent'

const Stack = createStackNavigator();

function MenuNavigator() {
    return(
        <Stack.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <Stack.Screen
                name="Menu"
                component={Menu}
                options={({ navigation, route }) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{paddingLeft: 23}}
                            onPress={() => {navigation.toggleDrawer()}}
                        />
                    )
                })}
            />
            
            <Stack.Screen
                name="Dishdetail"
                component={DishDetail}
                options={({ navigation, route }) => ({
                    headerTitle: 'Dish Detail'
                })}
            />    
 

        </Stack.Navigator>
    );
}

function AboutNavigator() {
    return(
        <Stack.Navigator
            initialRouteName='About'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <Stack.Screen
                name="About"
                component={About}
                options={({ navigation, route }) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{paddingLeft: 23}}
                            onPress={() => {navigation.toggleDrawer()}}
                        />
                    ),
                    headerTitle: 'About Us'
                })}
            />

        </Stack.Navigator>
    );
}

function ContactNavigator() {
    return(
        <Stack.Navigator
            initialRouteName='Contact'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <Stack.Screen
                name="Contact"
                component={Contact}
                options={({ navigation, route }) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{paddingLeft: 23}}
                            onPress={() => {navigation.toggleDrawer()}}
                        />
                    ),
                    headerTitle: 'Contact Us'
                })}
            />

        </Stack.Navigator>
    );
}

function HomeNavigator() {
    return(
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={({ navigation, route }) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{paddingLeft: 23}}
                            onPress={() => {navigation.toggleDrawer()}}
                        />
                    )
                })}
            />

        </Stack.Navigator>
    );
}

function ReservationNavigator() {
    return(
        <Stack.Navigator
            initialRouteName='Reservation'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <Stack.Screen
                name="Reservation"
                component={Reservation}
                options={({ navigation, route }) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{paddingLeft: 23}}
                            onPress={() => {navigation.toggleDrawer()}}
                        />
                    ),
                    headerTitle: 'Reserve Table'
                })}
            />

        </Stack.Navigator>
    );
}

function FavoritesNavigator() {
    return(
        <Stack.Navigator
            initialRouteName='Favorites'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <Stack.Screen
                name="Favorites"
                component={Favorite}
                options={({ navigation, route }) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{paddingLeft: 23}}
                            onPress={() => {navigation.toggleDrawer()}}
                        />
                    ),
                    headerTitle: 'My Favorites'
                })}
            />

        </Stack.Navigator>
    );
}

function LoginNavigator() {
    return(
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <Stack.Screen
                name="Login"
                component={Login}
                options={({ navigation, route }) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{paddingLeft: 23}}
                            onPress={() => {navigation.toggleDrawer()}}
                        />
                    ),
                    headerTitle: 'Login'
                })}
            />

        </Stack.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}
            >
                <View style={styles.drawerHeader}>
                    <View style={{flex:1}}>
                        <Image source={require('./images/logo.png')} 
                            style={styles.drawerImage} />
                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                    </View>
                </View>
                <DrawerItemList {...props}/>
            
        </SafeAreaView>
    </ScrollView>
)

const Drawer = createDrawerNavigator();

function MainNavigator() {
    return(
        <Drawer.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
            drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
        >

            <Drawer.Screen
                name="Login"
                component={LoginNavigator}
                options={{ 
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='sign-in'
                            type='font-awesome'
                            size={24}
                            iconStyle={{ color: tintColor }}
                          />
                    )
                }}
            />

            <Drawer.Screen
                name="Home"
                component={HomeNavigator}
                options={{ 
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={24}
                            iconStyle={{ color: tintColor }}
                          />
                    )
                }}
            />

            <Drawer.Screen
                name="Menu"
                component={MenuNavigator}
                options={{ 
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='list'
                            type='font-awesome'
                            size={24}
                            iconStyle={{ color: tintColor }}
                          />
                    )
                }}
            />

            <Drawer.Screen
                name="Reservation"
                component={ReservationNavigator}
                options={{ 
                    drawerLabel: 'Reserve Table',
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='cutlery'
                            type='font-awesome'
                            size={24}
                            iconStyle={{ color: tintColor }}
                          />
                    )
                }}
            /> 

            <Drawer.Screen
                name="Favorites"
                component={FavoritesNavigator}
                options={{ 
                    drawerLabel: 'My Favorites',
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='heart'
                            type='font-awesome'
                            size={24}
                            iconStyle={{ color: tintColor }}
                          />
                    )
                }}
            /> 

            <Drawer.Screen
                name="About"
                component={AboutNavigator}
                options={{ 
                    drawerLabel: 'About Us',
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            size={24}
                            iconStyle={{ color: tintColor }}
                          />
                    )
                }}
            /> 

            <Drawer.Screen
                name="Contact"
                component={ContactNavigator}
                options={{ 
                    drawerLabel: 'Contact Us',
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            size={22}
                            iconStyle={{ color: tintColor }}
                          />
                    )
                }}
            /> 

        </Drawer.Navigator>
    );
}

function Main (props){

    useEffect(() => {
        props.fetchDishes()
        props.fetchComments()
        props.fetchLeaders()
        props.fetchPromos()

        NetInfo.fetch()
        .then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                ToastAndroid.LONG)
        });

        NetInfo.addEventListener('connectionChange', handleConnectivityChange);

        return () => {
            NetInfo.removeEventListener('connectionChange', handleConnectivityChange);
        }

    }, [])

    const handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
          case 'none':
            ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
            break;
          case 'wifi':
            ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
            break;
          case 'cellular':
            ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
            break;
          case 'unknown':
            ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
            break;
          default:
            break;
        }
      }

    return (
        <NavigationContainer>
            <MainNavigator/>           
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage:{
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)