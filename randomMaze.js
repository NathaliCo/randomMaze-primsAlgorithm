//Class for create a Maze
class RandomMaze{
//parameters for the Maze
    constructor( dimension, referencePoint = [0,0], dimension3D = false, lineWidth = 10, scale = 1){
        //The point where the Maze starts
        this.referencePoint = ({
            x:0,
            y:0
        })
//The init of the canva
        this.referencePoint.x = referencePoint[0];
        this.referencePoint.y = referencePoint[1];
        //name area like an object
        this.dimension = ({
            width:0,
            height:0,
        });
        this.lineWidth = lineWidth;
        this.scale = scale;
//The size of the Maze
        this.dimension.width = dimension[0];
        this.dimension.height = dimension[1];
//The init of the path 
        this.initPoint  =  ({
            x:0,
            y:0
        });
//The end of the path
        this.endPoint  =  ({
            x:0,
            y:0
        });
        
       //Margin = 2
        if( this.initPoint[0] >= this.referencePoint.x-2)
            this.initPoint[0] -= 2;
        // The definition of end point is in the generateLabyrinth function 
        //dimension3D = false
        this.dimension3D = dimension3D;
        //function for start the Maze
        this.generateMaze();
    }
//Caracteristics of the lines(walls)
    
draw( scene, contourColor = "#000000",contourWidth =.30, pathColor = "#302f2f",pathWidth=.30){
        
    /* Draw contour */
    var line ;
    for(let i = 1; i < this.contour.length; i+=2){
        line  = new three3DExtras.tubeLine([this.referencePoint.x + this.contour[i][1] /*Column-x*/, this.referencePoint.y + this.contour[i][0]/*Row-y*/,this.VAL_Z],[this.referencePoint.x + this.contour[i-1][1], this.referencePoint.y + this.contour[i-1][0],this.VAL_Z],contourWidth,contourColor);
        scene.add(line.getObject3D());
    }

    
    for(let i = 0; i < this.pathLab.length; i++){
        line  = new three3DExtras.tubeLine([this.referencePoint.x + this.pathLab[i][0][1] /*Column-x*/, this.referencePoint.y + this.pathLab[i][0][0]/*Row-y*/,this.VAL_Z],[this.referencePoint.x + this.pathLab[i][1][1], this.referencePoint.y + this.pathLab[i][1][0],this.VAL_Z],pathWidth,pathColor);
        scene.add(line.getObject3D());
    }

    console.log("Fin de dibujado");


}

