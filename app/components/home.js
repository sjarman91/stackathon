import React, { Component } from 'react';
import { connect } from 'react-redux'
import { start, end } from '../reducers/session.js'


class Home extends Component {
  constructor(props) {
    super(props)
    this.onStart = this.onStart.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  onStart() {
    this.props.socket.emit('activate')
    this.props.start()
  }
  onEnd() {
    this.props.socket.emit('stop')
    this.props.end()
  }

  render() {
    const { tweetCount, tweets, session } = this.props

    let tweetsPerMinute = 0

    if(tweetCount) {
      tweetsPerMinute = Math.round(tweetCount / (((session.current - session.start)/1000)/60))
    }

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>Firehose Control:</h1>
              {session.active ? <button type="button" className="btn btn-primary" onClick={this.onEnd}>End Session</button> : <button type="button" className="btn btn-primary" onClick={this.onStart}>Start Session</button>
              }
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

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(start()),
  end: () => dispatch(end())
})

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeContainer
