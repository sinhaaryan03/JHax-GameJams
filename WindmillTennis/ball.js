function Ball(x, y, radius) {
    var options = {
        friction: 0,
        frictionStatic: 0,
        frictionAir: 0,
        restitution: 1,
        mass: 0.1,
        label: "ball"
    };

    this.speed = 0;

    this.body = Bodies.circle(x, y, radius, options);
    console.log(this.body);

    World.add(world, this.body);
    renderers.push(this);

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
    }

    this.reset = function()
    {
        console.log("Resetting ball!");

        Body.setVelocity(this.body, { x: 0, y: 0 });
        Body.setPosition(this.body, { x: width/2, y: height/2 });

        ballMoving = false;
    }

    this.body.collisionExit = function(otherBody)
    {
        console.log("Ball collision with " + otherBody.label);

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

        
    }

    this.show = function() {
        circle(this.body.position.x, this.body.position.y, 2*this.body.circleRadius);
    }
}