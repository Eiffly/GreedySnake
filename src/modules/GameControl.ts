import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
import Food from "./Food";


class GameControl {
    snake:Snake
    scorePanel:ScorePanel
    food:Food
    direction:string=""
    isLive = true;

    //初始化
    constructor() {
        this.snake=new  Snake()
        this.scorePanel=new ScorePanel(10,1)
        this.food=new Food()

        this.init()
    }

    //初始化
    init(){
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        this.run();
    }

    //键盘按下的函数
    keydownHandler(event:KeyboardEvent){
        this.direction=event.key

    }

    //run的走向
    run(){
        let X=this.snake.X;
        let Y=this.snake.Y;
        switch (this.direction) {
            case  "ArrowUp":
            case "Up":
                Y -=10;
                break;
            case  "ArrowDown":
            case "Down":
                Y +=10;
                break;
            case  "ArrowLeft":
            case "Left":
                X -=10;
                break;
            case  "ArrowRight":
            case "Right":
                X +=10;
                break;
        }

        this.checkEat(X,Y)

        try {
            this.snake.X = X;
            this.snake.Y = Y;
        }catch (e:any) {
            alert(e.message+"GAME OVER")
            // 将isLive设置为false
            this.isLive = false;
        }


        //不可以写成下面的形式
        /**
         * 因为是以函数的形式调用的
         * 而run函数里面正好用到this this是window
         * this.snake.X\Y等都是undefined
         * */

        //setTimeout回自己结束
        this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30)
    }


    //是否吃到食物
    checkEat(X:number,Y:number){
        if(X==this.food.X && Y==this.food.Y){
            // 重置位置
            this.food.change()
            // 分数增加
            this.scorePanel.addScore()
            // 蛇增加一节
            this.snake.addBody()
        }

    }

}

export  default  GameControl


