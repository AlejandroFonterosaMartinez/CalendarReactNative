

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Input, ListItem } from 'react-native-elements';

const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks({
        ...tasks,
        [selectedDate]: tasks[selectedDate] ? [...tasks[selectedDate], task] : [task],
      });

      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

      setMarkedDates({
        ...markedDates,
        [selectedDate]: { selected: true, marked: true, dotColor: randomColor },
      });

      setTask('');
      setModalVisible(false);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 50, paddingHorizontal: 20, backgroundColor: 'white' }}>
      <h1 style={{
        marginTop: 10,
        color: 'lightblue',
        fontSize: 50,
        fontFamily: 'arial',
        textAlign: 'center',
        marginBottom: 20,
      }}>Calendario</h1>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          calendarBackground: '#FFFFFF',
          textSectionTitleColor: '#333333',
          selectedDayBackgroundColor: '#1E90FF',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#1E90FF',
          dayTextColor: '#333333',
        }}
        style={{
          marginTop: 30,
          backgroundColor: 'lightblue',
          borderRadius: 15,
          marginBottom: 20,
          height: 400,

        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
          <View style={{ padding: 20, borderRadius: 10, width: 300 ,backgroundColor:"lightblue"}}>
            <Text style={{ fontSize: 18, marginBottom: 10, textAlign:'center',marginTop:10,backgroundColor:"white",borderRadius:10 }}>{selectedDate}</Text>
            <Input
            style={{backgroundColor:"white",textAlign:'center'}}
              placeholder="Que vas a hacer hoy?"
              onChangeText={(text) => setTask(text)}
              value={task}
              containerStyle={{ marginBottom: 20 }}
            />
            <Button title="Agregar" onPress={handleAddTask} />
          </View>
        </View>
      </Modal>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Tareas:</Text>
        {tasks[selectedDate] &&
          tasks[selectedDate].map((task, index) => (
            <ListItem key={index} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{task}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
      </View>
    </View>
  );
};

export default CalendarApp;
