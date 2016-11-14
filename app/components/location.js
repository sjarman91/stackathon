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
            <div className="col-md-2">
              <ChartComponent />
            </div>
            <div className="col-md-8">
            </div>
            <div className="col-md-2">
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
  var config = {
    chart: {
      spacingBottom: 20
    },
    title : {
      text : 'basic demo'
    },

    legend: {
      enabled: true
    },

    plotOptions: {
      map: {
        mapData: Highcharts.maps['custom/world'],
      }
    }
  };
    console.log(Highcharts.maps['custom/world'])
    return (
        <div>
            {React.createElement(ReactHighmaps, { config: config })}
        </div>
    )
}
