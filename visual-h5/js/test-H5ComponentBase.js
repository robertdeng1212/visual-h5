/*基本图文组件对象*/

var H5ComponentBase = function(name,cfg) {
    var cfg = cfg || {}; // 逻辑或短路运算 找真
    var id = ('h5_c_' + Math.random()).replace('.', '_'); // 唯一id标识符

    // 把当前的组件类型添加到样式中进行标记
    var cls =' h5_component_' + cfg.type;
    var component = $('<div class="h5_component ' + cls + ' h5_component_name_' + name + '" id="' + id + '"></div>');

    cfg.text && component.text(cfg.text); // 逻辑与短路运算 找假
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);

    cfg.css && component.css(cfg.css);
    cfg.bg && component.css('backgroundImage', 'url(' + cfg.bg+ ')')

    if (cfg.center) {
        component.css({
            marginLeft: (cfg.width/4 * -1) + 'px',
            left:'50%'
        })
    }
    // ... 很多自定义的参数

    component.on('onLoad', function () {
        component.addClass(cls + '_load').removeClass(cls + '_leave'); // 移除onLeave事件
        cfg.animateIn && component.animate(cfg.animateIn);
        return false; // 阻止事件冒泡
     })

     component.on('onLeave', function () {
        component.addClass(cls + '_leave').removeClass(cls + '_load'); // 移除onLoad
        cfg.animateOut && component.animate(cfg.animateOut);
        return false; // 阻止事件冒泡
     })

    return component;
};