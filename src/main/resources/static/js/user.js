let index = {
    init: function (){
        $("#btn-join").on("click", ()=>{
            this.join();
        })

    },
    //회원가입 매서드
    join:function (){
        let data = {
            username:$("#username").val(),
            email:$("#email").val(),
            password:$("#password").val()
        }
        $.ajax({
            type:'POST',
            url:"/auth/joinProc",
            data: JSON.stringify(data),
            contentType:"application/json; charset=utf-8",
            dataType: "json"
        }).done(function (res) {
            if (res.status === 500){
                alert("회원가입에 실패했습니다.")
            }else {
                alert("회원가입이 완료되었습니다.")
                location.href= "/"
            }
        }).fail(function (error) {
            alert("회원가입에 실패했다.")
        });
    }
}
index.init();