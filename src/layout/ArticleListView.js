import React from 'react';
import Articles from '../components/Article';
import axios from 'axios';
import * as Host_IP from '../Host';
import {connect} from 'react-redux';
import CustomForm from '../components/Form';

class ArticleList extends React.Component{

    state={
        articles: []
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.token !== prevState.token){
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: nextProps.token
            }
            axios.get(`${Host_IP}/api/`)
                .then(res =>{
                    return{
                        article: res.data
                    }
                })
        }
        
    }

    render(){
        return(
            <div>
                <Articles data={this.state.articles} />
                <br></br>
                <h2>Create an Article</h2>
                <CustomForm 
                    requestType="post"
                    articleID={null}
                    buttonText="Create"/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.token
    }
}

export default connect(mapStateToProps)(ArticleList);
