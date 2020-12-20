import {useEffect} from 'react';
import BaseRouter from './route';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import CustomLayout from './layout/layout';
import * as actions from './store/actions/auth';

import { connect } from 'react-redux';

function App(props) {

  useEffect (() =>{
    props.onTryAutoSignup();
  }, [props]);

  return (
    <div>
      <Router>
        <CustomLayout {...props}>
          <BaseRouter />
        </CustomLayout>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
