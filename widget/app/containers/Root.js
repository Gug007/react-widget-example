import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Select from '../components/select'

const styles = {
  container: {
    border: '1px solid #d5d5d5',
    background: '#fafafa'
  },
  box: {
    padding: 5,
    overflowY: 'scroll',
    maxHeight: 400
  },
  item: {
    padding: 10,
    borderBottom: '1px solid #d5d5d5'
  },
  direction: { fontSize: 22, color: '#525252' },
  select: { margin: '15px 15px 0px 15px' }
}

const getDate = val => {
  var date = new Date(val)
  return date.toLocaleString()
}

class Root extends Component{
  constructor(props) {
    super(props);
    this.actions = bindActionCreators(actions, this.props.dispatch);
  }

  componentDidMount() {
    const { loadFlights } = this.actions;
    loadFlights()
  }

  setVisibilityFilter(filter) {
    const { setVisibilityFilter } = this.actions;
    setVisibilityFilter(filter)
  }

  render(){
    const { flights, carriers, visibilityFilter } = this.props
    return (
      <div style={styles.container}>
        <div style={styles.select} >
          {'Filter: '}
          <Select
            options={carriers}
            value={visibilityFilter}
            onChange={val => this.setVisibilityFilter(val)}/>
        </div>
        <div style={styles.box}>
        {flights.map((val, i) => (
          <div key={val.id} style={styles.item}>
            <div style={styles.direction}>
              {val.direction.from} → {val.direction.to}
            </div>
            <div style={{color: '#999'}}>
              {getDate(val.departure)} - {getDate(val.arrival)}
            </div>
            <div style={{color: '#999'}}>
              {val.carrier}
            </div>
          </div>
        ))}
      </div>
      </div>
    )
  }
}

const getVisible = (flights, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return flights
    default:
      return flights.filter(f => f.carrier === filter)
  }
}

const getCarriers = (flights) => {
  return flights.reduce((p, v) => {
    if(p.indexOf(v.carrier)===-1) {
      return p.concat(v.carrier)
    }
    return p
  }, [])
}

export default connect(state => ({
  flights: getVisible(state.flights.list, state.visibilityFilter),
  visibilityFilter: state.visibilityFilter,
  carriers: getCarriers(state.flights.list)
}))(Root)