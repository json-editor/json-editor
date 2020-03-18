export const ejsTemplate = () => {
  if (!window.EJS) return false

  return {
    compile (template) {
      const compiled = new window.EJS({
        text: template
      })

      return context => compiled.render(context)
    }
  }
}
