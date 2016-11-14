import React, { Component } from 'react';
import { connect } from 'react-redux'
import { start, end, addSample, changeTopic } from '../reducers/session.js'
import Tweet from './tweet.js'


/* --------------------------- HOME COMPONENT -------------------------- */

class Home extends Component {

  constructor(props) {
    super(props)
    this.onStart = this.onStart.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.dispatchTPM = this.dispatchTPM.bind(this)
  }

  render() {
    const { tweetCount, tweets, session } = this.props
    let tweetsPerMinute = 0
    if(tweetCount) { tweetsPerMinute = caculateTPM(tweetCount, session) }

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center">TVIZ - Twitter Stream Manager</h1>
              <p className="lead text-center">Monitor your favorite topics in real-time, see what others are saying, and be the first to know breaking news!</p>
              <hr/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p className="text-center">Current Stream: '{session.topic}'</p>
            </div>
            <div className="col-md-4">
              <p className="text-center">Tweets processed: {tweetCount}</p>
            </div>
            <div className="col-md-4">
              <p className="text-center">Tweets per Minute: {tweetsPerMinute}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <h3>Control Panel</h3>
                  <hr/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12">
                      {session.active ? <button type="button" style={{marginBottom:20}} className="btn btn-primary disabled" onClick={this.onStart}>Start Session</button> : <button type="button" style={{marginBottom:20}} className="btn btn-primary" onClick={this.onStart}>Start Session</button>
                      }
                      {session.active ? <button type="button" style={{marginLeft:10, marginBottom:20}} className="btn btn-danger" onClick={this.onEnd}>End Session</button> : <button type="button" style={{marginLeft:10, marginBottom:20}} className="btn btn-danger disabled" onClick={this.onEnd}>End Session</button>
                      }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p>Change current stream:</p>
                      <form onSubmit={this.onSubmit} className="form-inline">
                        <div className="form-group">
                          <input name="track" className="form-control" required />
                        </div>
                        {session.active ? <button style={{marginLeft:10}} type="submit" className="btn btn-primary disabled">Update Stream</button> : <button style={{marginLeft:10}}  type="submit" className="btn btn-primary">Update Stream</button>
                        }
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <h3>Last 6 Tweets:</h3>
                  <hr/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    {this.props.tweets && this.props.tweets.slice(0,6).map(tweet => (
                      <div key={tweet.id} className="col-md-6">
                        <Tweet tweet={tweet} />
                      </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }

  dispatchTPM() {
      const TPM = caculateTPM(this.props.tweetCount, this.props.session)
      this.props.addSample({TPM: TPM, time: Date.now()})
    }

  onStart() {
    this.props.socket.emit('activate')
    this.props.start()

    // activate tweets per minute tracking
    window.loggingInterval = setInterval(this.dispatchTPM, 5000)
  }

  onEnd() {
    this.props.socket.emit('stop')
    this.props.end()
    this.seconds = 0

    // ends tweets per minute tracking
    clearInterval(window.loggingInterval)
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.socket.emit('switch', event.target.track.value)
    this.props.changeTopic(event.target.track.value)
  }

}

function caculateTPM(tweetCount, session) {
  return Math.round(tweetCount / (((session.current - session.start)/1000)/60))
}

function dispatchTPM(actionCreator, tweetCount, session) {
  actionCreator(caculateTPM(tweetCount, session))
}


/* --------------------------- HOME CONTAINER -------------------------- */

const mapStateToProps = state => {
  return {tweetCount: state.tweetCount,
          tweets: state.tweets,
          session: state.session,
          socket: state.socket}
}

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(start()),
  end: () => dispatch(end()),
  addSample: sample => dispatch(addSample(sample)),
  changeTopic: topic => dispatch(changeTopic(topic))
})

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeContainer
