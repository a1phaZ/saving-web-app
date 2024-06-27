"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// entity/src/index.ts
var src_exports = {};
__export(src_exports, {
  Bill: () => Bill,
  BillHistoryItem: () => BillHistoryItem,
  ETransactionCashFlow: () => ETransactionCashFlow,
  ETransactionType: () => ETransactionType,
  TgUser: () => TgUser,
  Transaction: () => Transaction,
  Wallet: () => Wallet
});
module.exports = __toCommonJS(src_exports);

// entity/src/core/telegram-user/telegram-user.class.ts
var TgUser = class {
  get Id() {
    return this._id;
  }
  set Id(value) {
    this._id = value;
  }
  get FirstName() {
    return this._firstname;
  }
  set FirstName(value) {
    this._firstname = value;
  }
  get LastName() {
    return this._lastname;
  }
  set LastName(value) {
    this._lastname = value;
  }
  get UserName() {
    return this._username;
  }
  set UserName(value) {
    this._username = value;
  }
  get LanguageCode() {
    return this._language_code;
  }
  set LanguageCode(value) {
    this._language_code = value;
  }
  get AllowsWriteToPm() {
    return this._allows_write_to_pm;
  }
  set AllowsWriteToPm(value) {
    this._allows_write_to_pm = value;
  }
  constructor(params) {
    this.initializeModel(params);
  }
  initializeModel(params) {
    this.Id = params.Id;
    this.FirstName = params.FirstName;
    this.LastName = params.LastName;
    this.UserName = params.UserName;
    this.LanguageCode = params.LanguageCode;
    this.AllowsWriteToPm = !!params.AllowsWriteToPm;
  }
  fromModel() {
    return {
      Id: this.Id,
      FirstName: this.FirstName,
      LastName: this.LastName,
      UserName: this.UserName,
      LanguageCode: this.LanguageCode,
      AllowsWriteToPm: this.AllowsWriteToPm
    };
  }
};

// ui/src/lib/ui/ui.component.ts
var import_core = require("@angular/core");
var import_common = require("@angular/common");
var UiComponent = class {
};
UiComponent = __decorateClass([
  (0, import_core.Component)({
    selector: "tg-fin-app-ui",
    standalone: true,
    imports: [import_common.CommonModule],
    templateUrl: "./ui.component.html",
    styleUrl: "./ui.component.css"
  })
], UiComponent);

// ui/src/lib/components/base/form-field/form-field.component.ts
var import_core2 = require("@angular/core");
var FormFieldComponent = class {
  constructor(controlDir) {
    this.controlDir = controlDir;
    // @Input()
    this.options = {};
    this.blur = new import_core2.EventEmitter();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.onChange = () => {
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.onTouched = () => {
    };
    controlDir.valueAccessor = this;
  }
  ngOnInit() {
    const control = this.controlDir.control;
    const validators = control?.validator ? [control?.validator] : [];
    control?.setValidators(validators);
  }
  writeValue(value) {
    if (this.controlDir.control && this.controlDir.control.value != value) {
      this.controlDir.control?.setValue(value, { emitEvent: true });
    }
  }
  registerOnChange(onChange) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched) {
    this.onTouched = onTouched;
  }
  setDisabledState(disabled) {
    this.disabled = disabled;
  }
};
__decorateClass([
  (0, import_core2.Output)()
], FormFieldComponent.prototype, "blur", 2);
FormFieldComponent = __decorateClass([
  (0, import_core2.Directive)(),
  __decorateParam(0, (0, import_core2.Self)())
], FormFieldComponent);

// ui/src/lib/components/base/form-controls/text-form-control/text.form-control.class.ts
var import_forms = require("@angular/forms");
var TextFormControl = class extends import_forms.FormControl {
  constructor(data = {}) {
    super(data.value, data.validatorOrOpts);
    this.type = "text" /* TEXT */;
    if (data.options) {
      this.type = data?.options?.type || "text" /* TEXT */;
      this.prefix = data?.options?.prefix || "";
      this.placeholder = data?.options?.placeholder || "";
      this.label = data?.options?.label || "";
      this.suffix = data?.options?.suffix || "";
    }
  }
  get options() {
    return {
      type: this.type,
      prefix: this.prefix,
      placeholder: this.placeholder,
      label: this.label,
      suffix: this.suffix
    };
  }
};

// ui/src/lib/components/base/form-controls/select-form-control/select.form-control.class.ts
var import_forms2 = require("@angular/forms");

// ui/src/lib/components/base/form-control/custom-form-control.class.ts
var import_forms3 = require("@angular/forms");

// ui/src/lib/components/tabbar/tabbar.component.ts
var import_core3 = require("@angular/core");
var import_common2 = require("@angular/common");
var import_router = require("@angular/router");
var import_transloco = require("@ngneat/transloco");
var TabbarComponent = class {
};
TabbarComponent = __decorateClass([
  (0, import_core3.Component)({
    selector: "tg-fin-app-tabbar",
    standalone: true,
    imports: [import_common2.CommonModule, import_router.RouterLink, import_router.RouterLinkActive, import_transloco.TranslocoModule],
    templateUrl: "./tabbar.component.html",
    styleUrl: "./tabbar.component.scss"
  })
], TabbarComponent);

// ui/src/lib/components/list-item/list-item.component.ts
var import_core10 = require("@angular/core");
var import_common6 = require("@angular/common");

