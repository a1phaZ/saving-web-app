import { BaseTgPage } from '../base-tg-page/base-tg-page';

export abstract class BaseFormTgPage extends BaseTgPage {
  //TODO create abstract class for  base form tg page
  abstract override MainButtonText: string;

  override BackButtonFn(): void {}

  override MainButtonFn(): void {}
}
