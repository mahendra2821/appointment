import './index.css'

const AppointmentItem = ({appointmentListDetails, togglesStarred}) => { 
const {id, title, date, isStarred} = appointmentListDetails 
const starImage = isStarred    
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

    const onClickStar = () => {
        togglesStarred(id) 

    }

    return (
        <li className="appointment-item">
          <div className="header-container">
            <p className="title">{title}</p>
            <button
              type="button"
              data-testid="star"
              className="star-button"
              onClick={onClickStar}
            >
              <img src={starImage} className="star" alt="star" />
            </button>
          </div>
          <p className="date">Date: {date}</p>
        </li>
      )
    }
export default AppointmentItem 