// ui/src/lib/components/icon/icon.component.ts
var import_core4 = require("@angular/core");
var import_common3 = require("@angular/common");
var import_core5 = require("@ng-icons/core");
var import_outline = require("@ng-icons/iconsax/outline");
var IconComponent = class {
};
__decorateClass([
  (0, import_core4.Input)()
], IconComponent.prototype, "icon", 2);
__decorateClass([
  (0, import_core4.Input)()
], IconComponent.prototype, "size", 2);
IconComponent = __decorateClass([
  (0, import_core4.Component)({
    selector: "ui-icon",
    standalone: true,
    imports: [import_core5.NgIconComponent, import_common3.CommonModule],
    viewProviders: [
      (0, import_core5.provideIcons)({
        saxMoneyReciveOutline: import_outline.saxMoneyReciveOutline,
        saxMoneySendOutline: import_outline.saxMoneySendOutline,
        saxMoneyChangeOutline: import_outline.saxMoneyChangeOutline,
        saxWalletMoneyOutline: import_outline.saxWalletMoneyOutline,
        saxWallet1Outline: import_outline.saxWallet1Outline,
        saxAddCircleOutline: import_outline.saxAddCircleOutline,
        saxArrangeCircle2Outline: import_outline.saxArrangeCircle2Outline,
        saxPresentionChartOutline: import_outline.saxPresentionChartOutline,
        saxBillOutline: import_outline.saxBillOutline
      })
    ],
    templateUrl: "./icon.component.html",
    styleUrl: "./icon.component.scss"
  })
], IconComponent);

// ui/src/lib/components/currency/currency.component.ts
var import_core9 = require("@angular/core");
var import_common5 = require("@angular/common");

// ui/src/lib/pipes/currency/currency.pipe.ts
var import_common4 = require("@angular/common");
var import_core6 = require("@angular/core");
var ECurrency = /* @__PURE__ */ ((ECurrency2) => {
  ECurrency2["RUB"] = "ru-RU";
  ECurrency2["USD"] = "en-US";
  return ECurrency2;
})(ECurrency || {});
var TgFinAppCurrencyPipe = class {
  transform(value, ...args) {
    const currencyCode = args[0] || "RUB";
    const subzero = value < 0;
    const _number = Math.floor(Math.abs(value)) * (subzero ? -1 : 1);
    const _decimal = (value % 1).toFixed(2).substring(2);
    const divider = (0, import_common4.getLocaleNumberSymbol)(
      ECurrency[currencyCode],
      import_common4.NumberSymbol.CurrencyDecimal
    );
    const numberFormat = (0, import_common4.getLocaleNumberFormat)(
      ECurrency[currencyCode],
      import_common4.NumberFormatStyle.Currency
    );
    const symbol = (0, import_common4.getCurrencySymbol)(currencyCode, "narrow");
    const currencyPosition = numberFormat.indexOf("\xA4");
    const preparedNumber = this._prepareNumber(
      _number,
      ECurrency[currencyCode]
    );
    return {
      number: preparedNumber,
      divider,
      decimal: _decimal,
      currencySymbol: symbol,
      currencyPosition
    };
  }
  _prepareNumber(n, locale) {
    return (0, import_common4.formatNumber)(n, locale);
  }
};
TgFinAppCurrencyPipe = __decorateClass([
  (0, import_core6.Pipe)({
    name: "tgFinAppCurrency",
    standalone: true
  })
], TgFinAppCurrencyPipe);

// ui/src/lib/pipes/field-error/field-error.pipe.ts
var import_core7 = require("@angular/core");
var FieldErrorPipe = class {
  transform(data, ...args) {
    const { key, value } = data;
    switch (key) {
      case "required":
        return "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u043B\u0435";
      case "max":
        return `\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ${value["max"]}`;
      case "min":
        return `\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ${value["min"]}`;
      default:
        return "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430";
    }
  }
};
FieldErrorPipe = __decorateClass([
  (0, import_core7.Pipe)({
    name: "fieldError",
    standalone: true
  })
], FieldErrorPipe);

// ui/src/lib/pipes/search/search.pipe.ts
var import_core8 = require("@angular/core");
var SearchPipe = class {
  transform(list, searchString = "") {
    return list.filter(
      (item) => item.title.toLowerCase().includes(searchString.toLowerCase())
    );
  }
};
SearchPipe = __decorateClass([
  (0, import_core8.Pipe)({
    name: "search",
    standalone: true
  })
], SearchPipe);

// ui/src/lib/components/currency/currency.component.ts
var CurrencyComponent = class {
  constructor() {
    this.value = 0;
    this.size = 44;
  }
};
__decorateClass([
  (0, import_core9.Input)()
], CurrencyComponent.prototype, "value", 2);
__decorateClass([
  (0, import_core9.Input)()
], CurrencyComponent.prototype, "size", 2);
CurrencyComponent = __decorateClass([
  (0, import_core9.Component)({
    selector: "ui-currency",
    standalone: true,
    imports: [import_common5.CommonModule, TgFinAppCurrencyPipe],
    templateUrl: "./currency.component.html",
    styleUrl: "./currency.component.scss"
  })
], CurrencyComponent);

