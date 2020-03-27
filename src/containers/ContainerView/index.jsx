import React, {Component, Fragment} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom' //路由组建
import {connect} from 'react-redux'//状态管理
//自定义文件
import MainView from '../MainView'
import Login from '../../page/Login'
import './index.scss'

class ContainerView extends Component {//继承Component
    constructor(props) {
        super(props)//继承props
        this.state = {}
    }
    componentDidMount() {//组建挂载完成
    }
    componentWillReceiveProps(nextProps) {  // 属性props改变时候触发
    }
    //dom更新过滤
    shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
        return true;
    }
    render() {
        const { ...param} = this.props; //param 主要是路由参数
        if (this.props.user) {//已登陆
            return (
                <Fragment>
                    <MainView {...param}></MainView>
                </Fragment>
            )
        } else {//未登陆
            return (
                <div className='loading'>
                    <Route {...param} render={props => React.createElement(Login, props)}></Route>
                </div>
            );
        }
    }
}
const mapStateToProps = (state) => {//值映射到props中
    return {
        user:state.user
    }
}
const mapDispatchToProps = (dispatch) => {//setStore方法映射到props中
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(ContainerView);
