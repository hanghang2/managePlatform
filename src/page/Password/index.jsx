import React, {Component} from 'react'
import {Link} from 'react-router-dom' //路由组建
import {connect} from 'react-redux'

//自定义文件
import './index.scss'

class Password  extends Component{//继承Component
    constructor(props){
        super(props)//继承props
        let initData = this.props.pageData ? JSON.parse(JSON.stringify(this.props.pageData)) : false;
        this.state = initData || {
            inputValue:'',
            oldInputValue:'',
            list:[]
        };
    }
    componentDidMount(){//组建挂载完成
        this.t = setTimeout(()=>{
            this.setState({list:['react','react-router4.x','redux','react-redux','redux-thunk','axios','sass','http-proxy-middleware','yarn']});
        },1000)
    }
    componentWillReceiveProps(nextProps) {  // 属性props改变时候触发
    }
    //dom更新过滤
    shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
        return true;
    }
    render(){
        return (
            <div className='Password'>
                <div>
                    <span>新密码：</span>
                    <input type="text" value={this.state.inputValue} onChange={this.setInput} placeholder='请输入新密码' />
                </div>
                <div>
                    <span>旧密码：</span>
                    <input type="text" value={this.state.oldInputValue} onChange={this.setOldInput} placeholder='请输入旧密码'/>
                </div>
                <ul>
                    {
                        this.state.list.map((item,index)=>{
                            return <li key={index}>{index+1}、{item}</li>;
                        })
                    }
                </ul>
            </div>
        )
    }
    setInput = (e)=>{
        this.setState({inputValue:e.target.value})
    }
    setOldInput = (e)=>{
        this.setState({oldInputValue:e.target.value})
    }
    componentWillUnmount() {//组建卸载
        clearTimeout(this.t);
        this.props.setPageData(this.state);
    }
}

const mapStateToProps = (state) => {//值映射到props中
    return {
        pageData: state.pageData.Password || false
    }
}
const mapDispatchToProps = (dispatch) => {//setStore方法映射到props中
    return {
        setPageData(data){
            return dispatch({
                type:'SET_pageData',
                attr:'Password',
                data:data
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Password)