// ui/src/lib/components/list-item/list-item.component.ts
var ListItemComponent = class {
  constructor() {
    this.last = false;
    this.withArrow = false;
    this.itemClick = new import_core10.EventEmitter();
    this.icon = "saxWallet1Outline" /* saxWallet1Outline */;
  }
};
__decorateClass([
  (0, import_core10.Input)()
], ListItemComponent.prototype, "item", 2);
__decorateClass([
  (0, import_core10.Input)()
], ListItemComponent.prototype, "last", 2);
__decorateClass([
  (0, import_core10.Input)()
], ListItemComponent.prototype, "withArrow", 2);
__decorateClass([
  (0, import_core10.Output)()
], ListItemComponent.prototype, "itemClick", 2);
ListItemComponent = __decorateClass([
  (0, import_core10.Component)({
    selector: "ui-list-item",
    standalone: true,
    imports: [import_common6.CommonModule, IconComponent, CurrencyComponent],
    templateUrl: "./list-item.component.html",
    styleUrls: ["./list-item.component.scss"]
  })
], ListItemComponent);

// ui/src/lib/components/content-block/content-block.component.ts
var import_core11 = require("@angular/core");
var import_common7 = require("@angular/common");
var ContentBlockComponent = class {
};
ContentBlockComponent = __decorateClass([
  (0, import_core11.Component)({
    selector: "ui-content-block",
    standalone: true,
    imports: [import_common7.CommonModule],
    templateUrl: "./content-block.component.html",
    styleUrl: "./content-block.component.scss"
  })
], ContentBlockComponent);

// ui/src/lib/components/page-container/page-container.component.ts
var import_core12 = require("@angular/core");
var import_common8 = require("@angular/common");
var PageContainerComponent = class {
};
PageContainerComponent = __decorateClass([
  (0, import_core12.Component)({
    selector: "ui-page-container",
    standalone: true,
    imports: [import_common8.CommonModule],
    templateUrl: "./page-container.component.html",
    styleUrl: "./page-container.component.scss"
  })
], PageContainerComponent);

// ui/src/lib/components/balance/balance.component.ts
var import_core13 = require("@angular/core");
var import_common9 = require("@angular/common");
var BalanceComponent = class {
  constructor() {
    this.title = "";
    this.value = 0;
  }
};
__decorateClass([
  (0, import_core13.Input)()
], BalanceComponent.prototype, "title", 2);
__decorateClass([
  (0, import_core13.Input)()
], BalanceComponent.prototype, "value", 2);
BalanceComponent = __decorateClass([
  (0, import_core13.Component)({
    selector: "ui-balance",
    standalone: true,
    imports: [import_common9.CommonModule, CurrencyComponent],
    templateUrl: "./balance.component.html",
    styleUrl: "./balance.component.scss"
  })
], BalanceComponent);

// ui/src/lib/components/action-button/action-button.component.ts
var import_core14 = require("@angular/core");
var import_common10 = require("@angular/common");
var ActionButtonComponent = class {
  constructor() {
    this.buttonClick = new import_core14.EventEmitter();
  }
};
__decorateClass([
  (0, import_core14.Input)()
], ActionButtonComponent.prototype, "button", 2);
__decorateClass([
  (0, import_core14.Output)()
], ActionButtonComponent.prototype, "buttonClick", 2);
ActionButtonComponent = __decorateClass([
  (0, import_core14.Component)({
    selector: "ui-action-button",
    standalone: true,
    imports: [import_common10.CommonModule, IconComponent],
    templateUrl: "./action-button.component.html",
    styleUrl: "./action-button.component.scss"
  })
], ActionButtonComponent);

// ui/src/lib/components/horizontal-container/horizontal-container.component.ts
var import_core15 = require("@angular/core");
var import_common11 = require("@angular/common");
var HorizontalContainerComponent = class {
};
HorizontalContainerComponent = __decorateClass([
  (0, import_core15.Component)({
    selector: "ui-horizontal-container",
    standalone: true,
    imports: [import_common11.CommonModule],
    templateUrl: "./horizontal-container.component.html",
    styleUrl: "./horizontal-container.component.scss"
  })
], HorizontalContainerComponent);

// ui/src/lib/components/block-header/block-header.component.ts
var import_core18 = require("@angular/core");
var import_common12 = require("@angular/common");

// ui/src/lib/directives/dropdown.directive.ts
var import_core16 = require("@angular/core");
var DropdownDirective = class {
  constructor(element, viewContainerRef) {
    this.element = element;
    this.viewContainerRef = viewContainerRef;
    this.options = (0, import_core16.input)([]);
    this.selectItem = new import_core16.EventEmitter();
    this.open = false;
  }
  onClick(event, targetElement) {
    console.log(this.options());
    if (!targetElement) {
      return;
    }
    const clickInside = this.element.nativeElement.contains(targetElement);
    if (!this.open && !clickInside) {
      return;
    }
    if (!this.open) {
      const componentRef = this.viewContainerRef.createComponent(DropdownComponent);
      componentRef.instance.options = this.options;
      componentRef.instance.selectItem = this._select.bind(this);
      const host = this.element.nativeElement;
      host.insertBefore(componentRef.location.nativeElement, null);
      this.open = true;
    } else {
      this.open = false;
      this.viewContainerRef.remove();
    }
  }
  _select(option) {
    console.log(option);
    this.selectItem.emit(option);
  }
};
__decorateClass([
  (0, import_core16.Output)()
], DropdownDirective.prototype, "selectItem", 2);
__decorateClass([
  (0, import_core16.HostListener)("document:click", ["$event", "$event.target"])
], DropdownDirective.prototype, "onClick", 1);
DropdownDirective = __decorateClass([
  (0, import_core16.Directive)({
    selector: "[uiDropdown]",
    standalone: true
  })
], DropdownDirective);

