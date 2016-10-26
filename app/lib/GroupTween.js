

export default class GroupTween{
    constructor(tweens, onComplete){
        this.tweens = tweens;
        this.complete = onComplete;
        this.running = tweens.length;
    }
    start(){
        while(this.tweens.length){
            let tween = this.tweens.shift();
            tween.onComplete(()=>{
                this.running--;
                if (!this.running){
                    this.complete();
                }
            });
            tween.start();
        }
    }

}