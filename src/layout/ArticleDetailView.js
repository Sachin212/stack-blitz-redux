import React from 'react';
import axios from 'axios';
import { Card } from 'antd';
import * as Host_IP from '../Host';
import { connect } from 'react-redux';
import CustomForm from '../components/Form';

class ArticleDetail extends React.Component{

    state={
        article: {}
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.token !== prevState.token){
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: nextProps.token
            }
            const articleID = this.props.match.params.articleID
            axios.get(`${Host_IP}/api/${articleID}`)
                .then(res =>{
                    return{
                        article: res.data
                    }
                })
        }
    }

    handleDelete = (event) => {
        if(this.props.token !== null){
            const articleID = this.props.match.params.articleID;
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: this.props.token
            }
            axios.delete(`${Host_IP}/api/${articleID}`);
            this.forceUpdate();
            this.props.history.push('/');
            //WE should use redux here instead of forceupdate
        }else {
            //Some Code
        }
        
        
    }

    render(){
        return(
            <div>
                <Card title={this.state.article.title}>
                    <p>{this.state.article.content}</p>
                </Card>
                <CustomForm
                    requestType="put"
                    articleID={this.props.match.params.articleID}
                    buttonText="Update" />
                <form onSubmit={this.handleDelete}>
                    <button type="submit">Delete</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.token
    }
}

export default connect(mapStateToProps)(ArticleDetail);