// ui/src/lib/directives/pattern.directive.ts
var import_core17 = require("@angular/core");
var PatternDirective = class {
  constructor() {
    this.specialKeys = [
      "Backspace",
      "Tab",
      "End",
      "Home",
      "Delete",
      "ArrowLeft",
      "ArrowRight"
    ];
  }
  onKeyDown(event) {
    const key = event.key;
    if (this.specialKeys.indexOf(key) !== -1) {
      return;
    }
    const value = event.target.value;
    const valueString = value + key;
    if (this.pattern && this.pattern !== "") {
      let patternRegExp = new RegExp(this.pattern, "g");
      if (!patternRegExp.test(valueString)) {
        event.preventDefault();
        return;
      }
    }
  }
};
__decorateClass([
  (0, import_core17.Input)("uiPattern")
], PatternDirective.prototype, "pattern", 2);
__decorateClass([
  (0, import_core17.HostListener)("keydown", ["$event"])
], PatternDirective.prototype, "onKeyDown", 1);
PatternDirective = __decorateClass([
  (0, import_core17.Directive)({
    selector: "[uiPattern]",
    standalone: true
  })
], PatternDirective);

// ui/src/lib/components/block-header/block-header.component.ts
var import_transloco2 = require("@ngneat/transloco");
var BlockHeaderComponent = class {
  constructor() {
    this.title = "";
    this.options = [
      {
        title: "option 1",
        value: "1",
        selected: true
      },
      {
        title: "option 2",
        value: "2",
        selected: true
      }
    ];
  }
  selectItem(item) {
    console.log(item);
  }
};
__decorateClass([
  (0, import_core18.Input)()
], BlockHeaderComponent.prototype, "title", 2);
BlockHeaderComponent = __decorateClass([
  (0, import_core18.Component)({
    selector: "ui-block-header",
    standalone: true,
    imports: [import_common12.CommonModule, DropdownDirective, import_transloco2.TranslocoPipe],
    templateUrl: "./block-header.component.html",
    styleUrl: "./block-header.component.scss"
  })
], BlockHeaderComponent);

// ui/src/lib/components/text-form-field-mobile/text-form-field-mobile.component.ts
var import_core20 = require("@angular/core");
var import_common14 = require("@angular/common");
var import_forms4 = require("@angular/forms");

// ui/src/lib/components/field-error-messages/field-error-messages.component.ts
var import_core19 = require("@angular/core");
var import_common13 = require("@angular/common");
var FieldErrorMessagesComponent = class {
  constructor() {
    this.errors = {};
  }
};
__decorateClass([
  (0, import_core19.Input)()
], FieldErrorMessagesComponent.prototype, "errors", 2);
FieldErrorMessagesComponent = __decorateClass([
  (0, import_core19.Component)({
    selector: "ui-field-error-messages",
    standalone: true,
    imports: [import_common13.CommonModule, FieldErrorPipe],
    templateUrl: "./field-error-messages.component.html",
    styleUrl: "./field-error-messages.component.scss"
  })
], FieldErrorMessagesComponent);

// ui/src/lib/components/text-form-field-mobile/text-form-field-mobile.component.ts
var import_transloco3 = require("@ngneat/transloco");
var TextFormFieldMobileComponent = class extends FormFieldComponent {
  constructor() {
    super(...arguments);
    // /^[-+]?([0-9]+([\.\,][0-9]*)?|[\.\,][0-9]+)$/
    // @Input()
    this.pattern = "";
  }
  ngOnInit() {
    super.ngOnInit();
    const control = this.controlDir.control;
    this.options = control?.options;
    console.log(this.options.type);
    this.resolvePatternByType(this.options.type);
  }
  resolvePatternByType(type) {
    switch (type) {
      case "number" /* NUMBER */: {
        this.pattern = "^(\\d{1,3}|\\d{0,3}\\.\\d{0,2})$";
        break;
      }
      default: {
        break;
      }
    }
  }
};
TextFormFieldMobileComponent = __decorateClass([
  (0, import_core20.Component)({
    selector: "ui-text-form-field-mobile",
    standalone: true,
    imports: [
      import_common14.CommonModule,
      import_forms4.FormsModule,
      import_forms4.ReactiveFormsModule,
      FieldErrorMessagesComponent,
      import_transloco3.TranslocoPipe,
      PatternDirective
    ],
    templateUrl: "./text-form-field-mobile.component.html",
    styleUrl: "./text-form-field-mobile.component.scss"
  })
], TextFormFieldMobileComponent);

// ui/src/lib/components/switch-field/switch-field.component.ts
var import_core21 = require("@angular/core");
var import_common15 = require("@angular/common");
var SwitchFieldComponent = class extends FormFieldComponent {
};
SwitchFieldComponent = __decorateClass([
  (0, import_core21.Component)({
    selector: "ui-switch-field",
    standalone: true,
    imports: [import_common15.CommonModule],
    templateUrl: "./switch-field.component.html",
    styleUrl: "./switch-field.component.scss"
  })
], SwitchFieldComponent);

// ui/src/lib/components/dropdown/dropdown.component.ts
var import_core22 = require("@angular/core");
var import_common16 = require("@angular/common");
var DropdownComponent = class {
  constructor() {
    this.options = (0, import_core22.input)([]);
  }
  // @Output()
  // public selectItem: EventEmitter<any> = new EventEmitter<any>();
  selectItem(option) {
    console.log(option);
  }
};
DropdownComponent = __decorateClass([
  (0, import_core22.Component)({
    selector: "ui-dropdown",
    standalone: true,
    imports: [import_common16.CommonModule],
    templateUrl: "./dropdown.component.html",
    styleUrl: "./dropdown.component.css"
  })
], DropdownComponent);

