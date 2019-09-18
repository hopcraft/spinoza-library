
interface IOptions {
  $el: string
}

export default class WaterDOM {
  public $el: string

  constructor($el: string) {
    this.$el = $el
  }
}