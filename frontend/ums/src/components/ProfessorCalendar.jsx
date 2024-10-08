import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { tokens } from '../theme';
import { Typography, useTheme } from '@mui/material';
import axios from 'axios';
import './calendar.css';

export default function ProfessorCalendar({ token }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [assignments, setAssignments] = useState([]);
  const [provimet, setProvimet] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const assignmentFetch = await axios.get('http://localhost:8080/api/professor/kalendari'
            , {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
        setAssignments(assignmentFetch.data);
  
        const provimetFetch = await axios.get('http://localhost:8080/api/professor/provimet', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProvimet(provimetFetch.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [token]);

  const assignments2 = assignments.map(assignment => ({
    title: assignment.titulli,
    start: assignment.expireAt,
    type: 'assignment',
  }));

  const provimet2 = provimet.map(provimi => ({
    title: 'Provim: ' + provimi.ligjerata,
    start: provimi.data,
    type: 'provim',
  }));

  const renderEventContent = (eventInfo) => {
    const eventStyle = {
      padding: 3,
      textAlign: 'center',
      background: eventInfo.event.extendedProps.type === 'provim' ? '#e33327' : colors.blueAccent[500],
      color: '#fff',
      width: '100%',
      borderRadius: 3,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'wrap',
      border: 'none',
    };

    return (
      <div className="custom-event" style={eventStyle}>
        <Typography>{eventInfo.event.title}</Typography>
      </div>
    );
  };
  

  const events = [...assignments2, ...provimet2];

  return (
    <FullCalendar
      height="100%"
      plugins={[dayGridPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        right: 'title',
      }}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
    />
  );
}