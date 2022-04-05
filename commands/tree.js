function treefn(direct){
    //console.log("The control entered tree path", direct);
    let destPath;
    if(direct==undefined){
        treeHelper(process.cwd(),"");
        return;
    }
    else{
        let doesExist = fs.existsSync(direct);
        if(doesExist){
            treeHelper(direct," ");
        }
        else{
            console.log('Please enter a valid path');
        }
    }

}
function treeHelper(direct , indent){
    let isFile = fs.lstatSync(direct).isFile();
    if(isFile==true){
        let filename = path.basename(direct);
        console.log(indent+'├──'+ filename);
    }
    else{
        let dirName = path.basename(direct);
        console.log(indent+'└──'+dirName);
        let children = fs.readdirSync(direct);
        for(let i = 0 ; i<children.length ; i++){
            let childrenPath = path.join(direct,children[i]);
            treeHelper(childrenPath, indent+"\t");
        }
    }

}
module.exports = {
    treeKey : treefn
}