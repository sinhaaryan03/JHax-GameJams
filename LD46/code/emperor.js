class Emperor
{
    constructor(startExcitement, maxExcitement)
    {
        this.excitement = startExcitement;
        this.maxExcitement = maxExcitement;
        
        var barCentre = { x: width/2, y: 20 };
        var barDims = { w: width / 2, h: 25 };
        var barPos = { x: barCentre.x - (barDims.w/2), y: barCentre.y - (barDims.h/2) };
        
        this.barRender = new Bar(barPos, barDims, {r: 255, g: 0, b: 0}, {r: 0, g: 255, b: 0});
        this.barRender.setFilled(this.excitement, this.maxExcitement);

        this.addToLists();
    }

    addToLists()
    {   
        drawablesList.push(this);
    }

    addToExcitement(diff)
    {
        var newExcite = this.excitement + diff;

        if(newExcite > this.maxExcitement)
        {
            newExcite = this.maxExcitement;
        }
        else if(newExcite < 0)
        {
            newExcite = this.maxExcitement;
        }

        this.excitement = newExcite;
        this.barRender.setFilled(this.excitement, this.maxExcitement);
    }

    draw()
    {
        this.barRender.draw();

        fill(255)
        textAlign(CENTER);
        noStroke();
        text(this.excitement + ' / ' + this.maxExcitement, width/2, 50);
    }
}