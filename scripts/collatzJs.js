/** collatzJs */
(function(){
    var scr;
    var trees = [];

    function setup() {
        scr = dcl.setupScreen(640,400);
        scr.setBgColor('black');
        document.body.style.backgroundColor = 'black';      
        scr.imageData = scr.ctx.createImageData(scr.width, scr.height);       
    }
    
    function createTree(n){
        var tree = [n];
        return {
            n: n,
            branches: tree,
            add: function(x){
                tree.push(x);
            }
        }
    }

    function collatz(n){
        if(n % 2 === 0){
            return n / 2;
        } else {
            return n * 3 + 1;
        }
    }
    
    function map(n){
        var tree = createTree(n);
        var nn = n;
        while(nn > 1){
            nn = collatz(nn);
            tree.add(nn);
        }
        return tree;
    }
    function run(){
        var n = scr.width * scr.height;
        console.log('running collatz function for ', n, ' pixels');
        while(n > 1){
            trees.push(map(n--));
        }
        trees.forEach(function(tree){
            tree.branches.forEach(function(branch){
                var index = branch * 4 - 4;
                var val =  scr.imageData.data[index];            
                if(val < 255){
                    val+=10;
                }
                scr.imageData.data[index++] = val; 
                scr.imageData.data[index++] = val; 
                scr.imageData.data[index++] = val; 
                scr.imageData.data[index] = 255; 
            });
        });
        scr.ctx.putImageData(scr.imageData,0,0);
    }
    setup();
    run();
})();