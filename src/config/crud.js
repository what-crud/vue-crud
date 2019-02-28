export const crud = {
  fieldModifiers: {
      boolean: (param) => {
          return `<span hidden>${param}</span><i aria-hidden='true' class='v-icon material-icons'>${param == 1 ? 'check' : 'clear'}</i>`
      },
  }
}