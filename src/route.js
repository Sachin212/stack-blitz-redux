import React from 'react';
import { Route } from 'react-router-dom';
import ArticleList from './layout/ArticleListView';
import ArticleDetail from './layout/ArticleDetailView';
import Login from './components/Login';
import Signup from './components/Signup';

const BaseRouter = () =>(
    <div>
        <Route exact path='/' component={ArticleList} />
        <Route exact path='/articles/:articleID' component={ArticleDetail} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup/' component={Signup} />
    </div>
)

export default BaseRouter;
