import { ThemeService } from "./theme";

export class Services {

    private static _theme: ThemeService | null = null;

    static get theme(): ThemeService {
        if (Services._theme == null) {
            Services._theme = new ThemeService();
        }
        return Services._theme;
    }
}
