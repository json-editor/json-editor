export const mustacheTemplate = () => {
  if (!window.Mustache) return false

  return {
    compile (template) {
      return view => window.Mustache.render(template, view)
    }
  }
}
