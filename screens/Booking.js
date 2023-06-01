import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Button from '../components/Button';

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookedEvents, setBookedEvents] = useState({});
  const [nextBooking, setNextBooking] = useState(null);
  const [availableEvents, setAvailableEvents] = useState([
    '08.00-12.00',
    '12.00-16.00',
    '16.00-20.00',
  ]);

  useEffect(() => {
    renderNextBooking();
  }, [bookedEvents]);

  const handleDayPress = (date) => {
    setSelectedDate(date.dateString);
    setSelectedEvent(null);
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
  };

  const handleBooking = () => {
    if (selectedDate && selectedEvent) {
      const bookingsForDate = bookedEvents[selectedDate] || [];
      const updatedBookings = {
        ...bookedEvents,
        [selectedDate]: [...bookingsForDate, selectedEvent],
      };
      setBookedEvents(updatedBookings);
      setSelectedEvent(null);
      renderNextBooking();

      const updatedAvailableEvents = availableEvents.filter(
        (event) => event !== selectedEvent
      );
      setAvailableEvents(updatedAvailableEvents);
    }
  };

  const handleCancelBooking = () => {
    if (nextBooking) {
      const [date, event] = nextBooking.split(' - ');
      const bookingsForDate = bookedEvents[date];
      const updatedBookings = {
        ...bookedEvents,
        [date]: bookingsForDate.filter((e) => e !== event),
      };
      setBookedEvents(updatedBookings);
      setNextBooking(null);

      const updatedAvailableEvents = [...availableEvents, event];
      setAvailableEvents(updatedAvailableEvents);
    }
  };

  const renderEvents = () => {
    if (!selectedDate) {
      return null;
    }

    const events = availableEvents;

    return (
      <View style={styles.eventsContainer}>
        {events.map((event) => (
          <TouchableOpacity
            key={event}
            style={[
              styles.event,
              selectedEvent === event && styles.selectedEvent,
              bookedEvents[selectedDate]?.includes(event) && styles.bookedEvent,
            ]}
            onPress={() => handleEventPress(event)}
          >
            <Text>{event}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderNextBooking = () => {
    if (!selectedDate || Object.keys(bookedEvents).length === 0) {
      setNextBooking(null);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const bookedDates = Object.keys(bookedEvents).sort();
    const nextBookingDate = bookedDates.find((date) => date >= today);

    if (nextBookingDate) {
      const nextBookingEvent = bookedEvents[nextBookingDate][0];
      setNextBooking(`${nextBookingDate} - ${nextBookingEvent}`);
    } else {
      setNextBooking(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Boka tvättid</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{ [selectedDate]: { selected: true } }}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: '#505B59',
          selectedDayTextColor: 'white',
          todayTextColor: '#9bc9c1',
          arrowColor: 'black',
        }}
      />
      {selectedDate && (
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>
            Valt datum: {selectedDate}
          </Text>
        </View>
      )}
      <View style={styles.eventsContainer}>{renderEvents()}</View>
      {selectedEvent && (
        <View style={styles.selectedEventContainer}>
          <Text style={styles.selectedEventText}>
            Vald tid: {selectedEvent}
          </Text>
          <Button title="Boka tvättid" onPress={handleBooking} />
        </View>
      )}
      {nextBooking ? (
        <View style={styles.nextBookingContainer}>
          <Text style={styles.nextBookingText}>
            Din nästa tvättid: {nextBooking}
          </Text>
          <Button title="Avboka tvättid" onPress={handleCancelBooking} />
        </View>
      ) : (
        <View style={styles.nextBookingContainer}>
          <Text style={styles.nextBookingText}>
            Ingen kommande tvättid bokad
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 100,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  calendar: {
    marginBottom: 20,
  },
  selectedDateContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  event: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedEvent: {
    backgroundColor: '#505B59',
  },
  bookedEvent: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  selectedEventContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  selectedEventText: {
    fontWeight: 'bold',
    color: '#505B59',
  },
  nextBookingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  nextBookingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
