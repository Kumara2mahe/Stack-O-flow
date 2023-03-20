import { NlpManager } from "node-nlp"
import fs from "fs"

const CORPORA = "./chatbot/corpora"
const manager = new NlpManager({ languages: ["en"] })
const files = fs.readdirSync(CORPORA)

for (const file of files) {
    if (file.endsWith(".json")) {
        manager.addCorpus(`${CORPORA}/${file}`)
    }
}
await manager.train()
manager.save()