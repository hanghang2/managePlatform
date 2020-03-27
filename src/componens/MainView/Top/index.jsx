import React, {Component} from 'react'
import {} from 'react-router-dom' //路由组建
import {} from 'react-redux'
//自定义文
import './index.scss'
import {connect} from "react-redux";

class Top extends Component {//继承Component
    constructor(props) {
        super(props)//继承props
        this.state = {}
    }

    componentDidMount() {//页面加载完成
    }

    componentWillReceiveProps(nextProps) {  // 属性props改变时候触发
    }

    //dom更新过滤
    shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
        return true;
    }

    render() {
        return (
            <div className="MainView-top" style={this.props.rightHead}>
                <div className="MainView-top-item margin20">
                            <span className="MainView-top-item-showMenu" onClick={this.props.showMenuFun}>
                                {this.props.showMenu ? '←' : '→'}
                            </span>
                </div>
                <div className="MainView-top-item">
                    <input type="text" placeholder="搜素..." style={this.props.rightHead}/>
                </div>
                <div className="MainView-top-item right">
                            <span className="MainView-top-item-message"
                                  onClick={
                                      () => {
                                          this.props.setVal({showMessage: true})
                                  }}>消息</span>
                </div>
                <div className="MainView-top-item right">
                            <span className="MainView-top-item-message"
                                  onClick={() => {
                                      this.props.setVal({showStyle: true})
                                  }}>Style</span>
                </div>
                <div className="MainView-top-item right">
                            <span className="MainView-top-item-message"
                                  onClick={() => {
                                      this.props.setUser('');
                                  }}>退出登录</span>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {//值映射到props中
    return {
    }
}
const mapDispatchToProps = (dispatch) => {//setStore方法映射到props中
    return {
        setUser:(user)=>{
            return dispatch({
                type:'SET_user',
                data:user
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Top)
