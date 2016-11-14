import React, {Component} from 'react';
import { connect } from 'react-redux'
import ReactHighmaps from 'react-highcharts/ReactHighmaps.src.js'

class Location extends Component {


  render() {
    console.log('highmaps',  ReactHighmaps)
    const { location } = this.props
    console.log('rendering Volume')
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
            <ChartComponent location={location} />
            </div>
            <div className="col-md-1">
            </div>
          </div>
        </div>
    )
  }
}


const mapStateToProps = state => ({location: state.location})

const LocationContainer = connect(mapStateToProps)(Location)

export default Location


function ChartComponent (props) {

    const config = {

        title: {
            text: 'Highmaps basic lat/lon demo'
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
            data: [{
                name: 'London',
                lat: 51.507222,
                lon: -0.1275
            }, {
                name: 'Birmingham',
                lat: 52.483056,
                lon: -1.893611
            }, {
                name: 'Leeds',
                lat: 53.799722,
                lon: -1.549167
            }, {
                name: 'Glasgow',
                lat: 55.858,
                lon: -4.259
            }, {
                name: 'Sheffield',
                lat: 53.383611,
                lon: -1.466944
            }, {
                name: 'Liverpool',
                lat: 53.4,
                lon: -3
            }, {
                name: 'Bristol',
                lat: 51.45,
                lon: -2.583333
            }, {
                name: 'Belfast',
                lat: 54.597,
                lon: -5.93
            }, {
                name: 'Lerwick',
                lat: 60.155,
                lon: -1.145,
            }]
        }]
    }

    return (
        <div>
            {React.createElement(ReactHighmaps, {config: config})}
        </div>
    )
}
