

export default class GroupTween{
    constructor(tweens){
        this.tweens = tweens;
        this.running = tweens.length;
    }
    start(onComplete){
        while(this.tweens.length){
            let tween = this.tweens.shift();
            tween.onComplete(()=>{
                this.running--;
                if (!this.running){
                    onComplete();
                }
            });
            tween.start();
        }
    }

}