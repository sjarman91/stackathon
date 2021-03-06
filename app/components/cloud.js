import React, { Component } from 'react';
import { connect } from 'react-redux'

class TweetCloud extends Component {

  componentDidMount() {
    console.log('tweet cloud mounted')
  }

  render() {
    const { cloud } = this.props

    let sortableArr = []
    let val = 0

    for (let word in cloud) {
      sortableArr.push([word, cloud[word]])
    }

    sortableArr.sort((a, b) => {
      return b[1] - a[1]
    })

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>Word Cloud</h1>
              <p>(under construction)</p>
            </div>
            <div className="col-md-4">
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-12">
            {sortableArr && sortableArr.slice(0,100).map(word =>{
              return (<p key={val++}>{word[0]} - {word[1]}x</p>)
              })
            }
            </div>
          </div>
          <div className="row">
          </div>
        </div>
    )
  }
}


const mapStateToProps = state => ({cloud: state.cloud})

const CloudContainer = connect(mapStateToProps)(TweetCloud)

export default CloudContainer
