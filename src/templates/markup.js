export const markupTemplate = () => {
  if (!window.Mark || !window.Mark.up) return false

  return {
    compile (template) {
      return context => window.Mark.up(template, context)
    }
  }
}
