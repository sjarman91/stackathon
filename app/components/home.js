import React, { Component } from 'react';
import { connect } from 'react-redux'


class Home extends Component {

  render() {
    const { tweetCount, tweets, time } = this.props
    let tweetsPerMinute = 0
    if(tweetCount) {
      tweetsPerMinute = Math.round(tweetCount / (((time.current - time.start)/1000)/60))
    }
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>Firehose Control:</h1>
            </div>
            <div className="col-md-4">
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-8">
              <h4>Tweet Volume</h4>
              <p>Tweets processed: {tweetCount}</p>
              <p>Tweets per Minute: {tweetsPerMinute}</p>
            </div>
            <div className="col-md-4">
              <h4>Last 5 Tweets:</h4>
              {this.props.tweets && this.props.tweets.slice(0,5).map(tweet => (<p key={tweet.id}>{tweet.text}</p>))}
            </div>
          </div>
        </div>
    )
  }
}


const mapStateToProps = state => ({tweetCount: state.tweetCount, tweets: state.tweets, time: state.time})

const HomeContainer = connect(mapStateToProps)(Home)

export default HomeContainer
