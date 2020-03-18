export const hoganTemplate = () => {
  if (!window.Hogan) return false

  return {
    compile (template) {
      const compiled = window.Hogan.compile(template)
      return context => compiled.render(context)
    }
  }
}
