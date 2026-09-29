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
    
    // Reverse the exact regex I did earlier
    let modified = content.replace(/(bg-amber-500.*?)text-slate-900/g, '$1text-white');
    modified = modified.replace(/text-slate-900(.*?bg-amber-500)/g, 'text-white$1');
    modified = modified.replace(/(hover:bg-amber-500.*?)hover:text-slate-900/g, '$1hover:text-white');
    
    // Specifically fix Navbar sign in button which had bg-slate-900
    modified = modified.replace('text-white dark:text-white font-bold rounded-full text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2', 'text-white dark:text-white font-bold rounded-full text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2');
    
    // Just to be safe, replace all instances of "text-slate-900 dark:text-slate-900" with "text-white" on buttons
    modified = modified.replace(/text-slate-900 dark:text-slate-900/g, 'text-white');
    
    if (content !== modified) {
        fs.writeFileSync(file, modified);
        console.log(`Reverted ${file}`);
    }
});
