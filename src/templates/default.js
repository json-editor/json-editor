export const defaultTemplate = () => ({
  compile (template) {
    const matches = template.match(/{{\s*([a-zA-Z0-9\-_ .]+)\s*}}/g)
    const l = matches && matches.length

    /* Shortcut if the template contains no variables */
    if (!l) return () => template

    /* Pre-compute the search/replace functions */
    /* This drastically speeds up template execution */
    const replacements = []
    const getReplacement = (i) => {
      let p = matches[i].replace(/[{}]+/g, '').trim().split('.')
      const n = p.length
      let func

      if (n > 1) {
        let cur
        func = (vars) => {
          cur = vars
          for (i = 0; i < n; i++) {
            cur = cur[p[i]]
            if (!cur) break
          }
          return cur
        }
      } else {
        p = p[0]
        func = vars => vars[p]
      }

      replacements.push({
        s: matches[i],
        r: func
      })
    }
    for (var i = 0; i < l; i++) {
      getReplacement(i)
    }

    /* The compiled function */
    return (vars) => {
      let ret = `${template}`
      let r
      for (i = 0; i < l; i++) {
        r = replacements[i]
        ret = ret.replace(r.s, r.r(vars))
      }
      return ret
    }
  }
})