// ui/src/lib/components/page-header/page-header.component.ts
var import_core23 = require("@angular/core");
var import_common17 = require("@angular/common");
var import_transloco4 = require("@ngneat/transloco");
var PageHeaderComponent = class {
  constructor() {
    this.header = import_core23.input.required();
    this.subHeader = (0, import_core23.input)();
  }
};
PageHeaderComponent = __decorateClass([
  (0, import_core23.Component)({
    selector: "ui-page-header",
    standalone: true,
    imports: [import_common17.CommonModule, import_transloco4.TranslocoPipe],
    templateUrl: "./page-header.component.html",
    styleUrl: "./page-header.component.scss"
  })
], PageHeaderComponent);

// ui/src/lib/components/select-field/select-field.component.ts
var import_core26 = require("@angular/core");
var import_common20 = require("@angular/common");
var import_forms5 = require("@angular/forms");

// ui/src/lib/services/modal/modal.service.ts
var import_core24 = require("@angular/core");
var import_rxjs = require("rxjs");
var import_common18 = require("@angular/common");
var ModalService = class {
  constructor(viewContainerRef, injector, document) {
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.document = document;
  }
  openComponent(component, options) {
    const innerComponent = this.viewContainerRef.createComponent(component, {
      injector: this.injector
    });
    const modalComponent = this.viewContainerRef.createComponent(
      ModalComponent,
      {
        injector: this.injector,
        projectableNodes: [[innerComponent.location.nativeElement]]
      }
    );
    modalComponent.instance.options = options;
    modalComponent.instance.closeEvent.subscribe(() => {
      this.closeModal();
    });
    modalComponent.instance.submitEvent.subscribe(() => {
      this.submitModal();
    });
    innerComponent.instance.data = options?.data;
    innerComponent.instance.itemClick.subscribe((id) => {
      this.submitModal(id);
      innerComponent.destroy();
      modalComponent.destroy();
    });
    modalComponent.hostView.detectChanges();
    this.document.body.appendChild(modalComponent.location.nativeElement);
    this._modalNotifier = new import_rxjs.Subject();
    return this._modalNotifier?.asObservable();
  }
  openTemplate(content, options) {
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = this.viewContainerRef.createComponent(
      ModalComponent,
      {
        injector: this.injector,
        projectableNodes: [contentViewRef.rootNodes]
      }
    );
    modalComponent.instance.options = options;
    modalComponent.instance.closeEvent.subscribe(() => {
      this.closeModal();
    });
    modalComponent.instance.submitEvent.subscribe(() => {
      this.submitModal();
    });
    modalComponent.hostView.detectChanges();
    this.document.body.appendChild(modalComponent.location.nativeElement);
    this._modalNotifier = new import_rxjs.Subject();
    return this._modalNotifier?.asObservable();
  }
  closeModal() {
    this._modalNotifier?.complete();
  }
  submitModal(data = null) {
    this._modalNotifier?.next(data);
    this.closeModal();
  }
};
ModalService = __decorateClass([
  (0, import_core24.Injectable)(),
  __decorateParam(2, (0, import_core24.Inject)(import_common18.DOCUMENT))
], ModalService);

// ui/src/lib/components/select-field/select-field-values-list/select-field-values-list.component.ts
var import_core25 = require("@angular/core");
var import_common19 = require("@angular/common");
var SelectFieldValuesListComponent = class {
  constructor() {
    this.data = [];
    this.itemClick = new import_core25.EventEmitter();
  }
  onItemClick(item) {
    this.itemClick.emit(item.id);
  }
};
__decorateClass([
  (0, import_core25.Input)()
], SelectFieldValuesListComponent.prototype, "data", 2);
__decorateClass([
  (0, import_core25.Output)()
], SelectFieldValuesListComponent.prototype, "itemClick", 2);
SelectFieldValuesListComponent = __decorateClass([
  (0, import_core25.Component)({
    selector: "ui-select-field-values-list",
    standalone: true,
    imports: [import_common19.CommonModule, ListItemComponent],
    templateUrl: "./select-field-values-list.component.html",
    styleUrl: "./select-field-values-list.component.scss"
  })
], SelectFieldValuesListComponent);

