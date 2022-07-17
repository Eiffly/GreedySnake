class Snake {
    head:HTMLElement;
    bodies:HTMLCollection;
    element:HTMLElement;
    constructor() {
        this.element=document.getElementById("snake")!
        this.head=document.querySelector("#snake>div")!
        this.bodies=this.element.getElementsByTagName("div")
    }

    get X(){
        return this.head.offsetLeft
    }

    get Y(){
        return this.head.offsetTop
    }
    //修改蛇头的位置
    set X(value){

        // 如果新值和旧值相同，则直接返回不再修改
        if(this.X === value){
            return;
        }
        if(value<0||value>290){
            throw  new  Error("蛇蛇撞到墙了！！！")
        }

        //禁止掉头
        if(this.bodies[1] && (<HTMLElement> this.bodies[1]).offsetLeft==value){
            //如果右掉头
            if(value > this.X){
                // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                value = this.X - 10;
            }else{
                // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                value = this.X + 10;
            }
        }

        //转向移动
        this.moveBody()
        this.head.style.left=value+'px'
        //检查是否撞到身体
        this.checkHeadBody()


    }
    set Y(value){
        // 如果新值和旧值相同，则直接返回不再修改
        if(this.Y === value){
            return;
        }
        if(value<0||value>290){
            throw  new  Error("蛇蛇撞到墙了！！！")
        }

        //禁止掉头
        if(this.bodies[1] && (<HTMLElement> this.bodies[1]).offsetTop==value){
            //如果右掉头
            if(value > this.Y){
                // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                value = this.Y - 10;
            }else{
                // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                value = this.Y + 10;
            }
        }

        this.moveBody()
        this.head.style.top=value+'px'
        //检查是否撞到身体
        this.checkHeadBody()
    }

    //增加身体长度
    addBody(){
        this.element.insertAdjacentHTML("beforeend","<div></div>")
    }

    //移动身体
    moveBody(){
        for (let i=this.bodies.length-1;i>0;i--){
            let left=(this.bodies[i-1] as HTMLElement).offsetLeft;
            let top=(this.bodies[i-1] as HTMLElement).offsetTop;

            (<HTMLElement> this.bodies[i] ).style.left=left+'px';
            (<HTMLElement> this.bodies[i] ).style.top=top+'px';

        }
    }

    //是否撞到了身体
    checkHeadBody(){
        for (let i=1;i<this.bodies.length;i++) {
            const bd = (<HTMLElement>this.bodies[i])
            if (this.Y === bd.offsetTop && this.X === bd.offsetLeft) {
                throw  new Error("蛇蛇撞到身体了！！！")
            }
        }
    }

}

export  default  Snake