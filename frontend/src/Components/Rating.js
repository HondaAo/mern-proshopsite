import React, {PropTypes} from 'react'

const Rating = ({ value, text, color }) => {
    return (
        <div className="rating">
            <span><i style={{ color : color }} className={value >= 1 ? 'fas fa-star' : value>= 0.5 ? 'fas fa-star-half-alt' : 'fas fa-star'} /></span>
            <span><i style={{ color : color }} className={value >= 2 ? 'fas fa-star' : value>= 1.5 ? 'fas fa-star-half-alt' : 'fas fa-star'} /></span>
            <span><i style={{ color : color }} className={value >= 3 ? 'fas fa-star' : value>= 2.5 ? 'fas fa-star-half-alt' : 'fas fa-star'} /></span>
            <span><i style={{ color : color }} className={value >= 4 ? 'fas fa-star' : value>= 3.5 ? 'fas fa-star-half-alt' : 'fas fa-star'} /></span>
            <span><i style={{ color : color }} className={value >= 5 ? 'fas fa-star' : value>= 4.5 ? 'fas fa-star-half-alt' : 'fas fa-star'} /></span>
            <br />
            <span>{text && text}</span>
        </div>
    )
}

Rating.defaultProps = {
    color: 'yellow'
}


export default Rating