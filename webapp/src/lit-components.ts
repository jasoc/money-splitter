import { LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Services, Themes } from "./services";

export class LitElementComponent extends LitElement {
  constructor() {
    super();
  }

  @state()
  private _toggle: boolean = false;

  toggle() {
    this._toggle = !this._toggle;
  }
}

class ThemeRule {
  property: string;
  theme: Themes;
  value: string;
  constructor(property: string, theme: Themes, value: string) {
    this.property = property;
    this.theme = theme;
    this.value = value;
  }
  static default(): ThemeRule {
    return new ThemeRule("", Themes.default, "");
  }
}

export class LitElementThemable extends LitElementComponent {
  
  private static _instances: LitElementThemable[] = [];
  private themeRules: ThemeRule[] = [];

  constructor() {
    super();
    if (LitElementThemable._instances.length == 0) {
      Services.theme.registerEventOnChange(this.toggleAllThemable);
    }
    LitElementThemable._instances.push(this);
  }

  static getThemeRuleName(propertyName: string, theme: Themes): string {
    return propertyName + "-" + Themes[theme];
  }

  toggleAllThemable() {
    LitElementThemable._instances.forEach((el) => {
      el.toggle();
    });
  }

  getAllValues() {
    return this.themeRules
      .filter((rule) => rule.theme == Services.theme.selectedTheme)
      .map((rule) => `${rule.property}: ${rule.value};`)
  }

  registerFor(theme: Themes , properties: string[][]) {
    for (let property of properties) {
      if (this.themeRules.some((rule) => rule.property == property[0] && rule.theme == theme)) {
        throw new Error("Property already registered for this theme.");
      }
      this.themeRules.push(new ThemeRule(property[0], theme, property[1]));
    }
  }

  getValue(propertyName: string): string {
    return (this.themeRules.find((rule) =>
      rule.property == propertyName &&
      rule.theme == Services.theme.selectedTheme) ?? ThemeRule.default())
        .value;
  }
}
