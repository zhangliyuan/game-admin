/**
 * Created by zh.l.y on 2016/6/16.
 */

var STATUS = {
    'SUCCESS': '成功',
    'ERROR':'失败'
};

var UNION_ITEM_HTML = $("#union-item").html();
var UNION_ITEM_TPL = Handlebars.compile(UNION_ITEM_HTML);


var list = [
    {
        unionNo:'123456799',
        name:'众神殿游戏公会',
        peopleCount:2411,
        unionPresident:'隔壁王吴老二让人',
        status:'normal',
        createTime:'2014-12-23 12:34:45',
        rank:564,
        recharge:2345,
        totalRecharge:23452
    },
    {
        unionNo:'123456794',
        name:'众神殿游戏公会',
        peopleCount:2411,
        unionPresident:'隔壁王吴老二让人',
        status:'normal',
        createTime:'2014-12-23 12:34:45',
        rank:564,
        recharge:2345,
        totalRecharge:23452
    }
];



var Union = baseClass(function(opts){

    this.opts = $.extend({
        container:'body'
    },opts);

}).extend({

    init:function(){
        var me = this;

        me.initEvents();
    },
    getData:function(){},
    render: function(){

        var html = '';

        $.each(list, function(i,v){
            html += UNION_ITEM_TPL(v);
        });

        $("#unionList").empty().append(html);
    },

    initEvents: function(){
        var me = this;

        $('#unionList', $(me.opts.container)).on('click', '.showDetail', me.showDetail);

    },

    showDetail: function(){

        var obj = $(this);

        if(obj.hasClass('fa-caret-square-o-down')){
            obj.removeClass('fa-caret-square-o-down').addClass('fa-caret-square-o-up');
            obj.closest('.item').find('.item-detail').show();
        }else{
            obj.removeClass('fa-caret-square-o-up').addClass('fa-caret-square-o-down');
            obj.closest('.item').find('.item-detail').hide();
        }

    },

    destroy: function(){}

});