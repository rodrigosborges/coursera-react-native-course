import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

const Reservation = () => {

    const [guests, setGuests] = useState(1)
    const [smoking, setSmoking] = useState(false)
    const [date, setDate] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [calendarId, setCalendarId] = useState(null)

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const obtainNotificationPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    const presentLocalNotification = async (date) => {
        await obtainNotificationPermission();
        Notifications.presentNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    const obtainCalendarPermission = async() => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        return status
    }

    const getDefaultCalendarSource = async() => {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }

    const createCalendar = async() => {
        const defaultCalendarSource =
          Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Expo Calendar' };
        const newCalendarID = await Calendar.createCalendarAsync({
          title: 'Expo Calendar',
          color: 'blue',
          entityType: Calendar.EntityTypes.EVENT,
          sourceId: defaultCalendarSource.id,
          source: defaultCalendarSource,
          name: 'internalCalendarName',
          ownerAccount: 'personal',
          accessLevel: Calendar.CalendarAccessLevel.OWNER,
        })

        setCalendarId(newCalendarID)
    }

    const addReservationToCalendar = async(date) => {
        const permission = await obtainCalendarPermission()
        if(permission == 'granted'){
            var parse = Date.parse(date)
            var start = new Date(parse)
            var end = new Date((parse+(2*60*60*1000)))

            if(!calendarId){
                await createCalendar()
            }

            Calendar.createEventAsync(calendarId, {
                title: 'Con Fusion Table Reservation',
                startDate: start,
                endDate: end,
                timezone: 'Asia/Hong_Kong',
                location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
            })
        }
    }

    const handleReservation = () => { 

        var messages = [
            `Number of Guests: ${guests}`,
            `Smoking: ${smoking ? 'Yes' : 'No'}`,
            `Date and Time: ${date}`
        ]

        Alert.alert(
            'Your Reservation OK?',
            messages.join('\n'),
            [
            {text: 'Cancel', onPress: () => resetForm()},
            {text: 'OK', onPress: () => {
                presentLocalNotification(date)
                addReservationToCalendar(date)
                resetForm()
            }},
            ],
            { cancelable: false }
        );
    }

    const resetForm = () => {
        setGuests(1)
        setSmoking(false)
        setDate('')
        setShowModal(false)
    }

    return(
        <ScrollView>
            <Animatable.View animation="zoomIn" duration={2000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={guests}
                        onValueChange={(itemValue, itemIndex) => setGuests(itemValue)}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={smoking}
                        trackColor='#512DA8'
                        onValueChange={(value) => setSmoking(value)}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={date}
                        format=''
                        mode="datetime"
                        placeholder="select date and Time"
                        minDate="2017-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys. 
                        }}
                        onDateChange={(date) => setDate(date)}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                        />
                </View>
            </Animatable.View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Reservation;