    generateAdjacentNodes( posNode ){
        // PARAM PosNode ---> Array [y ---> Row, x --> Column] 

        //Get the nodes and genere the Adjacent Nodes of each one like a central node 
        let list = [];
        let i = 0 ;
        let weight;

        if( posNode[1] == 0){
            // If the node is in the left contour 
            //Asign a random weigth to the node
            weight = Math.random();
            //Add node position and weigth to the list
            //Rigth
            list.push([posNode[0]/*Row*/,posNode[1]+1/*Column*/,weight]); 
            //Add the to the matrix the node and their adyacents.
            this.matrixWei[posNode[0]][posNode[1]+1].push([posNode[0],posNode[1],weight]); //Add the same value in the rigth node 
            //If the node is in the bottom corner 
            if( posNode[0] == 0){
                weight = Math.random();
                list.push([posNode[0]+1,posNode[1],weight]); 
                this.matrixWei[posNode[0]+1][posNode[1]].push([posNode[0],posNode[1],weight]); //Add the same value in the top node 
            // If is in the top corner
            }else if( posNode[0] == this.dimension.height-1){ 
            //bottom node not 
            }else{
                // not in the corner
                weight = Math.random();
                //Top
                list.push([posNode[0]+1,posNode[1],weight]); 
                this.matrixWei[posNode[0]+1][posNode[1]].push([posNode[0],posNode[1],weight]); //Add the same value in the top node 
                 /* This value is definite in other node */

            }
             /* Is in the right contour */
        }else if( posNode[1] ==  this.dimension.width -1 ){
           

            if( posNode[1] == 0){
                /* Is in the bottom contour*/
                weight = Math.random();
                //Top
                list.push([posNode[0]+1,posNode[1],weight]); 
                this.matrixWei[posNode[0]+1][posNode[1]].push([posNode[0],posNode[1],weight]); //Add the same value in the top node 


        }else if( posNode[0]  == this.dimension.height-1){
                /* Is in the top contour */

            }else{
                /* Only right contour*/
                weight = Math.random();
                //Top
                list.push([posNode[0]+1,posNode[1],weight]); 
                this.matrixWei[posNode[0]+1][posNode[1]].push([posNode[0],posNode[1],weight]); //Add the same value in the top node 

            }
        }else if( posNode[0] == 0 ){
            /* If is only in the bottom contour*/
            weight = Math.random();
            list.push([posNode[0]+1,posNode[1],weight]); //Top
            this.matrixWei[posNode[0]+1][posNode[1]].push([posNode[0],posNode[1],weight]); //Add the same value in the top node 

            weight = Math.random();
            list.push([posNode[0]/*Row*/,posNode[1]+1/*Column*/,weight]); //Rigth
            this.matrixWei[posNode[0]][posNode[1]+1].push([posNode[0],posNode[1],weight]); //Add the same value in the rigth node 


        }else if( posNode[0] == this.dimension.height -1){
            /* Is only in the top contour */

            weight = Math.random();
            list.push([posNode[0]/*Row*/,posNode[1]+1/*Column*/,weight]); //Rigth
            this.matrixWei[posNode[0]][posNode[1]+1].push([posNode[0],posNode[1],weight]); //Add the same value in the rigth node 


        }else{
            /* No problem with a contours */

            weight = Math.random();
            list.push([posNode[0]+1,posNode[1],weight]); //Top
            this.matrixWei[posNode[0]+1][posNode[1]].push([posNode[0],posNode[1],weight]); //Add the same value in the top node 

            weight = Math.random();
            list.push([posNode[0]/*Row*/,posNode[1]+1/*Column*/,weight]); //Rigth
            this.matrixWei[posNode[0]][posNode[1]+1].push([posNode[0],posNode[1],weight]); //Add the same value in the rigth node 
        }
        return list;
    }

