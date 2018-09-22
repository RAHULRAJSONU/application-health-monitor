import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DataGrid from './Grid';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const urlLists = [
  {app:"Application1",url:'/health/up'},
  {app:"Application2",url:'/health/up'},
  {app:"Application3",url:'/health/down'},
  {app:"Application4",url:'/health/up'},
  {app:"Application5",url:'/health/down'},
  {app:"Application6",url:'/health/up'},
  {app:"Application7",url:'/health/down'},
  {app:"Application8",url:'/health/up'},
  {app:"Application9",url:'/health/up'},
  {app:"Application10",url:'/health/up'},
  {app:"Application11",url:'/health/down'},
  {app:"Application12",url:'/health/up'}];

class Dashboard extends Component {

    componentDidMount(){
      console.log(urlLists);
      this.props.onFetchResponseList(urlLists);
    }

    render(){
        const { classes } = this.props;
        return (
            <React.Fragment>
              <CssBaseline />
              <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                  <CameraIcon className={classes.icon} />
                  <Typography variant="title" color="inherit" noWrap>
                    Application Health Monitor
                  </Typography>
                </Toolbar>
              </AppBar>
              <main>
                {/* Hero unit */}
                <div className={classNames(classes.layout, classes.cardGrid)}>
                  {/* End hero unit */}
                  <DataGrid data={this.props.responseList}/>
                </div>
              </main>
              {/* Footer */}
              <footer className={classes.footer}>
                <Typography variant="title" align="center" gutterBottom>
                  Footer
                </Typography>
                <Typography variant="subheading" align="center" color="textSecondary" component="p">
                  Something here to give the footer a purpose!
                </Typography>
              </footer>
              {/* End footer */}
            </React.Fragment>
          );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    responseList: state.healthFetch.responseList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchResponseList: (urlList) => dispatch(actions.fetchHealth(urlList))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));