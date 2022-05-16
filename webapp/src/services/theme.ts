import { Themes } from "../types";
import { Services } from "./services";

export class ThemeService {
    private _selectedTheme: Themes = Themes.dark;
    private _themeChangedEvents: ((theme: Themes) => void)[] = [];

    public set selectedTheme(value: Themes) {
        this._selectedTheme = value;
        for (let event of this._themeChangedEvents) {
            event(value);
        }
        Services.storage.set.currentTheme = value;
    }

    public get selectedTheme() {
        return this._selectedTheme;
    }

    public registerEventOnChange(callback: (theme: Themes) => void) {
        this._themeChangedEvents.push(callback);
    }
}