    generateMaze(){
        // Make aleatory Maze 
        const VAL_Z = this.dimension3D == true? 5:0;
        this.contour = [];

        //Contour of Maze
//Get the init random point of the path 
        this.initPoint.x = Math.floor(Math.random() * this.dimension.width);
        this.initPoint.y = 0;
        /* Bottom Line */      
        if( this.initPoint.x == 0 )
            this.initPoint.x ++;
        else if(this.initPoint.x >= this.dimension.width-1)
            this.initPoint.x --;
        
        this.contour.push([-1,this.dimension.width ]);
        this.contour.push([-1,this.initPoint.x + 1]);

        this.contour.push([-1,this.initPoint.x -1]);
        this.contour.push([-1,-1]);
        
//Get the init random point of the path 
        let sideOfEnd = Math.random() * 3;

        /* Other Lines */
        //left
        if( sideOfEnd < 1)
        {   
            /*Define the end point*/
            this.endPoint.x = 0;
            this.endPoint.y = Math.random() * this.dimension.height;

            if( this.endPoint.y >= this.dimension.height -1)
                this.endPoint.y --;
            else if(this.endPoint.y == 0)
                this.endPoint.y ++;

            /* Side --> Left */
            this.contour.push([0-1,0-1]);
            this.contour.push([this.endPoint.y-1,this.endPoint.x-1]);            

            this.contour.push([this.endPoint.y+1,this.endPoint.x-1]);            
            this.contour.push([this.dimension.height,0-1]);            

            /* Others */
            /*Top*/
            this.contour.push([this.dimension.height-1+1,-1]);        
            this.contour.push([this.dimension.height-1+1,this.dimension.width]);  

            /*Rigth*/
            this.contour.push([this.dimension.height,this.dimension.width]);        
            this.contour.push([0-1,this.dimension.width-1+1]);

        }else if( sideOfEnd < 2){
            this.endPoint.x =  Math.random() * (this.dimension.width)
            this.endPoint.y =  0;
            if( this.endPoint.x >=  this.dimension.width -1 )
                this.endPoint.x --;
            else if(this.endPoint.x == 0)
                this.endPoint.x++;

            /* Side --> Top*/
            this.contour.push([this.dimension.height-1+1,0-1]);        
            this.contour.push([this.dimension.height-1+1,this.endPoint.x-1]);        

            this.contour.push([this.dimension.height-1+1,this.endPoint.x+1]);        
            this.contour.push([this.dimension.height-1+1,this.dimension.width]);        


            /* Others */
            /*Rigth*/
            this.contour.push([this.dimension.height,this.dimension.width]);        
            this.contour.push([0-1,this.dimension.width-1+1]);

            /*Left*/
            this.contour.push([0-1,0-1]);
            this.contour.push([this.dimension.height,0-1]);

        }else{
            this.endPoint.x =  0;
            this.endPoint.y = Math.random() * this.dimension.height;
            if( this.endPoint.y >= this.dimension.height - 1)
                this.endPoint.y --;
            if( this.endPoint.y == 0)
                this.endPoint.y++;

            /* Side --> Rigth */
            this.contour.push([this.dimension.height,this.dimension.width-1+1]);
            this.contour.push([this.endPoint.y+1,this.dimension.width-1+1]);
            
            this.contour.push([this.endPoint.y-1,this.dimension.width-1+1]);
            this.contour.push([0-1,this.dimension.width-1+1]);

            /* Others */
            /*Left*/
            this.contour.push([0-1,0-1]);
            this.contour.push([this.dimension.height,0-1]);

            /*Top*/
            this.contour.push([this.dimension.height-1+1,-1]);        
            this.contour.push([this.dimension.height-1+1,this.dimension.width]);  

        }

        // Generate weight matrix 
        this.matrixWei  = new Array(this.dimension.height);
        for( let i = 0; i < this.dimension.height; i++){
            this.matrixWei [i] = new Array(this.dimension.width);
            for(let j = 0; j < this.dimension.width; j++)
                this.matrixWei[i][j] = new Array();
        }
            
        for(let i = 0; i < this.dimension.height ;i++){
            for( let j = 0 ; j < this.dimension.width;j++){
                this.matrixWei[i][j] = this.matrixWei [i][j].concat(this.generateAdjacentNodes([i,j]));
            }
        }

        this.prims();
    }
     prims( ) {

        // arbitrarily choose initial vertex from graph
        let nodo = [0 ,0];/*Row*/ /*Column*/
    
        // initialize empty edges array and empty MET
        let MET = [];
        let edges = [];
        let minEdge = [null , [null,null, Infinity]];
        let visited = [];
        
        // run prims algorithm until we create an MET
        // that contains every vertex from the graph
        while (MET.length < this.dimension.width * this.dimension.height -1) {


            // mark this vertex as visited
            visited.push(nodo[0]+" "+nodo[1]);

            // add each edge to list of potential edges
            let len = this.matrixWei[nodo[0]][nodo[1]].length;
            for (var r = 0; r < len ; r++) {
                if(visited.indexOf(this.matrixWei[nodo[0]][nodo[1]][r][0] + " " + this.matrixWei[nodo[0]][nodo[1]][r][1]) == -1){
                    edges.push([[nodo[0],nodo[1]],this.matrixWei[nodo[0]][nodo[1]][r]]); 
                }
                /* Two Arrays  First --> Origin Node[x,y]  Second ---> Final Node[x,y,weigth] */
            }
    
            // find edge with the smallest weight to a vertex
            // that has not yet been visited
            for (var e = 0; e < edges.length; e++) {
                if (edges[e][1][2] < minEdge[1][2] && visited.indexOf(edges[e][1][0]+" "+edges[e][1][1]) == -1) {
                    minEdge = edges[e];
                }else{
                }
            }
    
            // remove min weight edge from list of edges
            edges.splice(edges.indexOf(minEdge), 1);
 
        MET.push(minEdge);

            nodo = [minEdge[1][0],minEdge[1][1]];
            minEdge = [null , [null,null, Infinity]];
        }
    
        this.pathLab =MET;
    }

   
}

