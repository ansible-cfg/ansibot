/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Request from 'superagent-bluebird-promise';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Form.css';
import { TextField, RaisedButton, List, ListItem } from 'material-ui';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Username',
      password: 'Password',
      filesRemote: '\\\\192.168.10.6\\devops\\dev-machine',
      filesRoot: '',
    };
    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleFilesRemote = this.handleFilesRemote.bind(this);
    this.handleFilesRoot = this.handleFilesRoot.bind(this);
  }

  handleUser(event) {
    this.setState({ user: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleFilesRemote(event) {
    this.setState({ filesRemote: event.target.value });
  }

  handleFilesRoot(event) {
    this.setState({ filesRoot: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submitting...');
    console.log(this.state);
    Request.post('http://localhost:3000/submit')
      .set('Accept', 'application/json')
      .send(this.state)
      .query({ format: 'json' })
      .then(
        res => {
          console.log('Submit successful');
        },
        error => {
          console.log(`Error! ${error}`);
        },
      );
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                id="host"
                floatingLabelText="Host IP"
                value={this.props.currentIpAddress}
                disabled
              />
            </div>
            <div>
              <TextField
                id="user"
                onChange={this.handleUser}
                floatingLabelText="Username"
                required
              />
            </div>
            <div>
              <TextField
                id="password"
                onChange={this.handlePassword}
                floatingLabelText="Password"
                type="password"
                required
              />
            </div>
            <div>
              <TextField
                id="filesRemote"
                onChange={this.handleFilesRemote}
                floatingLabelText="Host Files Directory"
                defaultValue="\\192.168.10.6\devops\dev-machine"
              />
            </div>
            <div>
              <TextField
                id="password"
                onChange={this.handleFilesRoot}
                floatingLabelText="Host Files Root"
                value={`C:\\Users\\${this.state.user}\\Downloads\\`}
              />
            </div>
            <div>
              <RaisedButton type="submit" label="Provision" primary />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Form);
