class MoveList
{
    constructor(techniques)
    {
        this.TOP_LEVEL = 0;
        this.MOVES = 1;
        this.WEAPONS = 2;

        this.menuMode = 0;

        this.isActive = false;
        this.techniques = techniques;
        
        this.pos = { x: 50, y: height/2+60 };
        this.dims = { w: 300, h: 120 };

        this.topMenu = [ "Moves", "Change Weapon" ];

        this.selectedItem = 0;

        this.equippedTech = [];
        this.equippedWeapons = [];
        this.activeList = this.topMenu;

        this.addToLists();
    }

    setEquippedTechs(playerTechs)
    {
        this.techniques = playerTechs;

        this.equippedTech = [];

        for(var i = 0; i < this.techniques.length; i ++)
        {
            if(this.techniques[i].equipped)
            {
                this.equippedTech.push(this.techniques[i]);
            }
        }

        console.log("Build equipped list...");
        console.log(this.equippedTech);
    }

    setEquippedWeapons(playerWeapons)
    {
        this.weapons = playerWeapons;

        this.updateEquippedWeaponsList();
    }

    updateEquippedWeaponsList()
    {
        this.equippedWeapons = [];

        for(var i = 0; i < this.weapons.length; i ++)
        {
            if(this.weapons[i].equipped)
            {
                this.equippedWeapons.push(this.weapons[i]);
            }
        }
    }

    updateMode(newMode)
    {
        console.log("Setting mode to: " + newMode);
        this.menuMode = newMode;
        this.selectedItem = 0;

        if(newMode === this.TOP_LEVEL)
        {
            this.activeList = this.topMenu;
        }
        else if(newMode === this.MOVES)
        {
            this.activeList = this.equippedTech;
        }
        else if(newMode === this.WEAPONS)
        {
            this.activeList = this.equippedWeapons;
        }

        console.log(this.activeList);
    }

    addToLists()
    {
        screens[BATTLE_SCREEN].drawablesList.push(this);
        screens[BATTLE_SCREEN].menuKeyReactors.push(this);
    }

    setToTextDrawMode()
    {
        fill(255);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(16)                
    }

    setSelectMode()
    {
        rectMode(CORNER);
        noFill();
        stroke(255);
    }

    setToContainerDrawMode()
    {
        rectMode(CORNER);
        fill(0);
        stroke(255);
    }

    menuRight()
    {
        if(this.menuMode != this.TOP_LEVEL)
        {
            this.updateMode(this.TOP_LEVEL);
        }
    }

    menuLeft()
    {
        if(this.menuMode != this.TOP_LEVEL)
        {
            this.updateMode(this.TOP_LEVEL);
        }
    }

    setToSelectedItemBox()
    {
        rectMode(CORNER);
        fill(0);
        stroke(255);
    }

    menuUp()
    {
        if(this.isActive)
        {
            this.selectedItem = mod(this.selectedItem - 1, this.activeList.length);
            console.log("new selected item: " + this.selectedItem);
        }
    }

    menuDown()
    {
        if(this.isActive)
        {
            this.selectedItem = mod(this.selectedItem + 1, this.activeList.length);
            console.log("new selected item: " + this.selectedItem);
        }
    }

    menuSubmit()
    {
        if(this.isActive)
        {
            if(this.menuMode === this.MOVES)
            {
                var selectedTech = this.equippedTech[this.selectedItem];
                var target = 0;

                console.log(this.owner);
                gameMaster.startTechnique(selectedTech, target, this.owner);
            }
            else if(this.menuMode === this.TOP_LEVEL)
            {
                this.updateMode(this.selectedItem + 1);
            }            
        }
    }

    setActive(activeState)
    {
        this.isActive = activeState;
    }

    drawSelectedBox(index)
    {
        if(this.selectedItem == index)
        {
            this.setSelectMode();
            rect(this.pos.x + 10, this.pos.y + 30 + index * 20, this.dims.w - 20, 17);
            this.setToTextDrawMode();
        }
    }

    draw()
    {
        if(this.isActive)
        {
            this.setToContainerDrawMode();
            rect(this.pos.x, this.pos.y, this.dims.w, this.dims.h, 20);
            
            this.setToTextDrawMode();
            if(this.menuMode === this.TOP_LEVEL)
            {
                for(var i = 0; i < this.topMenu.length; i ++)
                {
                    this.drawSelectedBox(i);

                    text(this.topMenu[i], this.pos.x + 15, this.pos.y + 41 + (i)*20);
                }
            }
            else if(this.menuMode !== this.TOP_LEVEL)
            {
                if(this.menuMode === this.MOVES)
                {
                    text("DMG", this.pos.x + (this.dims.w/2), this.pos.y + 15);
                    text("EXC", this.pos.x + 1.5*(this.dims.w/2), this.pos.y + 15);
                }

                if(this.activeList.length > 0)
                {
                    for(var i = 0; i < this.activeList.length; i ++)
                    {
                        this.drawSelectedBox(i);
                        text(this.activeList[i].name, this.pos.x + 15, this.pos.y + 40 + i * 20);

                        if(this.menuMode === this.MOVES)
                        {
                            var dmg = this.activeList[i].getDamageString();
                            var exc = this.activeList[i].getExcitementString();

                            text(dmg, this.pos.x + (this.dims.w/2), this.pos.y + 40 + i * 20);
                            text(exc, this.pos.x + 1.5*(this.dims.w/2), this.pos.y + 40 + i * 20);
                        }
                    }
                }
                else
                {
                    textAlign(CENTER);
                    text("None Available!", this.pos.x + (this.dims.w / 2), this.pos.y + (this.dims.h / 2));
                }
            }
        }        
    }
}