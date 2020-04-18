class PreBattleScreen
{
    constructor(pos, dims, startSelected)
    {
        this.pos = pos;
        this.dims = dims;

        this.topLeft = { x: this.pos.x - this.dims.w/2, y: this.pos.y - this.dims.h/2 };

        this.moneyPos = { x: this.topLeft.x + 15, y: this.topLeft.y + 20 };
        this.healthPos = { x: this.topLeft.x + 15, y: this.topLeft.y + 40 };

        this.selectedPanel = -1;
        this.panels = [];

        var panelOffset = dims.w / 3;

        var shopPanelObj = { 
            title: "Shop",
            menu: []
        };
        
        var fightPanelObj = { 
            title: "Fight",
            menu: [{
                label: "Begin fight!!",
                command: "FIGHT"
            }] 
        };

        var trainingPanelObj = { 
            title: "Training",
            menu: []
        }; 

        var panelDims = { w: panelOffset-20 , h: (this.dims.h - 20 - 100) };

        var shopPanel = new PreBattlePanel({ x: this.pos.x - panelOffset, y: this.pos.y + 50 }, panelDims, shopPanelObj);
        var fightPanel = new PreBattlePanel({ x: this.pos.x, y: this.pos.y + 50 }, panelDims, fightPanelObj);
        var trainingPanel = new PreBattlePanel({ x: this.pos.x + panelOffset, y: this.pos.y + 50 }, panelDims, trainingPanelObj);

        this.panels.push(shopPanel);
        this.panels.push(fightPanel);
        this.panels.push(trainingPanel);

        this.select(startSelected);
        this.addToLists();
    }

    addToLists()
    {
        screens[PRE_BATTLE_SCREEN].menuKeyReactors.push(this);
        screens[PRE_BATTLE_SCREEN].drawablesList.push(this);
    }

    select(panelNo)
    {
        if(this.selectedPanel >= 0)
        {
            this.panels[this.selectedPanel].selected = false;   
        }

        this.panels[panelNo].selected = true;

        console.log(this.panels);

        this.selectedPanel = panelNo;
    }

    menuUp()
    {

    }

    menuDown()
    {

    }

    menuRight()
    {
        this.select(mod(this.selectedPanel + 1, this.panels.length));
    }

    menuLeft()
    {
        this.select(mod(this.selectedPanel - 1, this.panels.length));
    }

    menuSubmit()
    {
        var subMenu = this.panels[this.selectedPanel].selectedItem();

        console.log("selected sub menu....");
        console.log(subMenu);

        if(subMenu !== 0)
        {
            if(subMenu.command === "FIGHT")
            {
                setActiveScreen(BATTLE_SCREEN);
            }
        }
    }

    setWindowDrawMode()
    {
        fill(color(51, 51, 51, 200));
        rectMode(CENTER);
    }

    setTextMode()
    {
        textAlign(LEFT);
        fill(255);
        noStroke();
    }

    draw()
    {
        this.setWindowDrawMode();
        rect(this.pos.x, this.pos.y, this.dims.w, this.dims.h);

        this.setTextMode();
        text("Money: " + gameMaster.money + " denarii", this.moneyPos.x, this.moneyPos.y);
        text("HP: " + gameMaster.playerHealth() + " / " + gameMaster.playerMaxHealth(), this.healthPos.x, this.healthPos.y);

        for(var i = 0; i < this.panels.length; i ++)
        {
            this.panels[i].draw();
        }
    }
}