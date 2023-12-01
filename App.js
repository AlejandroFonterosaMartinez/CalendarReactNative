
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Input, ListItem } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTaskTime, setSelectedTaskTime] = useState(new Date()); // Estado para almacenar la hora seleccionada para la tarea
  const [selectedManualTime, setSelectedManualTime] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedManualTime(date); // Actualiza la hora seleccionada manualmente
    hideDatePicker();
  };

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks({
        ...tasks,
        [selectedDate]: tasks[selectedDate]
          ? [...tasks[selectedDate], { task, time: selectedManualTime }]
          : [{ task, time: selectedManualTime }],
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 50 }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>{selectedDate}</Text>
            <Input
              placeholder="Ingrese una tarea"
              onChangeText={(text) => setTask(text)}
              value={task}
              containerStyle={{ marginBottom: 10 }}
            />
            <TouchableOpacity onPress={showDatePicker}>
              <Text>{selectedTaskTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              date={selectedManualTime} // Ahora utiliza la hora seleccionada manualmente
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Button title="Agregar tarea" onPress={handleAddTask} />
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
