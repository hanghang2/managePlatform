import React, {Component} from 'react'
import {Link} from 'react-router-dom' //路由组建
import {connect} from 'react-redux'

//自定义文件
import './index.scss'
import {Pagination} from '../../componens/Page'

class FacialInformation  extends Component{//继承Component
    constructor(props){
        super(props)//继承props
        let initData = this.props.pageData ? JSON.parse(JSON.stringify(this.props.pageData)) : false;
        this.state = initData || {
            inputValue:'',
            selectValue:''
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
            <div className='FacialInformation'>
                FacialInformation1

                <input type="text" value={this.state.inputValue} onChange={this.setInput} placeholder="搜素哦"/>
                <select name="" id="" value={this.state.selectValue} onChange={this.setSelect}>
                    <option value="1">12</option>
                    <option value="2">223</option>
                </select>
                <div style={{marginTop:'20px'}}>
                    <Pagination pageSize={10} allNum={308}></Pagination>
                </div>
            </div>
        )
    }
    setInput = (e)=>{
        this.setState({inputValue:e.target.value})
    }
    setSelect = (e)=>{
        this.setState({selectValue:e.target.value})
    }
    componentWillUnmount() {//组建卸载
        this.props.setPageData(this.state);
    }
}

const mapStateToProps = (state) => {//值映射到props中
    return {
        pageData: state.pageData.FacialInformation || false
    }
}
const mapDispatchToProps = (dispatch) => {//setStore方法映射到props中
    return {
        setPageData(data){
            return dispatch({
                type:'SET_pageData',
                attr:'FacialInformation',
                data:data
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FacialInformation)
