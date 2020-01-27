import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { education, experience } = this.props;

    const expItems = experience.map(el => (
      <li className="list-group-item" key={el._id}>
        <h4>{el.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{el.from}</Moment> -{' '}
          {el.current ? (
            'Still working'
          ) : (
            <Moment format="YYYY/MM/DD">{el.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position: </strong>
          {el.title}
        </p>
        <p>
          {el.location === '' ? null : (
            <span>
              <strong>Location: </strong>
              {el.location}
            </span>
          )}
        </p>
        <p>
          {el.description === '' ? null : (
            <span>
              <strong>Description: </strong>
              {el.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(el => (
      <li className="list-group-item" key={el._id}>
        <h4>{el.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{el.from}</Moment> -{' '}
          {el.current ? (
            'Still studying'
          ) : (
            <Moment format="YYYY/MM/DD">{el.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree: </strong>
          {el.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {el.fieldOfStudy}
        </p>
        <p>
          {el.description === '' ? null : (
            <span>
              <strong>Description: </strong>
              {el.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
