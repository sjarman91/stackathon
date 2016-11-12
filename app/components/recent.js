import React, { Component } from 'react';
import { connect } from 'react-redux'


class RecentTweets extends Component {

  render() {
    const { tweets } = this.props
    console.log('rendering Recent')

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>100 Most Recent Tweets</h1>
            </div>
            <div className="col-md-4">
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-12">
              <h4>Latest 100 Tweets:</h4>
            </div>
          </div>
          <div className="row">
            {tweets && tweets.map(tweet => {
              return (
                <div className="col-md-3" key={tweet.id}>
                  <p>{tweet.user} - {tweet.userPop} followers</p>
                  <p>Text: {tweet.text}</p>
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
