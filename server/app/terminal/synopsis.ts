import {CommandSynopsisRecursiveDescentParser} from "./CommandSynopsisRecursiveDescentParser";

if (process.argv[2] && process.argv[3]) {
    process.env.cmd = process.argv[2];
    process.env.synopsis = process.argv[3];
} else {
    throw Error("No data");
}

let parser = new CommandSynopsisRecursiveDescentParser(process.env.cmd, process.env.synopsis);