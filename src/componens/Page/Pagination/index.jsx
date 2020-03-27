import React, {Component} from 'react'
//自定义文
import './index.scss'
class Pagination  extends Component {//继承Component
    constructor(props){
        super(props)//继承props
        this.state = {
            pageNum:1 //当前页
        }
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
        let {allNumShow,pageNumSelectShow,pageGoShow,allNum,pageSize} = this.props;
        let allPage = Math.ceil(allNum/pageSize);
        let pageList = this.getPageList(allPage,this.state.pageNum);//显示的页数
        return (
            <div className='page-Pagination'>
                {allNumShow ? (<div className="allNum">共 {allNum} 条</div>) : ''}
                {pageNumSelectShow ? <div className="pageNumSelect">{pageSize}条/页</div> : ''}
                <div className="pageList">
                    <p onClick={this.prevPage}>&lt;</p>
                    {
                        pageList.map((item,index)=>{
                            return (
                                <li key={item} onClick={this.goPage.bind(this,item)}
                                    className={this.state.pageNum == item ? 'active':'' + (item == 'next' ? 'next' : (item == 'prev' ? 'prev' : ''))}>
                                    {item == 'next' ? '' : (item == 'prev' ? '' : item)}
                                </li>
                            );
                        })
                    }
                    <p onClick={this.nextPage}>&gt;</p>
                </div>
                {pageGoShow ? (<div className="pageGo">
                    前往 <input type="text" className='inputGo'/> 页
                </div>) : ''}
            </div>
        )
    }
    goPage(item){
        if(item == 'next'){

        }else if(item == 'prev'){

        }else{
            this.setState({pageNum:item})
        }
    }
    prevPage = ()=>{

    }
    nextPage = ()=>{

    }
    getPageList = (allPage,num)=>{//显示页数处理
        let pageList = [];
        if(allPage > 5){
            if(num - 4 > 0){//确定是中间三位
                pageList = [1,'prev',num - 2,num - 1,num]
                if(num + 3 < allPage){//确定是中间五位
                    pageList = [...pageList,num + 1,num + 2,'next',allPage];
                }else{//确定是最后五位
                    pageList = [1,'prev',allPage - 4,allPage - 3,allPage - 2,allPage - 1,allPage];
                }
            }else{//确定是开始五位
                pageList = [1,2,3,4,5,'next',allPage];
            }
        }else{//确定是五位以内
            pageList = [...Array(allPage).keys()]
        }
        return pageList;
    }
}
export default Pagination ;
