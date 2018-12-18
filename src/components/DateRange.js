import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Datetime from 'react-datetime'
import { Segment } from 'semantic-ui-react'
import 'react-datetime/css/react-datetime.css'

const propTypes = {
  event: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
  endDate: PropTypes.date,
  startDate: PropTypes.date
}

const DateRange = (props) => {
  const format = 'MM-DD-YYYY'
  const { event, onDateChange, startDate, endDate } = props
  const { start_date, end_date } = event
  const [eventStartDate, eventEndDate] = [moment(start_date), moment(end_date)]
  const fromInputProps = {
    placeholder: 'Start',
    readOnly: true,
    value: startDate ? moment(startDate).format(format) : ''
  }
  const toInputProps = {
    placeholder: 'End',
    readOnly: true,
    disabled: !startDate,
    value: endDate ? moment(endDate).format(format) : ''
  }

  const isValidDate = (current) => {
    return current.isSame(eventStartDate) || current.isBetween(eventStartDate, eventEndDate) || current.isSame(eventEndDate)
  }

  const isToDateValid = (current) => {
    return current.isSame(startDate) || current.isBetween(startDate, eventEndDate) || current.isSame(eventEndDate)
  }

  return (
    <Segment vertical >
      <div className='filter-title'>
        DATE
        <a href='javascript:void(0)' className='filter-segment-clear' onClick={() => onDateChange('clear')}>CLEAR</a>
      </div>
      <div className='date-filter'>
        <Datetime
          inputProps={fromInputProps}
          closeOnSelect
          timeFormat={false}
          dateFormat={format}
          defaultValue={eventStartDate}
          onChange={(date) => onDateChange('startDate', date.format('YYYY-MM-DD'))}
          className='rdt-start-date'
          isValidDate={isValidDate}
          value={startDate ? moment(startDate) : eventStartDate}
          onFocus={() => DateRange.handlePositionOnFocus('start')} />
        <Datetime
          closeOnSelect
          timeFormat={false}
          dateFormat={format}
          defaultValue={eventEndDate}
          inputProps={toInputProps}
          onChange={(date) => onDateChange('endDate', date.format('YYYY-MM-DD'))}
          className='rdt-end-date'
          value={endDate ? moment(endDate) : eventEndDate}
          isValidDate={isToDateValid}
          onFocus={() => DateRange.handlePositionOnFocus('end')} />
      </div>
    </Segment>
  )
}

DateRange.defaultProps = {
  event: { start_date: '', end_date: '' },
  endDate: new Date(),
  startDate: new Date()
}

DateRange.propTypes = propTypes

DateRange.hideDatePickerOnScroll = (e) => {
  const datePicker = document.querySelector('.rdt.rdtOpen')
  datePicker && datePicker.classList.remove('rdtOpen')
}

DateRange.handlePositionOnFocus = (type) => {
  document.addEventListener('scroll', function (e) {
    DateRange.hideDatePickerOnScroll(e)
  }, { once: true })

  document.addEventListener('DOMContentLoaded', function (e) {
    const position = document.querySelector(`.rdt-${type}-date > .form-control`).getBoundingClientRect()
    const scrolledTop = position.top + position.height - 133
    document.querySelector(`.rdt-${type}-date .rdtPicker`).style.top = `${scrolledTop}px`
  }, { once: true })
}

export default DateRange