// ui/src/lib/components/select-field/select-field.component.ts
var import_rxjs2 = require("rxjs");
var import_transloco5 = require("@ngneat/transloco");
var SelectFieldComponent = class extends FormFieldComponent {
  constructor() {
    super(...arguments);
    this.exclude = [];
    this._modalService = (0, import_core26.inject)(ModalService);
    this._destroy$ = new import_rxjs2.Subject();
  }
  ngOnInit() {
    super.ngOnInit();
    const control = this.controlDir.control;
    this.options = control?.options;
  }
  itemClick($event) {
  }
  get activeItem() {
    return this.options.values?.find(
      (item) => item.id === this.controlDir.control?.value
    ) || {
      title: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0435\u0440\u0438\u043E\u0434"
    };
  }
  openModal() {
    const modal = this._modalService.openComponent(
      SelectFieldValuesListComponent,
      {
        title: "test",
        data: this.options.values?.filter(
          (item) => !this.exclude.includes(item.id)
        )
      }
    );
    modal.pipe(
      (0, import_rxjs2.filter)((data) => !!data),
      (0, import_rxjs2.takeUntil)(this._destroy$)
    ).subscribe((data) => {
      this.onChange(data);
    });
  }
  closeModal() {
    this._modalService.closeModal();
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
};
__decorateClass([
  (0, import_core26.Input)()
], SelectFieldComponent.prototype, "exclude", 2);
SelectFieldComponent = __decorateClass([
  (0, import_core26.Component)({
    selector: "ui-select-field",
    standalone: true,
    imports: [
      import_common20.CommonModule,
      ListItemComponent,
      import_forms5.FormsModule,
      import_forms5.ReactiveFormsModule,
      SelectFieldValuesListComponent,
      import_transloco5.TranslocoPipe
    ],
    providers: [ModalService],
    templateUrl: "./select-field.component.html",
    styleUrl: "./select-field.component.scss"
  })
], SelectFieldComponent);

// ui/src/lib/components/modal/modal.component.ts
var import_core27 = require("@angular/core");
var import_common21 = require("@angular/common");
var ModalComponent = class {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
    this.closeEvent = new import_core27.EventEmitter();
    this.submitEvent = new import_core27.EventEmitter();
  }
  close() {
    this._elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }
  submit() {
    this._elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }
};
__decorateClass([
  (0, import_core27.Input)()
], ModalComponent.prototype, "options", 2);
__decorateClass([
  (0, import_core27.Output)()
], ModalComponent.prototype, "closeEvent", 2);
__decorateClass([
  (0, import_core27.Output)()
], ModalComponent.prototype, "submitEvent", 2);
ModalComponent = __decorateClass([
  (0, import_core27.Component)({
    selector: "ui-modal",
    standalone: true,
    imports: [import_common21.CommonModule],
    templateUrl: "./modal.component.html",
    styleUrl: "./modal.component.scss"
  })
], ModalComponent);

// ui/src/lib/components/container/container.component.ts
var import_core28 = require("@angular/core");
var import_common22 = require("@angular/common");
var ContainerComponent = class {
};
ContainerComponent = __decorateClass([
  (0, import_core28.Component)({
    selector: "ui-container",
    standalone: true,
    imports: [import_common22.CommonModule],
    templateUrl: "./container.component.html",
    styleUrl: "./container.component.scss"
  })
], ContainerComponent);

// ui/src/lib/components/horizontal-divider/horizontal-divider.component.ts
var import_core29 = require("@angular/core");
var import_common23 = require("@angular/common");
var import_transloco6 = require("@ngneat/transloco");
var HorizontalDividerComponent = class {
  constructor() {
    this.text = (0, import_core29.input)("divider.or");
  }
};
HorizontalDividerComponent = __decorateClass([
  (0, import_core29.Component)({
    selector: "ui-horizontal-divider",
    standalone: true,
    imports: [import_common23.CommonModule, import_transloco6.TranslocoPipe],
    templateUrl: "./horizontal-divider.component.html",
    styleUrl: "./horizontal-divider.component.scss"
  })
], HorizontalDividerComponent);

// ui/src/lib/components/search/search.component.ts
var import_core30 = require("@angular/core");
var import_common24 = require("@angular/common");
var import_forms7 = require("@angular/forms");

// ui/src/lib/classes/forms/base.form.ts
var import_forms6 = require("@angular/forms");
var BaseForm = class extends import_forms6.FormGroup {
  constructor() {
    super({});
    this._initForm();
  }
  _initForm() {
    const controls = this.initControls();
    this._setControls(controls);
  }
  _setControls(controls) {
    Object.keys(controls).forEach((key) => {
      this.addControl(key, controls[key]);
    });
  }
  setControlValue(key, value) {
    this.get(key)?.setValue(value);
  }
};

// ui/src/lib/components/search/search.form.ts
var SearchForm = class extends BaseForm {
  constructor() {
    super();
  }
  initControls() {
    return {
      search: new TextFormControl({
        options: {
          placeholder: "search.placeholder",
          label: "search.label"
        }
      })
    };
  }
};

