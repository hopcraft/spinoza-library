
import Water from '../src/index'

let vm = window['vm'] = new Water({
  el: '#app',
  data: {
    halo: {
      greeting: 'Spinoza的微笑🙂',
      feedback: '好的故事'
    }
  },
  methods: {}
})