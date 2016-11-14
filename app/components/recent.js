import React, { Component } from 'react';
import { connect } from 'react-redux'
import Tweet from './tweet.js'


class RecentTweets extends Component {

  render() {
    const { tweets } = this.props
    console.log('rendering Recent')

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>99 Most Recent Tweets</h1>
            </div>
            <div className="col-md-4">
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-12">
              <h4>Latest 99 Tweets:</h4>
            </div>
          </div>
          <div className="row">
            {tweets && tweets.map(tweet => {
              return (
                <div key={tweet.id} className="col-md-4">
                  <Tweet tweet={tweet} />
                </div>
                )
              })
            }
          </div>
        </div>
    )
  }
}


const mapStateToProps = state => ({tweets: state.tweets})

const TweetContainer = connect(mapStateToProps)(RecentTweets)

export default TweetContainer
