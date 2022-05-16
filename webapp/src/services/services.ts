import { StorageService } from "./storage";
import { ThemeService } from "./theme";

export class Services {

    private static _theme: ThemeService | null = null;

    static get theme(): ThemeService {
        if (Services._theme == null) {
            Services._theme = new ThemeService();
        }
        return Services._theme;
    }

    private static _storage: StorageService | null = null;

    static get storage(): StorageService {
        if (Services._storage == null) {
            Services._storage = new StorageService();
        }
        return Services._storage;
    }
}
