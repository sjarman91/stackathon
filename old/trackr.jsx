// import React, { Component } from 'react';
// import axios from 'axios'

// export default class Trackr extends Component {

//   componentWillUnmount(){
//     console.log('mapping stopped!')
//     clearInterval(logLocation)
//   }

//   render() {
//     console.log('your locaton is being updated')
//     logLocation()

//     // log location every 15 seconds
//     setInterval(logLocation, 15000)

//     return (
//       <div>
//         <h1>You are on the map</h1>
//       </div>
//     )
//   }
// }


// const logLocation = () => {
//   window.navigator.geolocation.getCurrentPosition(function(pos) {
//     axios.post('/api/location', {lat: pos.coords.latitude, long: pos.coords.longitude})
//       .then(res =>{
//         console.log(res.data)
//       })
//   });
// }


