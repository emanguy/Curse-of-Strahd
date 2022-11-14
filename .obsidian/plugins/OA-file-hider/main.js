/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/main.ts
__export(exports, {
  default: () => FileHider
});

// src/commands/toggleVisibility.ts
var VisibilityToggleCommand = class {
  constructor(plugin) {
    plugin.addCommand({
      id: "oa-fh-toggle-visibility",
      name: "Toggle Visibility",
      callback: () => {
        plugin.toggleVisibility();
      }
    });
  }
};

// src/settings/hiddenToggle.ts
var import_obsidian = __toModule(require("obsidian"));
var VisibilityToggleSetting = class {
  static create(plugin, container) {
    return new import_obsidian.Setting(container).setName(`Hidden File Visibility`).setDesc(`Toggle whether or not files and folders that are told to be hidden will be hidden or not.`).addToggle((toggle) => {
      toggle.setValue(!plugin.settings.hidden).onChange(() => {
        plugin.toggleVisibility();
      });
    });
  }
};

// src/main.ts
var import_obsidian4 = __toModule(require("obsidian"));

// src/settings/manageHiddenPaths.ts
var import_obsidian3 = __toModule(require("obsidian"));

// src/modals/HiddenList.ts
var import_obsidian2 = __toModule(require("obsidian"));
var HiddenPathsModal = class extends import_obsidian2.Modal {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
  }
  onOpen() {
    const { contentEl: content } = this;
    content.createEl(`h1`, { text: `Hidden Files and Folders` });
    content.createEl(`hr`);
    let body = content.createEl(`div`, { cls: `hidden-list-modal-body` });
    this.plugin.settings.hiddenList.forEach((path) => {
      let c = body.createEl(`div`);
      new import_obsidian2.Setting(c).setName(path).addButton((btn) => {
        btn.setIcon(`cross`).setTooltip(`Remove`).onClick((e) => {
          this.plugin.unhidePath(path);
          c.hide();
        });
      });
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};

// src/settings/manageHiddenPaths.ts
var ManageHiddenPaths = class {
  static create(plugin, container) {
    return new import_obsidian3.Setting(container).setName(`Hidden Files and Folders`).setDesc(`Add or remove files and folders from the list that are being hidden`).addButton((b) => {
      b.setButtonText(`Manage`).onClick((event) => {
        if (!event.isTrusted) {
          return;
        }
        new HiddenPathsModal(plugin).open();
      });
    });
  }
};

// src/utils.ts
function changePathVisibility(path, hide) {
  let n = document.querySelector(`[data-path="${path}"]`);
  if (!n) {
    return;
  }
  ;
  let p = n.parentElement;
  if (hide) {
    p.style.display = `none`;
  } else {
    p.style.display = ``;
  }
  ;
}

// src/main.ts
var FileHider = class extends import_obsidian4.Plugin {
  constructor() {
    super(...arguments);
    this.settings = {
      hidden: true,
      hiddenList: []
    };
    this.style = null;
  }
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.registerEvent(this.app.workspace.on(`file-menu`, (menu, file) => {
        if (file instanceof import_obsidian4.TFolder) {
          menu.addItem((i) => {
            if (this.settings.hiddenList.includes(file.path)) {
              i.setTitle(`Unhide Folder`).setIcon(`eye`).onClick(() => {
                this.unhidePath(file.path);
              });
            } else {
              i.setTitle(`Hide Folder`).setIcon(`eye-off`).onClick(() => {
                changePathVisibility(file.path, this.settings.hidden);
                this.settings.hiddenList.push(file.path);
                this.saveSettings();
              });
            }
            ;
          });
        } else {
          menu.addItem((i) => {
            if (this.settings.hiddenList.includes(file.path)) {
              i.setTitle(`Unhide File`).setIcon(`eye`).onClick((e) => {
                this.unhidePath(file.path);
              });
            } else {
              i.setTitle(`Hide File`).setIcon(`eye-off`).onClick((e) => {
                changePathVisibility(file.path, this.settings.hidden);
                this.settings.hiddenList.push(file.path);
                this.saveSettings();
              });
            }
            ;
          });
        }
        ;
      }));
      this.app.workspace.onLayoutReady(() => {
        for (const path of this.settings.hiddenList) {
          changePathVisibility(path, this.settings.hidden);
        }
        ;
      });
      new VisibilityToggleCommand(this);
      this.addSettingTab(new FileHiderSettingsTab(this.app, this));
    });
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, this.settings, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
  toggleVisibility() {
    this.settings.hidden = !this.settings.hidden;
    for (const path of this.settings.hiddenList) {
      changePathVisibility(path, this.settings.hidden);
    }
    ;
    this.saveSettings();
  }
  unhidePath(path) {
    let i = this.settings.hiddenList.indexOf(path);
    this.settings.hiddenList.splice(i, 1);
    changePathVisibility(path, false);
    this.saveSettings();
  }
};
var FileHiderSettingsTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl: container } = this;
    container.empty();
    VisibilityToggleSetting.create(this.plugin, container);
    ManageHiddenPaths.create(this.plugin, container);
  }
};