// ui/src/lib/components/search/search.component.ts
var import_rxjs3 = require("rxjs");
var SearchComponent = class {
  constructor() {
    this.onSearchChange = new import_core30.EventEmitter();
    this._destroy$ = new import_rxjs3.Subject();
    this.form = this.initForm();
  }
  initForm() {
    const form = new SearchForm();
    form.valueChanges.subscribe((value) => {
      this.onSearchChange.emit(value.search);
    });
    return form;
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
};
__decorateClass([
  (0, import_core30.Output)()
], SearchComponent.prototype, "onSearchChange", 2);
SearchComponent = __decorateClass([
  (0, import_core30.Component)({
    selector: "ui-search",
    standalone: true,
    imports: [
      import_common24.CommonModule,
      TextFormFieldMobileComponent,
      import_forms7.ReactiveFormsModule,
      TextFormFieldMobileComponent
    ],
    templateUrl: "./search.component.html",
    styleUrl: "./search.component.scss"
  })
], SearchComponent);

// ui/src/lib/components/dashboard/sidebar-block/sidebar-block.component.ts
var import_core31 = require("@angular/core");
var import_common25 = require("@angular/common");
var import_list = require("@angular/material/list");
var import_router2 = require("@angular/router");
var SidebarBlockComponent = class {
};
SidebarBlockComponent = __decorateClass([
  (0, import_core31.Component)({
    selector: "ui-sidebar-block",
    standalone: true,
    imports: [
      import_common25.CommonModule,
      import_list.MatList,
      import_list.MatListSubheaderCssMatStyler,
      import_list.MatListItem,
      import_router2.RouterLinkActive,
      import_router2.RouterLink
    ],
    templateUrl: "./sidebar-block.component.html",
    styleUrl: "./sidebar-block.component.scss"
  })
], SidebarBlockComponent);

// ui/src/lib/components/dashboard/segment-button/segment-button.component.ts
var import_core32 = require("@angular/core");
var import_common26 = require("@angular/common");
var SegmentButtonComponent = class {
  constructor() {
    this.items = (0, import_core32.model)([], { alias: "segments" });
    this.activeChange = (0, import_core32.output)();
  }
  segmentsChange(id) {
    this.items.update((items) => {
      for (const item of items) {
        item.selected = item.id === id;
      }
      return items;
    });
    this.activeChange.emit(id);
  }
};
SegmentButtonComponent = __decorateClass([
  (0, import_core32.Component)({
    selector: "ui-segment-button",
    standalone: true,
    imports: [import_common26.CommonModule],
    templateUrl: "./segment-button.component.html",
    styleUrl: "./segment-button.component.scss"
  })
], SegmentButtonComponent);

// ui/src/lib/components/dashboard/card/card.component.ts
var import_core33 = require("@angular/core");
var import_common27 = require("@angular/common");
var import_button = require("@angular/material/button");
var import_card = require("@angular/material/card");
var import_icon3 = require("@angular/material/icon");
var import_divider = require("@angular/material/divider");
var CardComponent = class {
  constructor() {
    this.card = (0, import_core33.input)({
      header: {
        title: "spending summary",
        icon: "money",
        button: {
          text: "more option",
          icon: "settings"
        }
      }
    });
  }
};
CardComponent = __decorateClass([
  (0, import_core33.Component)({
    selector: "ui-card",
    standalone: true,
    imports: [import_common27.CommonModule, import_button.MatButton, import_card.MatCardModule, import_icon3.MatIcon, import_divider.MatDivider],
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.scss"
  })
], CardComponent);

// ui/src/lib/components/form/text-form-field/text-form-field.component.ts
var import_core34 = require("@angular/core");
var import_common28 = require("@angular/common");
var import_forms8 = require("@angular/forms");
var import_icon4 = require("@angular/material/icon");
var TextFormFieldComponent = class extends FormFieldComponent {
  ngOnInit() {
    super.ngOnInit();
    const control = this.controlDir.control;
    this.options = control.options;
    console.log(this.controlDir);
  }
};
TextFormFieldComponent = __decorateClass([
  (0, import_core34.Component)({
    selector: "ui-text-form-field",
    standalone: true,
    imports: [
      import_common28.CommonModule,
      import_forms8.FormsModule,
      import_forms8.ReactiveFormsModule,
      FieldErrorMessagesComponent,
      import_icon4.MatIcon
    ],
    templateUrl: "./text-form-field.component.html",
    styleUrl: "./text-form-field.component.scss"
  })
], TextFormFieldComponent);

// ui/src/lib/classes/forms/registration-form.ts
var import_forms9 = require("@angular/forms");

// entity/src/fin-app/wallet/wallet.model.ts
var Wallet = class {
  constructor(params) {
    this.Id = params.Id;
    this.Title = params.Title;
    this.Description = params.Description;
    this.Balance = params.Balance;
    this.Active = params.Active;
    this.Owner = params.Owner;
  }
  get Id() {
    return this._id;
  }
  set Id(value) {
    this._id = value;
  }
  get Title() {
    return this._title;
  }
  set Title(value) {
    this._title = value;
  }
  get Balance() {
    return this._balance;
  }
  set Balance(value) {
    this._balance = value;
  }
  get Active() {
    return this._active;
  }
  set Active(value) {
    this._active = value;
  }
  get Owner() {
    return this._owner;
  }
  set Owner(value) {
    this._owner = value;
  }
  get Description() {
    return this._description;
  }
  set Description(value) {
    this._description = value;
  }
  get ListItem() {
    return {
      id: this.Id,
      title: this.Title,
      type: "wallet",
      icon: {
        name: "saxWallet1Outline" /* saxWallet1Outline */,
        size: "32px"
      },
      additional: this.Balance,
      subtitle: this.Description
    };
  }
};

// entity/src/fin-app/wallet/transaction.type.enum.ts
var ETransactionCashFlow = /* @__PURE__ */ ((ETransactionCashFlow3) => {
  ETransactionCashFlow3[ETransactionCashFlow3["INCOME"] = 1] = "INCOME";
  ETransactionCashFlow3[ETransactionCashFlow3["EXPENSE"] = -1] = "EXPENSE";
  return ETransactionCashFlow3;
})(ETransactionCashFlow || {});
var ETransactionType = /* @__PURE__ */ ((ETransactionType2) => {
  ETransactionType2["INCOME"] = "INCOME";
  ETransactionType2["EXPENSE"] = "EXPENSE";
  ETransactionType2["TRANSFER"] = "TRANSFER";
  return ETransactionType2;
})(ETransactionType || {});

// entity/src/fin-app/wallet/transaction.ts
var Transaction = class {
  get Id() {
    return this._id;
  }
  set Id(value) {
    this._id = value;
  }
  get Type() {
    return this._type;
  }
  set Type(value) {
    this._type = value;
  }
  get Cashflow() {
    return this._cashflow;
  }
  set Cashflow(value) {
    this._cashflow = value;
  }
  get Source() {
    return this._source;
  }
  set Source(value) {
    this._source = value;
  }
  get Target() {
    return this._target;
  }
  set Target(value) {
    this._target = value;
  }
  get Amount() {
    return this._amount;
  }
  set Amount(value) {
    this._amount = value;
  }
  get Owner() {
    return this._owner;
  }
  set Owner(value) {
    this._owner = value;
  }
  get Description() {
    return this._description;
  }
  set Description(value) {
    this._description = value;
  }
  get Timestamp() {
    return this._timestamp;
  }
  set Timestamp(value) {
    this._timestamp = value;
  }
  constructor(params) {
    this.Id = params.Id;
    this.Type = params.Type;
    this.Cashflow = params.Cashflow;
    this.Source = params.Source;
    this.Target = params.Target;
    this.Amount = params.Amount;
    this.Owner = params.Owner;
    this.Description = params.Description;
    this.Timestamp = params.Timestamp;
  }
  get ListItem() {
    return {
      id: this.Id,
      title: this._getListItemTitle(),
      type: "wallet",
      icon: {
        name: "saxArrangeCircle2Outline" /* saxArrangeCircle2Outline */,
        size: "32px"
      },
      additional: this.Amount,
      subtitle: this.Description
    };
  }
  _getListItemTitle() {
    if (this.Type === "TRANSFER" /* TRANSFER */) {
      return "\u041F\u0435\u0440\u0435\u0432\u043E\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u043C\u0435\u0436\u0434\u0443 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430\u043C\u0438";
    }
    if (this.Type === "INCOME" /* INCOME */) {
      return "\u041F\u043E\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430";
    }
    if (this.Type === "EXPENSE" /* EXPENSE */) {
      return "\u0421\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430";
    }
    return `${this.Source} -> ${this.Target}`;
  }
};

// entity/src/fin-app/bill/bill.model.ts
var Bill = class {
  constructor(params) {
    this.Id = params.Id;
    this.Title = params.Title;
    this.Sum = params.Sum;
    this.PaidDate = params.PaidDate;
    this.Period = params.Period;
    this.StopDate = params.StopDate;
    this.Owner = params.Owner;
    this.Description = params.Description;
    this.Active = params.Active;
    this.Status = params.Status;
  }
  get Id() {
    return this._id;
  }
  set Id(value) {
    this._id = value;
  }
  get Title() {
    return this._title;
  }
  set Title(value) {
    this._title = value;
  }
  get Sum() {
    return this._sum;
  }
  set Sum(value) {
    this._sum = value;
  }
  get PaidDate() {
    return this._paidDate;
  }
  set PaidDate(value) {
    this._paidDate = value;
  }
  get Period() {
    return this._period;
  }
  set Period(value) {
    this._period = value;
  }
  get StopDate() {
    return this._stopDate;
  }
  set StopDate(value) {
    this._stopDate = value;
  }
  get Owner() {
    return this._owner;
  }
  set Owner(value) {
    this._owner = value;
  }
  get Description() {
    return this._description;
  }
  set Description(value) {
    this._description = value;
  }
  get Active() {
    return this._active;
  }
  set Active(value) {
    this._active = value;
  }
  get Status() {
    return this._status;
  }
  set Status(value) {
    this._status = value;
  }
  get Bill() {
    return {
      Id: this._id,
      Title: this._title,
      Sum: this._sum,
      PaidDate: this._paidDate,
      Period: this._period,
      StopDate: this._stopDate,
      Owner: this._owner,
      Description: this._description,
      Active: this._active,
      Status: this._status
    };
  }
  get ListItem() {
    return {
      id: this.Id,
      title: this.Title,
      type: "wallet",
      icon: {
        name: "saxBillOutline" /* saxBillOutline */,
        size: "32px"
      },
      additional: this.Sum,
      subtitle: this.subtitle
    };
  }
  get subtitle() {
    const now = /* @__PURE__ */ new Date();
    const day = now.getDate();
    const delta = this.PaidDate - day;
    if (delta === 0) {
      return "\u0421\u0435\u0433\u043E\u0434\u043D\u044F";
    }
    return delta > 0 ? `\u041E\u043F\u043B\u0430\u0442\u0438\u0442\u044C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 ${delta} \u0434\u043D\u044F` : `\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043E ${Math.abs(delta)} \u0434\u043D\u0435\u0439`;
  }
};

// entity/src/fin-app/bill/bill-history-item.model.ts
var BillHistoryItem = class {
  constructor(params) {
    this.Id = params.Id;
    this.Bill = params.Bill;
    this.Sum = params.Sum;
    this.Description = params.Description;
    this.Owner = params.Owner;
  }
  get Id() {
    return this._id;
  }
  set Id(value) {
    this._id = value;
  }
  get Bill() {
    return this._bill;
  }
  set Bill(value) {
    this._bill = value;
  }
  get Sum() {
    return this._sum;
  }
  set Sum(value) {
    this._sum = value;
  }
  get Description() {
    return this._description;
  }
  set Description(value) {
    this._description = value;
  }
  get Owner() {
    return this._owner;
  }
  set Owner(value) {
    this._owner = value;
  }
  get BillItem() {
    return {
      Id: this.Id,
      Bill: this.Bill,
      Sum: this.Sum,
      Description: this.Description,
      Owner: this.Owner
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bill,
  BillHistoryItem,
  ETransactionCashFlow,
  ETransactionType,
  TgUser,
  Transaction,
  Wallet
});
