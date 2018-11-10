<template>
  <div>
    <div class="chat">
        <div class="chat-left">
            <div class="chat-left-top">

            </div>
            <div class="left-scroll">
                <div class="robot-bar active">
                    <div class="robot-icon"></div>
                    <div class="robot-name">Robot 1</div>
                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
                <div class="robot-bar">

                </div>
            </div>
        </div>
        <div class="chat-center">
            <div class="sidebar-left"></div>
            <div class="chet-center-top">

            </div>
            <div class="center-scroll">
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar active">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
                <div class="robot-chat-bar">

                </div>
            </div>

        </div>
        <div class="chat-right">
            <div class="chat-history">
                <div class="chat-target-top">
                    <div style="padding-top: 20px;">小明</div>
                </div>
            </div>
            <div style="width: 710px; border-bottom: 1px solid rgb(214, 214, 214);"></div>
            <div class="chat-sender">
                <div class="edit-area">
                    <div>
                        <span><i class="iconfont icon-biaoqing"></i></span>
                    </div>
                    <textarea name="chat-editer" id="ta-editer" onkeypress="handlerEnter"></textarea>
                </div>
                <div class="send-bt">
                    <span style="font-size: 12px; color: rgb(136, 136, 136);">按下Ctrl+Enter换行</span>
                    <button class="bt-sender">发送</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'Chat',
        data() {
            return {msg: 'Hello'};
        },
        created() {
        },
        methods: {
        },
        computed: {
        },
        components: {
        }
    };
    (function ($) {
            $(window).load(function () {
                $(".left-scroll").mCustomScrollbar({
                    theme: "light-2",
                    scrollInertia: 150
                });
                $(".center-scroll").mCustomScrollbar({
                    theme: "light-2",
                    scrollInertia: 150
                });
            });
        })(jQuery);
</script>
<style>

</style>
