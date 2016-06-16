/**
 * Created by zh.l.y on 2016/6/16.
 * base on jQuery
 */
;(function(){
    function _create( target ){
        var ec = $(target);
        $.extend(target, {
            on: function(name, fn){
                ec.on( _getEvtName(name), fn);
                return target;
            },
            once: function(name, fn){
                ec.one( _getEvtName(name), fn);
                return target;
            },
            fire: function(name, fn){
                var arr = Array.prototype.slice.call(arguments, 1);
                arr.unshift( _getEvtName(name) );
                ec.trigger.apply(ec, arr);
                return target;
            },
            off: function(name, fn){
                ec.unbind( _getEvtName(name), fn);
                return target;
            },
            events: function( name ) {
                var jQueryExpando = ec[ 0 ][ $.expando ];
                if ( !jQueryExpando ) {
                    return ;
                }
                var array  = [],
                    events = jQueryExpando.events,
                    rtype  = /^([^.]*)(?:\.(.+)|)$/,
                    tmp    = rtype.exec(_getEvtName(name) ) || [],
                    type   = tmp[ 1 ],
                // jQuery处理方式, 保持一致性;
                    namespaces = ( tmp[2] || "" ).split( "." ).sort().join('.');

                $.each(events[ type ] || [], function() {
                    if ( namespaces === this.namespace ) {
                        array.push( this );
                    }
                });
                return array;
            }
        });

        target.un = target.off;
        target.trigger = target.fire;
        return target;
    }

    function _getEvtName( name ){
        return 'on' + name.replace(/^on/i,'').toLowerCase();
    }

    window.myEvent = _create({});
    window.myEvent.create = _create;


    function baseClass( constructor ){
        var fn = $.isFunction(constructor) ? constructor : function(){
                this.type = 'base';
            },
            base = function(options){
                myEvent.create(this);
                this.guid = ++$.guid;
                fn.apply(this, arguments);
                ('object'==typeof options) && this._init(options);
                this.init(options);
            };

        base.extend = function(option){
            $.extend(base.prototype, option);
            return base;
        };

        return base.extend({
            _init: function(opt){
                var me = this;
                $.each(opt, function(name, item){
                    if(!me[name]){
                        $.isFunction(item) ? me.on(name, item) : me[name] = item;
                    }
                });
            },
            init: function(){},
            render: function( target ){},
            dispose: function(){},
            getElements: function( filter ){ return ;}
        });
    }


    window.baseClass = baseClass;

}());