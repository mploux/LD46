class EntityManager
{
    constructor(game)
    {
        this.game = game;
        this.entities = [];
    }

    update()
    {
        for (let i = 0; i < this.entities.length; i++)
        {
            if (this.entities[i].isRemoved())
            {
                this.removeAt(i);
                continue;
            }
            this.entities[i].update();
        }
    }

    add(e)
    {
        this.entities.push(e);
        e.addToGame();
    }
    
    remove(e)
    {
        this.game.remove(e.getRenderer().getMesh());
        for (let i = 0; i < this.entities.length; i++)
        {
            if (this.entities[i] === e)
            {
                console.log("Removed an entity: " + e.getType() + " | Total: " + this.entities.length);
                this.entities.splice(i, 1); 
                i--;
            }
        }
    }

    removeAt(index)
    {
        console.log("Removed an entity: " + this.entities[index].getType() + " | Total: " + this.entities.length);
        this.game.remove(this.entities[index].getRenderer().getMesh());
        this.entities.splice(index, 1); 
    }

    getFirstEntityLat(position, radius, ignoreDead = false, maxDistance = 10)
    {
        console.log(position);
        let finalEntity = null;
        for (let i = 0; i < this.entities.length; i++)
        {
            let entity = this.entities[i];
            let epos = entity.getPosition();

            if (epos.x > position.x - radius && epos.x < position.x + radius)
            {
                // We are in the X range
                console.log(epos);

                let distance = Math.abs(epos.z - position.z);
                
                console.log("DISTANCE: " + distance);
                if (finalEntity === null)
                    if (!(ignoreDead && entity.isDead()))
                        if (distance < maxDistance)
                            finalEntity = entity;
                
                // Getting the highest Z position
                if (finalEntity && epos.z > finalEntity.getPosition().z && epos.z < position.z)
                {
                    if (!(ignoreDead && entity.isDead()))
                    {
                        if (distance < maxDistance)
                            finalEntity = entity;
                    }
                }
            }
        }

        if (finalEntity)
        {
            let distance = Math.abs(finalEntity.getPosition().z - position.z);
            console.log("DISTANCE: " + distance);
        }

        return finalEntity;
    }

    getEntityAt(position, radius, ignoreDead = false)
    {
        console.log(position);
        let finalEntity = null;
        for (let i = 0; i < this.entities.length; i++)
        {
            let entity = this.entities[i];
            let epos = entity.getPosition();

            if (epos.x > position.x - radius && epos.x < position.x + radius)
            {
                // We are in the X range
                if (finalEntity === null)
                    if (!(ignoreDead && entity.isDead()))
                        finalEntity = entity;
                
                // Getting the highest Z position
                if (finalEntity && epos.z > finalEntity.getPosition().z && epos.z < position.z)
                {
                    if (!(ignoreDead && entity.isDead()))
                        finalEntity = entity;
                }
            }
        }

        return finalEntity;
    }
}

export default EntityManager;