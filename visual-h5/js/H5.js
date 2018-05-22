/*内容管理对象 */

var H5 = function () {
    this.id = ('h5_' + Math.random()).replace('.', '_');
    this.el = $('<div class="h5" id="' + this.id + '"></div>').hide();
    this.page = [];
    $('body').append(this.el);

    /**
     * 新增一个页
     * @param {*} name 组件的名称，会加入到ClassName中
     * @param {*} text text 页内的默认文本
     * @return {H5} H5对象，可以重复使用H5对象支持的方法
     */
    this.addPage = function(name,text) {
        var page = $('<div class="h5_page section"></div>');

        if (name != undefined) {
            page.addClass('h5_page' + name)
        }
        if (text != undefined) {
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);
        return this;
    };

    // 新增一个组件
    this.addComponent = function(name,cfg) {
        var cfg = cfg || {};
        cfg = $.extend({ // 如果cfg什么都没传，加一个默认为base的type
            type:'base'
        },cfg);
        
        var component; // 定义一个变量，存储组件元素
        var page = this.page.slice(-1)[0];
        switch (cfg.type) {
            case 'base':
                component = new H5ComponentBase(name,cfg);
                break;
            default:
                break;
        }
        page.append(component);

        return this;
    };

    // h5对象初始化呈现
    this.loader = function() {
        this.el.fullpage({
            onLeave:function(index,nextIndex,direction) {
                    $(this).find('.h5_component').trigger('onLeave');
                },// 当当前页面离开触发
            afterLoad: function (anchorLink, index) { 
                $(this).find('.h5_component').trigger('onLoad');
            },// 当第二个页面载入完成触发
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
    };

    return this;
};