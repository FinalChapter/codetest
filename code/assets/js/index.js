/**
 * 
 * @authors cherish yii2 (cherish@cherish.pw)
 * @date    2020-12-10 16:48:28
 * @version v1.0
 * @description the core js of todolist project
 * 
 * ━━━━━━神兽出没━━━━━━
 * 　　   ┏┓　 ┏┓
 * 　┏━━━━┛┻━━━┛┻━━━┓
 * 　┃              ┃
 * 　┃       ━　    ┃
 * 　┃　  ┳┛ 　┗┳   ┃
 * 　┃              ┃
 * 　┃       ┻　    ┃
 * 　┃              ┃
 * 　┗━━━┓      ┏━━━┛ Code is far away from bugs with the animal protecting.
 *       ┃      ┃     神兽保佑,代码无bug。
 *       ┃      ┃
 *       ┃      ┗━━━┓
 *       ┃      　　┣┓
 *       ┃      　　┏┛
 *       ┗━┓┓┏━━┳┓┏━┛
 *     　  ┃┫┫　┃┫┫
 *     　  ┗┻┛　┗┻┛
 *
 * ━━━━━━感觉萌萌哒━━━━━━
 */

// 请根据考试说明文档中列出的需求进行作答
// 预祝各位顺利通过本次考试，see you next week！
// ...

$(function(){
   let todolist = JSON.parse( window.localStorage.getItem("todolist"))|| []
    bindHtml()
   function bindHtml(){
      let str =''
      let str2 =''
      let flag = 0
      let flag2 = 0
      todolist.forEach((item,index) =>{
          if(item.is_select==0){
            flag++
            str+=`
            <li>
            <input type="checkbox"  data-id="${item.todo_id}"/>
            <p data-id="${item.todo_id}">${item.info}</p>
            <a data-id="${item.todo_id}">-</a>
            </li>`
          }
          if(item.is_select==1){
            flag2++
            str2+=`
            <li>
            <input type="checkbox" checked  data-id="${item.todo_id}"/>
            <p data-id="${item.todo_id}">${item.info}</p>
            <a data-id="${item.todo_id}">-</a>
            </li>`
          }
      })
      $("#todolist").html(str)
      $("#todocount").html(flag)
      $("#donelist").html(str2)
      $("#donecount").html(flag2)
    }
    //代理请求
    $.ajax({
        url:"/dt",
        success:function (res) {
             console.log(res)
         $('#ipv4').html(res.ip)
         $('#addr').html(res.country+"   "+res.area)
        }
    })
   $




//添加和修改内容
    $('form').on("keydown",'#title',function(e){
     //判断是否有自定义ID属性 有就修改，没有就是添加
      if(!$(this).attr('data-id')){
           if(e.keyCode==13){
            const obj ={
                "is_select":0,
                 "todo_id": todolist.length? todolist[todolist.length-1].todo_id-0+1:1 ,
                 "info": $(this).val().trim()
            }
            todolist.push(obj)
            $(this).val(" ")
            window.localStorage.setItem("todolist",JSON.stringify(todolist))
            bindHtml()
        }
      }else{
          if(e.keyCode==13){
            todolist.forEach((item,index)=>{
            if(item.todo_id == $(this).attr('data-id')){
                item.info =$(this).val().trim()
                return
               
            }
        })
        //移除自定义属性为下次做准备
         this.removeAttribute("data-id")
         $(this).val(" ")
         window.localStorage.setItem("todolist",JSON.stringify(todolist))
         bindHtml()
          }
       
      }
       
    } )
    //删除
    $(".main").on("click","li>a", function(){ 
        todolist.forEach((item,index)=>{
            if(item.todo_id == $(this).attr('data-id')){
                todolist.splice(index,1)
                return   
            }
        })
     window.localStorage.setItem("todolist",JSON.stringify(todolist))
     bindHtml()

    })
    //修改多选框的状态
    $(".main").on('click',"li >input",function(){
    todolist.forEach((item,index)=>{
        if(item.todo_id == $(this).attr('data-id')){
            item.is_select = this.checked ? 1:0;
            return
        }
    })
    window.localStorage.setItem("todolist",JSON.stringify(todolist))
    bindHtml()
    
})
  //点击给输入框添加自定义属性
   $(".main").on('click','p',function () {
        $("#title").attr('data-id', $(this).attr('data-id'))
   })
    
})

