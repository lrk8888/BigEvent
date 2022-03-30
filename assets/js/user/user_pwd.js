/*
 * @Author: your name
 * @Date: 2021-08-31 09:56:58
 * @LastEditTime: 2022-03-30 13:06:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /BigEvent/assets/js/user/user_pwd.js
 */
$(function() {
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                    // 重置表单 reset() 方法
                    //只能通过原生的form DOM 对象来进行调用
                    //使用 jQuery 是无法进行调用的
                    //先通过 jQuery 方式拿到表单对象
                    //再通过 [0] 的方式把一个 jQuery 对象转换成原生的 DOM 对象
                $('.layui-form')[0].reset()
            }
        })
    })
})