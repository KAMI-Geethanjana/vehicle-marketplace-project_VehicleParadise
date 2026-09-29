const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else {
            if(file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace text-white with text-slate-900 when used with bg-amber-500
    // Because white text on Autoscout yellow is unreadable
    let modified = content.replace(/(bg-amber-500.*?)text-white/g, '$1text-slate-900');
    // also handle the reverse order
    modified = modified.replace(/text-white(.*?bg-amber-500)/g, 'text-slate-900$1');
    
    // Replace hover:text-white with hover:text-slate-900 on amber
    modified = modified.replace(/(hover:bg-amber-500.*?)hover:text-white/g, '$1hover:text-slate-900');
    
    if (content !== modified) {
        fs.writeFileSync(file, modified);
        console.log(`Updated ${file}`);
    }
});
