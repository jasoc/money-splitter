import { IHuman } from '@money-splitter/splitter';
import { Observable } from 'object-observer';
import { Themes } from "../types";
import { Services } from "./services";

interface StorageProperties {
  currentTheme: Themes;
  humans: IHuman[];
}

export class StorageService {
  public set: StorageProperties;

  constructor() {
    const obs = Observable.from(this.get);
    Observable.observe(obs, () => this.updateLocalStorageJson());
    this.set = obs;
  }

  initialSet(): void {
    Services.theme.selectedTheme = this.get.currentTheme;
  }

  getDefaultStorage(): StorageProperties {
    return {
      currentTheme: Themes.dark,
      humans: [],
    };
  }

  public get get(): StorageProperties {
    const read: string | null = localStorage.getItem("moneySPlitterStorage");
    if (read) {
      return this.createPropertiesFromObject(JSON.parse(read));
    } 
    return this.getDefaultStorage();
  }

  createPropertiesFromObject(obj: any): StorageProperties {
    const def = this.getDefaultStorage();
    return {
      currentTheme: obj.currentTheme ?? def.currentTheme,
      humans: obj.humans ?? def.humans,
    }
  }

  private updateLocalStorageJson() {
    localStorage.setItem("moneySPlitterStorage", JSON.stringify(this.set));
  }
}
