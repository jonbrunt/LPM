// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Fuse from 'fuse.js';

import { setRepo } from '../../actions/preferences';
import { getRepoList } from '../../actions/api';
import { initialLoad } from '../../actions/misc';

import Student from './Student';
import Gauges from './Gauges/Gauges';
import AddStudent from './AddStudent';
import styles from './Home.css';

type Props = {};

type repoType = { id: number, label: string, value: string };

type optionsType = Array<repoType>;

class Content extends Component<Props> {
  constructor(props) {
    super(props);

    this.scrollTarget = React.createRef();
    this.page = React.createRef();
  }

  state = {
    repoName: ''
  };

  componentDidMount() {
    const {
      getRepoList: getRepoListAction,
      initialLoad: initialLoadAction
    } = this.props;
    getRepoListAction();
    initialLoadAction();
  }

  filterOptions = (options: optionsType, filter: string) => {
    const fuseOptions = {
      shouldSort: false,
      tokenize: false,
      findAllMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: ['label']
    };
    const fuse = new Fuse(options, fuseOptions);
    return fuse.search(filter);
  };

  onChange = e => {
    const { setRepo: setRepoAction } = this.props;
    this.setState({ repoName: e.label });
    setRepoAction(e.value);
  };

  render() {
    const { students, repo, repoList } = this.props;
    const { repoName } = this.state;

    console.log('REPO PROP, ', repo);

    return (
      <div className={styles.container}>
        <div className={styles.content} ref={this.page}>
          <div className={styles.repoContainer}>
            <Select
              classNamePrefix="repo"
              name="repo-selector"
              value={repo}
              onChange={this.onChange}
              filterOptions={this.filterOptions}
              options={repoList}
              placeholder={repoName}
            />
          </div>

          <Gauges />

          <div className={styles.students}>
            {students.map(student => (
              <Student key={student.id} {...student} />
            ))}
          </div>

          <div ref={this.scrollTarget} className={styles.scrollTarget} />

          <AddStudent scrollTarget={this.scrollTarget} />
        </div>
      </div>
    );
  }
}

const studentType = PropTypes.shape({
  name: PropTypes.string,
  username: PropTypes.string,
  rating: PropTypes.number
});

Content.propTypes = {
  students: PropTypes.arrayOf(studentType),
  repo: PropTypes.string,
  setRepo: PropTypes.func,
  repoList: PropTypes.arrayOf(PropTypes.object),
  getRepoList: PropTypes.func
};

Content.defaultProps = {
  students: [],
  repo: '',
  repoList: [],
  setRepo: () => {},
  getRepoList: () => {}
};

const mapStateToProps = state => ({
  students: state.students,
  repo: state.preferences.repo,
  repoList: state.api.repoList
});

export default connect(
  mapStateToProps,
  { setRepo, getRepoList, initialLoad }
)(Content);
