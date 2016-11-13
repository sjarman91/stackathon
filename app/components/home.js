import React, { Component } from 'react';
import { connect } from 'react-redux'


class Home extends Component {

  render() {
    const { tweetCount, tweets, session, socket } = this.props

    let tweetsPerMinute = 0

    if(tweetCount) {
      tweetsPerMinute = Math.round(tweetCount / (((session.current - session.start)/1000)/60))
    }

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>Firehose Control:</h1>
              <button type="button" className="btn btn-primary" onClick={() => {socket.emit('activate')}}>Start Session</button>
              <button type="button" className="btn btn-primary" onClick={() => {socket.emit('stop')}}>End Session</button>
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


const mapStateToProps = state => ({tweetCount: state.tweetCount, tweets: state.tweets, session: state.session, socket: state.socket})

const HomeContainer = connect(mapStateToProps)(Home)

export default HomeContainer
