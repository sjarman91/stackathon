import React, {Component} from 'react';
import { connect } from 'react-redux'
import ReactHighmaps from 'react-highcharts/ReactHighmaps.src.js'

class Location extends Component {


  render() {
    const { locations } = this.props
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>Tweet Map Below:</h1>
            </div>
            <div className="col-md-4">
            </div>
          </div>
          <div className="row">
            <div className="col-md-1">

            </div>
            <div className="col-md-10">
              <MapComponent locations={locations} />
            </div>
            <div className="col-md-1">
            </div>
          </div>
        </div>
    )
  }
}


const mapStateToProps = state => ({locations: state.locations})

const LocationContainer = connect(mapStateToProps)(Location)

export default LocationContainer


function MapComponent (props) {
    console.log('in the map ', props.locations)
    const { locations } = props
    const config = {

        title: {
            text: 'Tweet Map'
        },

        mapNavigation: {
            enabled: true
        },

        tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b><br>Lat: {point.lat}, Lon: {point.lon}'
        },

        series: [{
            // Use the gb-all map with no data as a basemap
            mapData: Highcharts.maps['custom/world'],
            borderColor: '#A0A0A0',
            nullColor: 'rgba(200, 200, 200, 0.3)',
            showInLegend: false
        }, {
            // Specify points using lat/lon
            type: 'mappoint',
            name: 'Tweets',
            color: Highcharts.getOptions().colors[1],
            data: locations
        }]
    }

    return (
        <div>
            {React.createElement(ReactHighmaps, {config: config})}
        </div>
    )
}
