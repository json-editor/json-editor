/* Implements ipv4, ipv6 and hostname format validations as per https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-7.3.4 */
const validateIpv4 = (value) => {
  const parts = value.split('.')
  if (parts.length !== 4) {
    throw new Error('error_ipv4')
  }
  parts.forEach((part) => {
    if (isNaN(+part) || +part < 0 || +part > 255) {
      throw new Error('error_ipv4')
    }
  })
}

const validateIpv6 = (value) => {
  if (!value.match(
    '^(?:(?:(?:[a-fA-F0-9]{1,4}:){6}|(?=(?:[a-fA-F0-9]{0,4}:){2,6}(?:[0-9]{1,3}.){3}[0-9]{1,3}$)(([0-9a-fA-F]{1,4}:){1,5}|:)((:[0-9a-fA-F]{1,4}){1,5}:|:)|::(?:[a-fA-F0-9]{1,4}:){5})(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]).){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])|(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?=(?:[a-fA-F0-9]{0,4}:){0,7}[a-fA-F0-9]{0,4}$)(([0-9a-fA-F]{1,4}:){1,7}|:)((:[0-9a-fA-F]{1,4}){1,7}|:)|(?:[a-fA-F0-9]{1,4}:){7}:|:(:[a-fA-F0-9]{1,4}){7})$'
  )) {
    throw new Error('error_ipv6')
  }
}

const validateHostname = (value) => {
  if (!value.match(
    '(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9].)+[a-zA-Z]{2,63}$)'
  )) {
    throw new Error('error_hostname')
  }
}

export function ipValidator (schema, value, path, translate) {
  try {
    switch (schema.format) {
      case 'ipv4':
        validateIpv4(value)
        break
      case 'ipv6':
        validateIpv6(value)
        break
      case 'hostname':
        validateHostname(value)
        break
    }
    return []
  } catch (err) {
    return [{
      path,
      property: 'format',
      message: translate(err.message)
    }]
  }
}
