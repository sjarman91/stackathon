// import React, {Component} from 'react'
// import { connect } from 'react-redux'


// class Timer extends Component {

//   render() {

//   const { time } = this.props
//   console.log('rendering timer', time)

//   let secondsElapsed = Math.floor(((time.current - time.start)/1000))

//   let minutes = Math.floor(secondsElapsed / 60)
//   let seconds = Math.floor(secondsElapsed % 60)

//   return (
//     <div>
//       <p>{minutes}:{seconds}</p>
//     </div>
//     )
//   }
// }


// const mapStateToProps = state => ({time: state.time})

// const TimerContainer = connect(mapStateToProps)(Timer)

// export default TimerContainer
