
interface IOptions {
  $el: string
}

export default class WaterDOM {
  $el: string

  constructor($el: string) {
    this.$el = $el
  }
}