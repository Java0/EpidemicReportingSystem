
var validatePass = function(rule, value, callback){
    if (value === '') {
        callback(new Error('请输入单位'));
    } else {
        callback();
    }
};
function formatColumn(h, { column, $index }){
    return h('span',[
        h('span',column.label),
        h('i', {
            class:'el-icon-search',
            style:'color:#409eff;margin-left:5px;cursor:pointer',
            on:{
                click:function(){column.property}
            }
        })
    ]);
}
var columnData=[{
    label: '序号',
    prop: 'rownum_',
    span: 24,
    align:'center',
    width:80
  },{
    sortable:'custom',
    label: '用户姓名',
    prop: 'yhmc',
    span: 24,
    align:'left',
    width:160,
    rules: [{
        required: true,
        message: "请输入姓名",
        trigger: "blur"
    },{ 
        min: 3,
        max: 5,
        message: '长度在 3 到 5 个字符',
        trigger: 'blur' 
    }],
    renderHeader: formatColumn
},
{
    label: '单位名称',
    prop: 'dwmc',
    align:'left',
    width:200,
    span: 24,
    renderHeader: formatColumn
},
{
    label: '单位编码',
    prop: 'dwbm',
    align:'left',
    span: 24,
    width:160,
    rules: [{
        validator: validatePass,
        trigger: "blur"
    }],
    renderHeader: formatColumn
},
{
    sortable:'custom',
    type:"date",
    label: '时间',
    prop: 'firsttime',
    width:100,
    span: 24,
    renderHeader: formatColumn
},
{
    sortable:'custom',
    type:"date",
    label: '时间',
    prop: 'firsttime',
    width:100,
    span: 24,
    renderHeader: formatColumn
},
{
    sortable:'custom',
    type:"date",
    label: '时间',
    prop: 'firsttime',
    width:100,
    span: 24,
    renderHeader: formatColumn
},
{
    sortable:'custom',
    type:"date",
    label: '时间',
    prop: 'firsttime',
    width:100,
    span: 24,
    renderHeader:formatColumn
},
{
    sortable:'custom',
    type:"date",
    label: '时间',
    prop: 'firsttime',
    width:100,
    span: 24,
    renderHeader:formatColumn
},
{
    sortable:'custom',
    type:"date",
    label: '时间',
    prop: 'firsttime',
    width:100,
    span: 24,
    renderHeader:formatColumn
},
{
    sortable:'custom',
    type:"date",
    label: '时间',
    prop: 'firsttime',
    width:100,
    span: 24,
    renderHeader:formatColumn
},
{
    sortable:'custom',
    type:"date",
    label: '时间',
    prop: 'firsttime',
    width:100,
    span: 24,
    renderHeader: formatColumn
},
{
    sortable:'custom',
    type:"date",
    label: '时间',
    prop: 'firsttime',
    width:100,
    span: 24,
    renderHeader: formatColumn
},
{
    sortable:'custom',
    type:"date",
    label: '时间',
    prop: 'firsttime',
    width:100,
    span: 24,
    renderHeader: formatColumn
},
{
    sortable:'custom',
    type:"date",
    label: '时间',
    prop: 'firsttime',
    width:100,
    span: 24,
    renderHeader: formatColumn
},
{
    sortable:'custom',
    type:"date",
    label: '时间',
    prop: 'firsttime',
    width:100,
    span: 24,
    renderHeader: formatColumn
}
]
export default {  
    columnData  
}  