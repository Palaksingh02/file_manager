function organizefn(direct){
    //console.log("The control entered organize path", direct);
    let destPath;
    if(direct==undefined){
        destpath = process.cwd();
        return;
    }
    else{
        let doesExist = fs.existsSync(direct);
        if(doesExist){
            destPath = path.join(direct,"organized_files");
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath);
            }
        }
        else{
            console.log('Please enter a valid path');
            return;
        }
    }
    organizeHelper(direct , destPath);
}
function organizeHelper(src , dest){
    let childnames = fs.readdirSync(src);
    for(let i = 0 ; i<childnames.length ; i++){
        let childAddress = path.join(src,childnames[i]);
        if(fs.lstatSync(childAddress).isFile()){
            let category = getCategory(childnames[i]);
            console.log(childnames[i], "belongs to --->" , category);
            sendFile(childAddress,dest, category);
        }
    }
}
function sendFile(src , dest , category){
    let categoryPath = path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let filename  = path.basename(src);
    let destPath = path.join(categoryPath,filename);
    fs.copyFileSync(src,destPath);
    fs.unlinkSync(src);

}
function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let type in types){
        let ctype = types[type];
        for(let i = 0 ; i<ctype.length ; i++){
            if(ext == ctype[i]){
                return type;
            }
        }
    }
    return "others";
}
module.export = {
    organizeKey : organizefn
}