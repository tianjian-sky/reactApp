# React 组件中的this.props.children

### 1. 表示一个组件的字节点（有点像插槽 slot 的概念），一定要在夫节点中插入的才可以被访问到。 

e.g.  
父亲组件 

``` javascript
...
 render () {
    return (
        <div className="customizeInqListPage" id="customizeInqListPage-0">
            <div className="toolBanner">
                <a className="btnCreateInq btnTheme1" id="btnCreateInq-0" onClick={() => this.handleCreateInq(true)}>+创建问诊单</a>
                <label className="info">已创建问诊单  {this.props.inquiryList ? this.props.inquiryList.length : 0} 张</label>
            </div>
            <div className="main" id="customizeInqListPageMain-0">
                <InqListContainerRR>
                    <span>这里是问诊单列表容器</span>
                    <span>这里是问诊单列表容器 slot 2</span>
                </InqListContainerRR>
            </div>
            {this.state.showCrateInqDialog ? <InqCreateDialogRR handleCreateInq={this.handleCreateInq}/> : ''}
        </div>
    )
}
...

```
子组件:  

``` javascript 
class InqListContainer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

        }
        this.child = {}
        this.cacheListComp = []
        this.getInqList()
        console.log('###', this.props) // array(2)
    }
    ...
}
```

### 2. children的渲染（借助React.Children.map(this.props.children()) 
``` javascript
 render = () => {
    ...
    return  (
        <ul className="inqList" id="inqList-0" ref={(d)=>{this.selfDom = d}} refs="listContainer">
            {lists}
            { React.Children.map(this.props.children, function (a, b, c) {
                console.log('React.children arguments:', a, b, c)
                return <li>{a}</li>;
            })}
        </ul>
    )
}
```

### 3. React.children 全局api (提供对this.props.children数据结构进行处理的一些工具api) 
> React.Children.map  
> React.Children.forEach  
> React.Children.count  
> React.Children.toArray  
> ... 

[参考](https://reactjs.org/docs/react-api.html)