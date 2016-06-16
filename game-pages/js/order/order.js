/**
 * Created by zh.l.y on 2016/6/16.
 */

var STATUS = {
    'SUCCESS': '成功',
    'ERROR':'失败'
};

var ORDER_ITEM_HTML = $("#order-item").html();
var ORDER_ITEM_TPL = Handlebars.compile(ORDER_ITEM_HTML);


var list = [
    {
        orderNo:'123456799',
        dealTime:'2014-12-23 12:34:45',
        name:'萨满祭司可以作为治疗者和伤害输出出现在游戏中',
        price:500,
        count:1,
        userName:'张三李四',
        discount:50,
        status:'success',
        totalPrice:'450',
        reChargeAccount:'萨满教',
        payType:'weChat',
        payTime:'2014-12-23 12:34:45',
        discountDetail:'买十送一',
        mark:'萨满祭司是自己部落和氏族的精神领袖。他们是操纵元素的大师,既能引导能量摧毁敌人,也能汇聚法力增强队友。在各种图腾的帮助下,萨满能凝聚不羁元素的能量',
        orderType:'game',

    }
];



var Order = baseClass(function(opts){

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
            html += ORDER_ITEM_TPL(v);
        });

        $("#orderList").empty().append(html);
    },

    initEvents: function(){
        var me = this;

        $('#orderList', $(me.opts.container)).on('click', '.showDetail', me.showDetail);

    },

    showDetail: function(){

        var obj = $(this);

        if(obj.hasClass('fa-caret-square-o-down')){
            obj.removeClass('fa-caret-square-o-down').addClass('fa-caret-square-o-up');
            obj.closest('.order-item').find('.order-detail').show();
        }else{
            obj.removeClass('fa-caret-square-o-up').addClass('fa-caret-square-o-down');
            obj.closest('.order-item').find('.order-detail').hide();
        }

    },

    destroy: function(){}

});