import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function Calendar() {
  return (
    <FullCalendar
    height="100%"
    width="100%"
      plugins={[ dayGridPlugin ]}
      headerToolbar={{
        left: 'prev,next today',
        right: 'title'
      }}
      initialView="dayGridMonth"
    />
  )
}