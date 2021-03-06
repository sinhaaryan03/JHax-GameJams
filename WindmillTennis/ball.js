function Ball(x, y, radius) {

    this.sprite = {};
    this.hasSprite = false;
    var options = {
        friction: 0,
        frictionStatic: 0,
        frictionAir: 0,
        restitution: 1,
        mass: 0.1,
        label: "ball"
    };

    this.hitSound;

    this.speed = 0;

    this.body = Bodies.circle(x, y, radius, options);

    World.add(world, this.body);
    renderers.push(this);

    this.body.ballObj = this;

    this.setVelocity = function(vx, vy)
    {
        Body.setVelocity(ball.body, { x: vx, y: vy });
        this.speed = ball.body.speed;
    }

    this.update = function(deltaTime) {
        if(this.body.position.x < 0 - 2 * this.radius || this.body.position.x > width + 2 * this.radius)
        {
            console.log("Ball out of bounds!");
        }

        if(this.hasSprite === true)
        {
            this.sprite.animate();
        }
    }
    
    this.setSprite = function(sprite)
    {
        this.sprite = sprite;
        this.hasSprite = true;
    }

    this.setHitSound = function(sound)
    {
        this.hitSound = sound;
    }

    this.reset = function()
    {
        Body.setVelocity(this.body, { x: 0, y: 0 });
        Body.setPosition(this.body, { x: width/2, y: height/2 });

        ballMoving = false;
    }

    this.body.collisionExit = function(otherBody)
    {
        if(otherBody.label.endsWith('goal'))
        {
            if(otherBody.label.startsWith('player1'))
            {
                increaseScore(2, 1);
            }
            else if(otherBody.label.startsWith('player2'))
            {
                increaseScore(1, 1);
            }

            ball.reset();
        }
        else if(otherBody.label === 'player1' || otherBody.label === 'player2')
        {
            if (typeof(this.ballObj.hitSound) !== 'undefined')
            {
                this.ballObj.hitSound.play();
            }
        }

        
    }

    this.show = function() {
        if(this.hasSprite === false)
        {
            circle(this.body.position.x, this.body.position.y, 2*this.body.circleRadius);
        }
        else
        {
            this.sprite.showAt(this.body.position);
        }
        
    }
}