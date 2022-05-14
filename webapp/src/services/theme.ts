export enum Themes {
    dark,
    light,
    default = dark
}

export class ThemeService {
    private _selectedTheme: Themes = Themes.dark;
    private _themeChangedEvents: ((theme: Themes) => void)[] = [];

    public set selectedTheme(value: Themes) {
        this._selectedTheme = value;
        for (let event of this._themeChangedEvents) {
            event(value);
        }
    }

    public get selectedTheme() {
        return this._selectedTheme;
    }

    public registerEventOnChange(callback: (theme: Themes) => void) {
        this._themeChangedEvents.push(callback);
    }
}
