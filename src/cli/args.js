const parseArgs = () => {
    const args = process.argv.slice(2);
    const parsedArgs = {};

    for (let i = 0; i < args.length; i += 2) {
        const propName = args[i].replace(/^--/, '');
        const value = args[i + 1];
        parsedArgs[propName] = value;
    }

    Object.entries(parsedArgs).forEach(([propName, value]) => {
        console.log(`${propName} is ${value}`);
    });
};

parseArgs();