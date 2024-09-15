import {useState} from 'react' 
import {format} from 'date-fns'  
import AppointmentItem from '../AppointmentItem'
import {v4} from 'uuid'
import './index.css'

const Appointments = () => { 
    const [appointmentList ,  setAppointmentList] = useState([]) 
    const [titleInput , setTitleInput] = useState('') 
    const [dateInput , setDateInput] = useState('') 
    const [isFilterActive, setISFillterActive] = useState(false)

    const onChangeTitleInput = (event) => {
        setTitleInput(event.target.value)
    } 

    const onChangeDateInput = event => {
        setDateInput(event.target.value)
    }

    const togglesStarred = id => {
        setAppointmentList((prevState) => prevState.map((eachAppointment) => 
            (id === eachAppointment.id) ? 
        {...eachAppointment, isStarred: !eachAppointment.isStarred} : eachAppointment
    )
        )}
    const onfilter = () => {
        setISFillterActive((isFilterActive) => !isFilterActive)
    }
    const onAddAppointment = event => {
        event.preventDefault() 

        const formattedDate = dateInput ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE') 
        : '' 

        const newAppointment = {
            id: v4() ,
            title: titleInput,
            date: formattedDate,
            isStarred: false,
            
        }
        setAppointmentList((prevStateAppointment) => [...prevStateAppointment, newAppointment]);
        setTitleInput('');
        setDateInput('') 
    }

    const filteredAppointments = isFilterActive
    ? appointmentList.filter(({ isStarred }) => isStarred)
    : appointmentList;
  
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    
    return (
        <div className="app-container">
          <div className="responsive-container">
            <div className="appointments-container">
              <div className="add-appointment-container">
                <form className="form" onSubmit={onAddAppointment}>
                  <h1 className="add-appointment-heading">Add Appointment</h1>
                  <div>
                  <label htmlFor="title" className="label">
                    TITLE
                  </label>
                  <br/>
                  <input
                    type="text"
                    id="title"
                    value={titleInput}
                    onChange={onChangeTitleInput}
                    className="input"
                    placeholder="Title"
                  />
                  </div>
                  <label htmlFor="date" className="label">
                    DATE
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={dateInput}
                    onChange={onChangeDateInput}
                    className="input"
                  />
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </form>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  alt="appointments"
                  className="appointments-img"
                />
              </div>
              <hr className="hr" />
              <div className="header-with-filter-container">
                <h1 className="appointments-heading">Appointments</h1>
                <button
                  type="button"
                  className={`filter-style ${filterClassName}`}
                  onClick={onfilter}
                >
                  Starred
                </button>
              </div>
              <ul className="appointments-list">
                {filteredAppointments.map(eachAppointment => (
                  <AppointmentItem
                    key={eachAppointment.id}
                    appointmentListDetails={eachAppointment}
                    togglesStarred={togglesStarred}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    }
  
export default Appointments