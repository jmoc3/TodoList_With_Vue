Vue.component('tasks',{
    data:function(){
       return {
        inputContent:"",
        tasks:[
            {title:"Do the dishes", completed:false},
            {title:"Hit the sack", completed:true},
            {title:"Sweep the house", completed:false}
        ]
       } 
    },
    methods: {
            saveData: function(e){
                e.preventDefault()
                if(!this.inputContent) return alert('The task cannot be empty')
                this.tasks.unshift({title:this.inputContent[0].toUpperCase() + this.inputContent.substring(1), completed:false})
                this.inputContent =""
            }
        },
    computed:{
            completed:function(){
                return this.tasks.filter(el => {
                    if(el.completed==true) return el
                }).length
            },
            incompleted:function(){
                return this.tasks.filter(el => {
                    if(el.completed!=   true) return el
                }).length
            }
    },
    template:`
        <section class="todoapp">
            <header class="header">
                <h1>Tasks</h1>
                <input type="text" class="new-todo" v-model="inputContent" @keyup.enter="saveData" placeholder="What do you want to do?">
            </header>
            <section>
            <ul class="todo-list">
            <li is="task" v-for="task in tasks" :task="task" class="todo"></li>
            </ul>
            </section>   
            <footer class="footer" v-show="tasks.length">
                <small>Completed : {{completed}}  | Incompleted : {{incompleted}}</small>
            </footer>
        </section>
            `
})

Vue.component('task',{
    props:['task'],
    data:function(){
        return{
            edit:false,
            editText:this.task.title
        }
    },
    methods:{
        toggleCheck: function(){
            this.task.completed = !this.task.completed
        },
        remove:function(){
            this.$parent.tasks.splice(this.$parent.tasks.indexOf(this.task),1)
        },
        editMode:function(){
            this.edit = true
        },
        editGameplay:function(){
            if(this.editText==''){
                return this.remove()
            }
            this.task.title = this.editText;
            this.cancelMode()
        },
        cancelMode:function(){
            this.edit = false
        }
    },
    computed:{
        getCheckStyle:function(){
            return {completed:this.task.completed}
        },
    },
    template:`
        <li :class="getCheckStyle">
        <div class="view">
            <label v-text="task.title" @dblclick="editMode()" v-show="!edit"></label>
            <input class="edit" type="text" v-show="edit" v-model="editText" @keyup.enter="editGameplay()" @blur="cancelMode()" @keyup.esc="cancelMode()" autofocus/>
            <input type="checkbox" class="toggle" v-model="task.completed" />
            <button class="destroy" @click="remove()"></button>
        </div>
        </li>
    `
})

let all = new Vue({
    el:"#root"})