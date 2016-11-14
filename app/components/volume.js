import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts'
import { connect } from 'react-redux'


class VolumeChart extends Component {

  render() {
    const { session } = this.props
    console.log('rendering Volume')
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>Volume Chart Below:</h1>
            </div>
            <div className="col-md-4">
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-8">
              <ChartComponent samples={session.samples} />
            </div>
            <div className="col-md-2">
            </div>
          </div>
        </div>
    )
  }
}


const mapStateToProps = state => ({session: state.session})

const VolumeContainer = connect(mapStateToProps)(VolumeChart)

export default VolumeContainer





const convertData = function (samples) {
  let convertedData = [];

  samples.forEach( sample => {
    convertedData.push([sample.time, sample.TPM])
  })

  return convertedData
}


function ChartComponent (props) {
    const { samples } = props
    console.log(samples)

    var config = {
      title: {text: 'Tweets per Minute'},
      xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Time'
            }
        },
      yAxis: {
            title: {
                text: 'Tweets Per Minute'
            }
        },
      plotOptions: {
            line: {
                dataLabels: {
                    enabled: false
                }
            }
        },
      series: [{name: 'TPM',
                data: convertData(samples)
              }]
    };

    return (
        <div>
            {React.createElement(ReactHighcharts, { config: config })}
        </div>
    )
}

