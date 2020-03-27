import React, {Component, Fragment} from 'react'
import {Redirect, Route, Switch} from "react-router-dom";

import routePath from './routePath'
import {connect} from "react-redux";
import NotFound from '../page/NotFound'

class mainPage extends  Component {
    constructor(props){
        super(props)
        this.state={};
    }
    componentWillReceiveProps(nextProps) {  // 属性props改变时候触发

    }
    componentDidUpdate(prevProps, prevState, snapshot) {//页面更新渲染完
        if(this.props.pathArr != prevProps.pathArr){
            // pathArr(打开页面路径集合)如果减少那就把状态管理中减少的 页面数据清空
            prevProps.pathArr.map((item,index)=>{
                if(this.props.pathArr.indexOf(item) === -1){
                    let pageDataAttr = item.slice(1);//获取页面状态管理数据属性
                    //清楚清楚数据必须在页面卸载后(必须放在组件[route]更新完的生命周期)
                    this.props.clearPageData(pageDataAttr);//清除数据
                }
                return item;
            })
        }
    }
    componentDidMount() {//组建挂载完
        this.props.routeObj(this.props.history)//把路由对象给父组件
    }
    render() {
        return(
            <Fragment>
                <Switch>
                    {
                        routePath.map((item,index)=>{
                            //sysEvent 操作系统方法传给页面组件
                            return <Route exact path={item.path} render={
                                (props)=>React.createElement(item.component, {...props,sysEvent:this.props.sysEvent})
                            } key={item.path}/>
                        })
                    }
                    <Route exact path="/" render={()=>(
                        <Redirect to="/Index" />
                    )} />
                    <Route component={NotFound}/>
                </Switch>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {//值映射到props中
    return {}
}
const mapDispatchToProps = (dispatch) => {//setStore方法映射到props中
    return {
        clearPageData(pageDataAttr){
            return dispatch({
                type:'SET_pageData',
                attr:pageDataAttr,
                data:0//页面关闭生命周期不再 set_pageData
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(mainPage)
