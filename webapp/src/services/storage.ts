import { Themes } from "./theme";

class Storage {
    currentTheme: Themes;

    constructor() {
        this.currentTheme = Themes.default;
    }
}

export class StorageService {
    private lsKey: string = "moneySPlitterStorage";

    get storage(): Storage {
        let ls = localStorage.getItem(this.lsKey);
        if (ls == null) {
            return new Storage();
        }
        return <Storage>JSON.parse(ls);
    }

    set storageSet(storage: Storage) {
        localStorage.setItem(this.lsKey, JSON.stringify(storage));
    }
}
