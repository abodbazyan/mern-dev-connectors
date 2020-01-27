import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '3e95ef6ebbf4463f8643',
      clientSecret: '7a53660f209ef1b8a04cf05f8cd6597530296f1c',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}$client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.githubRef) {
          this.setState({ repos: data });
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map(el => (
      <div className="card card-body mb-2" key={el.id}>
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link
                className="text-info"
                to={el.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {el.name}
              </Link>
            </h4>
            <p>{el.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {el.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {el.watchers_count}
            </span>
            <span className="badge badge-success mr-1">
              Forks: {el.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref="githubRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
