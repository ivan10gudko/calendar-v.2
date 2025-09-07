import type React from "react"
import Header from "../components/calendar/Header";
import { useState } from "react";

const CalendarPage : React.FC = () => {
      const [calendarMode,setCalendarMode] = useState<'month' | 'week' | 'day'>('month');
return (<>
    <Header calendarMode={calendarMode} setCalendarMode={setCalendarMode} />
    <div>
        <h1>Calendar Page</h1>
      {/* Calendar component will go here */}
    </div>
    </>
)
}
export default CalendarPage;