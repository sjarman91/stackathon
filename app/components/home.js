import React, { Component } from 'react';
import { connect } from 'react-redux'
import { start, end, addSample } from '../reducers/session.js'


/* --------------------------- HOME COMPONENT -------------------------- */

class Home extends Component {

  constructor(props) {
    super(props)
    this.onStart = this.onStart.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.dispatchTPM = this.dispatchTPM.bind(this)
    this.seconds = 0;
  }

  render() {
    const { tweetCount, tweets, session } = this.props
    let tweetsPerMinute = 0
    if(tweetCount) { tweetsPerMinute = caculateTPM(tweetCount, session) }

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Twitter Stream Manager</h1>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12">
                  <form onSubmit={this.onSubmit} className="form-inline">
                    <div className="form-group">
                      <label>New Track:</label>
                      <input name="track" className="form-control" required />
                    </div>
                    {session.active ? <button type="submit" className="btn btn-primary disabled">Switch Tracks</button> : <button type="submit" className="btn btn-primary">Switch Tracks</button>
                    }
                  </form>
                </div>
                <div className="col-md-12">
                  {session.active ? <button type="button" style={{marginTop:10}} className="btn btn-primary disabled" onClick={this.onStart}>Start Session</button> : <button type="button" style={{marginTop:10}} className="btn btn-primary" onClick={this.onStart}>Start Session</button>
                  }
                  {session.active ? <button type="button" style={{marginLeft:10, marginTop:10}} className="btn btn-danger" onClick={this.onEnd}>End Session</button> : <button type="button" style={{marginLeft:10, marginTop:10}} className="btn btn-danger disabled" onClick={this.onEnd}>End Session</button>
                  }
                </div>
              </div>
            </div>
          </div>
          <hr/>


          <div className="row">
            <div className="col-md-6">
              <h2>Tweet Volume</h2>
              <hr/>
            </div>
            <div className="col-md-6">
              <h2>Last 5 Tweets:</h2>
              <hr/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>Tweets processed: {tweetCount}</p>
              <p>Tweets per Minute: {tweetsPerMinute}</p>
            </div>
            <div className="col-md-6">
              {this.props.tweets && this.props.tweets.slice(0,5).map(tweet => (<p key={tweet.id}>{tweet.text}</p>))}
            </div>
          </div>
        </div>
    )
  }

  dispatchTPM() {
      const TPM = caculateTPM(this.props.tweetCount, this.props.session)
      this.seconds = this.seconds + 15
      this.props.addSample({TPM: TPM, seconds: this.seconds})
    }

  onStart() {
    this.props.socket.emit('activate')
    this.props.start()

    // activate tweets per minute tracking
    window.loggingInterval = setInterval(this.dispatchTPM, 15000)
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
  addSample: sample => dispatch(addSample(sample))
})

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeContainer
