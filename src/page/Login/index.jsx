import React, {Component} from 'react'
import {Link} from 'react-router-dom' //路由组建
import {connect} from 'react-redux'

//自定义文件
import './index.scss'

class Login  extends Component{//继承Component
    constructor(props){
        super(props)//继承props
        this.state = {
            user:'',pasw:''
        };
    }
    componentDidMount(){//组建挂载完成
    }
    componentWillReceiveProps(nextProps) {  // 属性props改变时候触发
    }
    //dom更新过滤
    shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
        return true;
    }
    render(){
        return (
            <div className='Login'>
                <input type="text" value={this.state.user} placeholder="用户名" onChange={this.setUser} /> <br/>
                <input type="text" value={this.state.pasw} placeholder="密码" onChange={this.setPsw} /> <br/>
                <button onClick={this.login}>login</button>
            </div>
        )
    }
    setUser = (e)=>{
        this.setState({
            user:e.target.value
        })
    }
    setPsw = (e)=>{
        this.setState({
            pasw:e.target.value
        })
    }
    login = ()=>{
        if(this.state.user && this.state.pasw){
            this.props.setUser(this.state.user);
        }else{
            alert('用户名密码都不能为空');
        }
    }
}

const mapStateToProps = (state) => {//值映射到props中
    return {
        user: state.user
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
export default connect(mapStateToProps,mapDispatchToProps)(Login)
